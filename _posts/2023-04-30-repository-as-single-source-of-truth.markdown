---
layout: post
title:  "SwiftUI: Using a Repository as the single source of truth"
date:   2023-04-30 07:00:00 -0300
tags: swiftui
---

# Introduction:
In a SwiftUI app, it is important to have a single source of truth for the app's data. This ensures that all views and components that rely on the data are always in sync, preventing inconsistencies and bugs. One way to achieve this is by using a Repository object to manage the app's data. In this article, we'll explore how to use a Repository object to hold the single source of truth for a SwiftUI app, based on the code in this repository: https://github.com/mdb1/SwiftUI-RepositoryExample

# Setting up the Repository:
To set up a Repository object, you first need to create a data model that represents the data you want to store. In the GitHub repository we're using as a reference, the data model is a struct called Book. Once you have your data model, you can create a Repository object that will manage instances of that data model. Here's an example:

```swift
import SwiftUI

@MainActor
final class BooksRepository: ObservableObject {
    @Published var books: [Book] = []
    @Published var isLoading: Bool = false
    @Published var error: Error?
    private let dependencies: Dependencies

    init(dependencies: Dependencies = .default) {
        self.dependencies = dependencies
    }

    func loadBooks() async {
        if !books.isEmpty { return }
        isLoading = true
        if let books = try? await dependencies.loadBooks() {
            self.books = books
        }
        isLoading = false
    }

    func loadOneMoreBook() async {
        isLoading = true
        if let book = try? await dependencies.loadOneMoreBook() {
            books.append(book)
        }
        isLoading = false
    }

    func delete(id: UUID) {
        if let index = books.firstIndex(where: { $0.id == id }) {
            books.remove(at: index)
        }
    }
}

extension BooksRepository {
    struct Dependencies {
        var loadBooks: () async throws -> [Book]
        var loadOneMoreBook: () async throws -> Book

        static var `default`: Self {
            let service = BooksService()
            return Dependencies(
                loadBooks: service.loadBooks,
                loadOneMoreBook: service.loadOneMoreBook
            )
        }
    }
}
```

Note: We are using the Dependencies approach from [this previous article](/2023-02-03-enhancing-testability-without-protocols/).

# Using the Repository:
To use the Repository object in your SwiftUI app, you need to instantiate it and pass it to the views that need to access the data. You can do this by using the @StateObject property wrapper to create an instance of the Repository object in a parent view, and then pass that instance down to child views using `.environmentObject`. Here's an example:

```swift
@main
struct RepoExampleApp: App {
    @StateObject private var booksRepository = BooksRepository()
    var body: some Scene {
        WindowGroup {
            BooksListView()
                .environmentObject(booksRepository)
                .buttonStyle(.bordered)
        }
    }
}
```

Then we can access the repository inside our child views:

```swift
struct BooksListView: View {
    @EnvironmentObject private var repository: BooksRepository

    var body: some View {
        NavigationView {
            VStack {
                // Use the binding reference of the repository
                List($repository.books, id: \.id) { $book in
                    NavigationLink(destination: BookDetailView(book: $book)) {
                        VStack {
                            Text(book.name)
                                .frame(maxWidth: .infinity, alignment: .leading)
                            Text("Pages: \(Text(book.pages.description).bold())")
                                .frame(maxWidth: .infinity, alignment: .leading)
                        }
                    }
                }
                Button("Load one more") {
                    Task {
                        await repository.loadOneMoreBook()
                    }
                }
            }
            .task {
                await repository.loadBooks()
            }
            .navigationTitle("Books")
            .toolbar {
                if repository.isLoading {
                    ProgressView()
                }
            }
        }
    }
}
```

And we can use Bindings to ensure that the data will always be updated across all the different views:

```swift
struct BookDetailView: View {
    @EnvironmentObject private var repository: BooksRepository
    @Binding var book: Book
    @State private var editMode: Bool = false

    var body: some View {
        VStack {
            Text(book.name)
                .font(.title)
            Text("Pages: \(Text(book.pages.description).bold())")
                .font(.subheadline)
                .padding(.bottom, 32)

            Button("Delete") {
                repository.delete(id: book.id)
            }
            .tint(.red)
        }
        .toolbar {
            Button {
                editMode = true
            } label: {
                Label("Edit", systemImage: "pencil")
                    .labelStyle(.titleAndIcon)
            }
            .buttonStyle(.borderless)
        }
        .sheet(isPresented: $editMode) {
            BookEditView(book: $book)
        }
    }
}
```

# Demo:
Using 2 instances of the app in an iPad simulator, we can make sure that the data is updated on every view:

<video width="683" height="512" controls>
    <source src="{{static.static_files}}/resources/repository/repo.mp4" type="video/mp4">
</video>

# Testing
Testing the repository object becomes pretty simple when using the Dependencies approach:

```swift
import XCTest
@testable import RepoExample

@MainActor
final class RepoTests: XCTestCase {
    func test_LoadBooks_Success() async {
        // Given
        let expectedBooks = [Book(name: "name", pages: 12)]
        let sut = BooksRepository(
            dependencies: BooksRepository.Dependencies(
                loadBooks: { expectedBooks },
                loadOneMoreBook: { Book(name: "new name", pages: 12) }
            )
        )
        XCTAssertEqual(sut.books.count, 0)

        // When
        await sut.loadBooks()

        // Then
        XCTAssertEqual(sut.books.count, 1)
        XCTAssertEqual(sut.books, expectedBooks)
    }

    func test_LoadBooks_Error() async {
        // Given
        let sut = BooksRepository(
            dependencies: BooksRepository.Dependencies(
                loadBooks: { throw MockError() },
                loadOneMoreBook: { Book(name: "new name", pages: 12) }
            )
        )
        XCTAssertEqual(sut.books.count, 0)

        // When
        await sut.loadBooks()

        // Then
        XCTAssertEqual(sut.books.count, 0)
        XCTAssertEqual(sut.books, [])
    }

    func test_LoadOneMoreBook_Success() async {
        // Given
        let expectedBook = Book(name: "name", pages: 12)
        let sut = BooksRepository(
            dependencies: BooksRepository.Dependencies(
                loadBooks: { [] },
                loadOneMoreBook: { expectedBook }
            )
        )
        XCTAssertEqual(sut.books.count, 0)

        // When
        await sut.loadOneMoreBook()

        // Then
        XCTAssertEqual(sut.books.count, 1)
        XCTAssertEqual(sut.books.first, expectedBook)
    }

    func test_LoadOneMoreBook_Error() async {
        // Given
        let sut = BooksRepository(
            dependencies: BooksRepository.Dependencies(
                loadBooks: { [] },
                loadOneMoreBook: { throw MockError() }
            )
        )
        XCTAssertEqual(sut.books.count, 0)

        // When
        await sut.loadOneMoreBook()

        // Then
        XCTAssertEqual(sut.books.count, 0)
        XCTAssertEqual(sut.books, [])
    }

    func test_Delete() {
        // Given
        let sut = BooksRepository()
        let book = Book(name: "name", pages: 12)
        sut.books = [book]
        XCTAssertEqual(sut.books.count, 1)

        // When
        sut.delete(id: book.id)

        // Then
        XCTAssertEqual(sut.books.count, 0)
    }
}

struct MockError: Error {}
```

# Conclusion

In conclusion, using a Repository object to hold the single source of truth for a SwiftUI app is a powerful technique that can help you keep your data consistent and avoid bugs. By creating a Repository object and implementing methods to add, update, and delete data, you can ensure that all views and components that rely on the data are always in sync.
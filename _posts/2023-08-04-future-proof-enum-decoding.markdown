---
layout: post
title: "Future-Proof enum decoding"
date: 2023-08-04 07:00:00 -0300
tags: [iOS, testing]
---

When working with String enums that have a finite number of cases, it's crucial to include an `unknown` case as a catch-all for potential future values. This practice helps future-proof our apps against updates or changes on the backend that may introduce new enum values.

To achieve this, we provide a custom initializer for the enum. This initializer tries to decode the received value and maps it to the corresponding enum case. If it encounters a value not defined in the enum, it defaults to the `unknown` case.

Here's an example illustrating this approach:

```swift
enum UserStatus: String {
    case pendingAuthorization, verified, unknown

    init(from decoder: Decoder) throws {
        guard let rawValue = try? decoder.singleValueContainer().decode(String.self) else {
            Logger.log(.err, "Can't decode a String value from \(Self.self).")
            self = .unknown
            return
        }
        if let knownValue = UserStatus(rawValue: rawValue) {
            self = knownValue
        } else {
            Logger.log(.err, "Unknown value (\(rawValue)) for \(Self.self).")
            self = .unknown
        }
    }
}

extension UserStatus: Decodable {}
```

In this example, if the backend sends an unfamiliar value like `userStatus = "blocked"`, the app won't crash due to a failed decoding. Instead, the `UserStatus` for this particular instance will be set to `unknown`, allowing the app to continue operating normally.

## Testing
You could add a simple unit test to make sure that the decoding will work correctly:

```swift
func test_userStatus_decoding() {
    // Given
    let decoder = JSONDecoder()
    let dict: [String: UserStatus] = [
        #" "pendingAuthorization" "#: .pendingAuthorization,
        #" "verified" "#: .verified,
        #" "blocked" "#: .unknown,
        #" "manu" "#: .unknown
    ]

    dict.forEach { json, expectedValue in
        // When
        let actualValue = try? decoder.decode(UserStatus.self, from: json.data(using: .utf8)!)
        // Then
        XCTAssertEqual(actualValue, expectedValue)
    }
}
```

<!-- Do not remove - SEO meta tags -->
{% seo %}
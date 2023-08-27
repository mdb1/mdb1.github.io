---
layout: post
title:  "New App - Number Formatters"
date:   2023-06-12 07:00:00 -0300
comments: true
tags: [iOS, testing]
---

When starting a new app, it's important to decide how it's going to handle and display numbers. Once that has been decided, you can add some practic `static` NumberFormatters that encapsulate that decisions to reuse across the app.

Some examples include:
* Currency
* Decimal
* Percentage

## Example code:

```swift
public extension NumberFormatter {
    /// Number formatter for currencies.
    /// - Parameter locale: The locale to use in the formatter. Default: `.current`.
    /// - Parameter usesGroupingSeparator: Determines whether the receiver displays the group separator.
    /// - Parameter minimumFractionDigits: The minimum number of fraction digits to be displayed by the number formatter. Default is `0`.
    /// - Parameter maximumFractionDigits: The maximum number of fraction digits to be displayed by the number formatter. Default is `2`.
    /// - Returns: The NumberFormatter with the applied properties.
    static func currency(
        locale: Locale = .current,
        usesGroupingSeparator: Bool = true,
        minimumFractionDigits: Int = 0,
        maximumFractionDigits: Int = 2
    ) -> NumberFormatter {
        let formatter = NumberFormatter()
        formatter.numberStyle = .currency
        formatter.locale = locale
        formatter.usesGroupingSeparator = usesGroupingSeparator
        formatter.minimumFractionDigits = minimumFractionDigits
        formatter.maximumFractionDigits = maximumFractionDigits
        return formatter
    }
}
```

It's important to add the Locale as one of the parameters, to be able to inject it from the outside, and therefore, making it testable for different locales:

### Testing - en-US Locale

```swift
func test_currencyFormatter_en_us_locale() {
    let usLocale: Locale = .init(identifier: "en-US")
    let formatter: NumberFormatter = .currency(locale: usLocale)
    let keyValuePairs: [Double: String] = [
        0: "$0",
        5.1: "$5.1",
        10.10: "$10.1",
        15: "$15",
        1_000: "$1,000",
        1_000.35: "$1,000.35",
        1_000.351: "$1,000.35",
        1_000.359: "$1,000.36"
    ]

    keyValuePairs.forEach { element in
        // When
        let formatted = formatter.string(for: NSNumber(value: element.key))
        // Then
        XCTAssertEqual(formatted, element.value)
    }
}
```

### Testing - es-AR Locale

```swift
func test_currencyFormatter_es_ar_locale() {
    let esLocale: Locale = .init(identifier: "es-AR")
    let formatter: NumberFormatter = .currency(locale: esLocale)
    let keyValuePairs: [Double: String] = [
        0: "$ 0",
        5.1: "$ 5,1",
        10.10: "$ 10,1",
        15: "$ 15",
        1_000: "$ 1.000",
        1_000.35: "$ 1.000,35",
        1_000.351: "$ 1.000,35",
        1_000.359: "$ 1.000,36"
    ]

    keyValuePairs.forEach { element in
        // When
        let formatted = formatter.string(for: NSNumber(value: element.key))
        // Then
        XCTAssertEqual(formatted, element.value)
    }
}
```

---

You can find the other formatters, plus additional tests in [this repository](https://github.com/mdb1/Utilities).
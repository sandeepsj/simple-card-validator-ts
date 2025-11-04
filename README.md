# Simple Card Validator TypeScript

A comprehensive TypeScript library for validating credit card numbers, determining card types, and providing card-specific information like CVV length and supported card number lengths.

## Features

-  **Card Type Detection**: Automatically detects 12+ major card types including Visa, MasterCard, American Express, Discover, JCB, Maestro, RuPay, UnionPay, and more
-  **Luhn Algorithm Validation**: Implements the industry-standard Luhn algorithm for card number validation
-  **Length Validation**: Validates card number length based on card type specifications
-  **CVV Length Information**: Provides valid CVV lengths for each detected card type
-  **Range-based Detection**: Uses both regex patterns and BIN ranges for accurate card type identification
-  **TypeScript Support**: Fully typed with comprehensive type definitions
-  **Zero Dependencies**: Lightweight library with no external dependencies

## Supported Card Types

| Card Type | Pattern/Range | Valid Lengths | CVV Length |
|-----------|---------------|---------------|------------|
| Visa | `^4` | 16 | 3 |
| MasterCard | BIN ranges 222100-272099, 510000-559999 | 16 | 3 |
| American Express | `^3[47]` | 15 | 4 |
| Discover | `^(6011\|622...)` | 16 | 3 |
| JCB | `^35(2[89]\|[3-8][0-9])` | 16 | 3 |
| Maestro | `^(5018\|5081\|...)` | 12-19 | 0, 3 |
| RuPay | BIN ranges | 16 | 3 |
| UnionPay | `^6[0289]\|9[0245689]...` | 16-19 | 3 |
| Diners Club | `^30[0-5]`, `^3([689]\|09)` | 14 | 3 |
| Laser | `^(6304\|670[69]\|6771)` | 16-19 | 3, 4 |
| Visa Electron | `^(4026\|417500\|...)` | 16 | 3 |
| Sodexo | `^(637513)` | 16 | 3 |

## Installation

```bash
npm install simple-card-validator-ts
```

## Usage

### Basic Usage

```typescript
import CardValidator from 'simple-card-validator-ts';

// Create a new validator instance
const validator = new CardValidator('4111111111111111');

// Get card validation details
const result = validator.getCardDetails();

console.log(result);
// Output:
// {
//   card_type: 'visa',
//   valid: true,
//   luhn_valid: true,
//   length_valid: true,
//   cvv_length: [3],
//   supported_lengths: [16]
// }
```

### Advanced Usage

```typescript
import CardValidator, { CardDetails } from 'simple-card-validator-ts';

// Validate different card types
const cards = [
  '4111111111111111',    // Visa
  '5555555555554444',    // MasterCard
  '378282246310005',     // American Express
  '6011111111111117',    // Discover
];

cards.forEach(cardNumber => {
  const validator = new CardValidator(cardNumber);
  const result: CardDetails = validator.getCardDetails();

  console.log(`Card: ${cardNumber}`);
  console.log(`Type: ${result.card_type}`);
  console.log(`Valid: ${result.valid}`);
  console.log(`CVV Length: ${result.cvv_length.join(', ')}`);
  console.log('---');
});
```

### Handling Spaces and Dashes

The library automatically normalizes card numbers by removing spaces and dashes:

```typescript
const validator1 = new CardValidator('4111 1111 1111 1111');
const validator2 = new CardValidator('4111-1111-1111-1111');
const validator3 = new CardValidator('4111111111111111');

// All three will produce the same result
console.log(validator1.getCardDetails().valid); // true
console.log(validator2.getCardDetails().valid); // true
console.log(validator3.getCardDetails().valid); // true
```

## API Reference

### CardValidator Class

#### Constructor

```typescript
new CardValidator(cardNumber: string)
```

- `cardNumber`: The credit card number to validate (string)

#### Methods

##### `getCardDetails(): CardDetails`

Returns a comprehensive validation result object.

### Types

#### `CardDetails`

```typescript
interface CardDetails {
  card_type: string;           // Detected card type (e.g., 'visa', 'mastercard', 'amex', 'unknown')
  valid: boolean;              // Overall validity (luhn_valid && length_valid)
  luhn_valid: boolean;         // Whether card passes Luhn algorithm check
  length_valid: boolean;       // Whether card length is valid for detected type
  cvv_length: number[];        // Valid CVV lengths for this card type, e.g., [3] or [3, 4]
  supported_lengths: number[]; // Valid card number lengths, e.g., [16] or [12,13,14,15,16,17,18,19]
}
```

#### `CardType`

```typescript
interface CardType {
  name: string;
  valid_length: number[];
  cvv_length: number[];
  pattern?: RegExp;      // For pattern-based detection
  range?: number[][];    // For BIN range-based detection
  gaps?: number[];       // Optional: for formatting (e.g., Sodexo)
}
```

## Examples

### Validate and Format Card Information

```typescript
import CardValidator from 'simple-card-validator-ts';

function formatCardInfo(cardNumber: string) {
  const validator = new CardValidator(cardNumber);
  const result = validator.getCardDetails();

  if (result.valid) {
    return {
      isValid: true,
      cardType: result.card_type.replace('_', ' ').toUpperCase(),
      cvvLength: result.cvv_length,
      message: `Valid ${result.card_type} card`
    };
  } else {
    return {
      isValid: false,
      cardType: result.card_type,
      issues: [
        !result.luhn_valid && 'Invalid checksum',
        !result.length_valid && 'Invalid length'
      ].filter(Boolean),
      message: 'Invalid card number'
    };
  }
}

// Examples
console.log(formatCardInfo('4111111111111111'));
// { isValid: true, cardType: 'VISA', cvvLength: [3], message: 'Valid visa card' }

console.log(formatCardInfo('4111111111111112'));
// { isValid: false, cardType: 'visa', issues: ['Invalid checksum'], message: 'Invalid card number' }
```

## Development

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/simple-card-validator-ts.git
cd simple-card-validator-ts

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Run development mode with watch
npm run dev
```

### Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Watch mode for development
- `npm test` - Run test suite
- `npm run clean` - Remove build artifacts
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Testing

The library includes comprehensive tests covering:

- Card type detection for all supported card types
- Luhn algorithm validation
- Length validation
- Edge cases and error handling
- Input normalization (spaces, dashes)

Run tests with:

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### v1.0.0
- Initial release
- Support for 12+ major card types
- Luhn algorithm validation
- Length validation
- TypeScript support
- Comprehensive test suite

## Acknowledgments

- [Luhn Algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm) for card number validation
- Card type patterns and ranges based on industry standards
- Inspired by various open-source card validation libraries

## Support

If you encounter any issues or have questions, please file an issue on the [GitHub repository](https://github.com/yourusername/simple-card-validator-ts/issues).
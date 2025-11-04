/**
 * Simple Card Validator TypeScript Library
 *
 * A comprehensive library for validating credit card numbers and detecting card types.
 * This module exposes only the getCardDetails functionality.
 */

import CardValidator from './src/validators';

// Re-export the CardValidator class as default
export default CardValidator;

// Named export for convenience
export { CardValidator };

// Export only the types that are actually used
export type {
  CardDetails,
  CardType
} from './src/types';
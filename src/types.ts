interface CardTypeBase {
  name: string;
  valid_length: number[];
  cvv_length: number[];
  gaps?: number[]; // Optional property (only Sodexo has it)
}

export type CardType = CardTypeBase & (
  | { pattern: RegExp; range?: never; }  // A card with a pattern
  | { pattern?: never; range: number[][]; } // A card with a range
);

export interface CardDetails {
  card_type: string;           // e.g., 'visa', 'mastercard', 'amex', 'unknown'
  valid: boolean;              // Overall validity (luhn_valid && length_valid)
  luhn_valid: boolean;         // Whether card passes Luhn algorithm check
  length_valid: boolean;       // Whether card length is valid for detected type
  cvv_length: number[];        // Valid CVV lengths for this card type, e.g., [3] or [3, 4]
  supported_lengths: number[]; // Valid card number lengths, e.g., [16] or [12,13,14,15,16,17,18,19]
}
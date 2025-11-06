interface CardTypeBase {
    name: string;
    valid_length: number[];
    cvv_length: number[];
    gaps?: number[];
}
export type CardType = CardTypeBase & ({
    pattern: RegExp;
    range?: never;
} | {
    pattern?: never;
    range: number[][];
});
export interface CardDetails {
    card_type: string;
    valid: boolean;
    luhn_valid: boolean;
    length_valid: boolean;
    cvv_length: number[];
    supported_lengths: number[];
}
export {};
//# sourceMappingURL=types.d.ts.map
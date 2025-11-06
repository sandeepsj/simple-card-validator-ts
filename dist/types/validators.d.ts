import { CardDetails } from "./types";
declare class CardValidator {
    private cardNumber;
    private card;
    private cardType;
    private luhnValid;
    private lengthValid;
    private cvvLength;
    private month;
    private year;
    private supportedLengths;
    constructor(cardNumber: string);
    private getCardType;
    private isValidLuhn;
    private isValidLength;
    private validateCardNumber;
    private normalize;
    getCardDetails(): CardDetails;
    setBaseDate(month?: string | number | null, year?: string | number | null): void;
    validateCard(): boolean;
    validateCvv(val: string): boolean;
    validateExpiry(val: string): boolean;
}
export default CardValidator;
//# sourceMappingURL=validators.d.ts.map
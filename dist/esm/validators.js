import { cardTypes } from "./card-types";
class CardValidator {
    constructor(cardNumber) {
        this.card = null;
        this.cardType = 'unknown';
        this.luhnValid = false;
        this.lengthValid = false;
        this.cvvLength = [];
        this.month = null;
        this.year = null;
        this.supportedLengths = [];
        this.cardNumber = cardNumber;
    }
    getCardType(number) {
        for (let j = 0; j < cardTypes.length; j++) {
            const cardType = cardTypes[j];
            if (cardType?.pattern && number.match(cardType?.pattern)) {
                return cardType;
            }
            else if (cardType?.range) {
                const bin = parseInt(number.substring(0, 6));
                if (isNaN(bin))
                    return null;
                for (let k = 0; k < cardType.range.length; k++) {
                    const range = cardType.range[k];
                    if (range && range[0] && range[1] && range[0] <= bin && bin <= range[1]) {
                        return cardType;
                    }
                }
            }
        }
        return null;
    }
    isValidLuhn(number) {
        let sum = 0;
        const digits = number.split('').reverse();
        for (let n = 0; n < digits.length; n++) {
            let cur = digits[n];
            if (typeof cur === "undefined") {
                continue;
            }
            let digit = +cur;
            if (n % 2 === 1) {
                digit *= 2;
                if (digit < 10) {
                    sum += digit;
                }
                else {
                    sum += (digit - 9);
                }
            }
            else {
                sum += digit;
            }
        }
        return sum % 10 === 0;
    }
    isValidLength(number) {
        const length = number.length;
        return this.card?.valid_length.includes(length) ?? false;
    }
    validateCardNumber(number) {
        this.card = this.getCardType(number);
        this.luhnValid = this.isValidLuhn(number);
        if (this.card && this.cardType) {
            this.cardType = this.card.name;
            this.lengthValid = this.isValidLength(number);
            this.cvvLength = this.card.cvv_length;
            this.supportedLengths = this.card.valid_length;
        }
        return {
            card_type: this.cardType,
            valid: this.luhnValid && this.lengthValid,
            luhn_valid: this.luhnValid,
            length_valid: this.lengthValid,
            cvv_length: this.cvvLength,
            supported_lengths: this.supportedLengths
        };
    }
    ;
    normalize(number) {
        return number.toString().replace(/[ -]/g, '');
    }
    ;
    getCardDetails() {
        if (!this.cardNumber)
            throw 'Invalid cardNumber property set';
        var number = this.normalize(this.cardNumber);
        return this.validateCardNumber(number);
    }
    setBaseDate(month, year) {
        if (isNaN(Number(month)) || isNaN(Number(year)) || parseInt(String(month)) < 1
            || parseInt(String(month)) > 12) {
            throw 'Invalid date format. Use MM, YYYY format';
        }
        if (!month || !year) {
            const date = new Date();
            month = month || (date.getMonth() + 1);
            year = year || date.getFullYear();
        }
        this.month = parseInt(String(month));
        this.year = parseInt(String(year));
    }
    validateCard() {
        if (!this.cardNumber)
            throw 'Invalid cardNumber property set';
        return this.getCardDetails().valid;
    }
    validateCvv(val) {
        val = val || '';
        if (!this.cardNumber) {
            throw 'Invalid cardNumber property set';
        }
        if (!this.card) {
            this.validateCard();
        }
        if (isNaN(Number(val))) {
            throw 'CVV should be a number';
        }
        if (this.cardType && this.cardType === 'maestro') {
            return (val === '') ||
                (val && this.cvvLength.includes(val.length)) ||
                false;
        }
        if (!val) {
            throw 'CVV should be a number';
        }
        return this.cvvLength.includes(val.length);
    }
    validateExpiry(val) {
        const expiryRegex = /^(0[1-9]|1[0-2])\/2[0-9]{3}$/;
        if (!this.cardNumber) {
            throw 'Invalid cardNumber property set';
        }
        if (!val) {
            throw new Error('Expiry should not be empty');
        }
        if (!this.card) {
            this.validateCard();
        }
        if (!this.month || !this.year) {
            this.setBaseDate(this.month, this.year);
        }
        const expiry = val && val.toString().split('/') || [undefined, undefined];
        if (!expiry[0] || !expiry[1] || isNaN(Number(expiry[0])) ||
            isNaN(Number(expiry[1]))) {
            throw 'Expiry should be in MM/YYYY format';
        }
        const expiryMonth = parseInt(expiry[0], 10);
        const expiryYear = parseInt(expiry[1], 10);
        if (expiry.length === 2 && expiryYear === this.year && expiryMonth <
            this.month) {
            return false;
        }
        return expiryRegex.test(val.toString()) &&
            expiryMonth > 0 &&
            expiryMonth < 13 &&
            expiryYear >= this.year;
    }
}
export default CardValidator;
//# sourceMappingURL=validators.js.map
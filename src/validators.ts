import { cardTypes } from "./card-types";
import { CardType, CardDetails } from "./types";

class CardValidator {
  private cardNumber: string;
  private card: CardType | null = null;
  private cardType: string = 'unknown';
  private luhnValid: boolean = false;
  private lengthValid: boolean = false;
  private cvvLength: number[] = [];
  private month: number | null = null;
  private year: number | null = null;
  private supportedLengths: number[] = [];

  constructor(cardNumber: string) {
    this.cardNumber = cardNumber;
  }

  private getCardType(number: string): CardType | null { 
    for (let j = 0; j < cardTypes.length; j++) {
      const cardType = cardTypes[j];
      if (cardType?.pattern && number.match(cardType?.pattern)) {
        return cardType;
      } else if (cardType?.range) {
        const bin = parseInt(number.substring(0, 6));
        if (isNaN(bin)) return null;
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

  private isValidLuhn(number: string): boolean {
    let sum: number = 0;
    const digits: string[] = number.split('').reverse();

    for(let n=0; n < digits.length; n++) {
      let cur = digits[n];
      if (typeof cur === "undefined") {
        continue
      }
      let digit: number = +cur; // Convert char to number, NaN if not a digit in that case sum will be NaN and final check will fail
      if (n % 2 === 1) { // Every second digit (from right)
        digit *= 2;
        if (digit < 10) {
          sum += digit;
        } else {
          sum += (digit - 9); // sum of digits (1+0=1, 1+1=2, .. till 1+8=9 etc.) is equal to digit - 9
        }
      } else {
        sum += digit;
      }
    }
    return sum % 10 === 0;
  }

  private isValidLength(number: string): boolean {
    const length = number.length;
    return this.card?.valid_length.includes(length) ?? false; 
  }

  private validateCardNumber(number: string): CardDetails {
    this.card = this.getCardType(number);
    this.luhnValid = this.isValidLuhn(number);
    if(this.card && this.cardType) {
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
      supported_lengths : this.supportedLengths
    };
  };

  private normalize(number: string): string {
    return number.toString().replace(/[ -]/g, '');
  };
  

  public getCardDetails(): CardDetails {
    if(!this.cardNumber)
      throw 'Invalid cardNumber property set';
    var number = this.normalize(this.cardNumber);
    return this.validateCardNumber(number);
  }

  public setBaseDate(month?: string | number | null, year?: string | number | null): void {
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

  public validateCard(): boolean {
    if(!this.cardNumber)
      throw 'Invalid cardNumber property set';
    return this.getCardDetails().valid;
  }

  public validateCvv(val: string): boolean {
    val = val || '';
    if(!this.cardNumber) {
      throw 'Invalid cardNumber property set';
    }
    if(!this.card) {
      this.validateCard();
    }
    if(isNaN(Number(val))) {
      throw 'CVV should be a number';
    }
    if(this.cardType && this.cardType === 'maestro') {
      return (val === '') ||
             (val && this.cvvLength.includes(val.length)) ||
             false;
    }
    if (!val) {
      throw 'CVV should be a number';
    }
    return this.cvvLength.includes(val.length);
  }

  public validateExpiry(val: string){
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

    // Check if card is expired (same year but earlier month)
    if (expiry.length === 2 && expiryYear === this.year && expiryMonth <
  this.month!) {
      return false;
    }

    return expiryRegex.test(val.toString()) &&
           expiryMonth > 0 &&
           expiryMonth < 13 &&
           expiryYear >= this.year!;
  }
}

export default CardValidator;
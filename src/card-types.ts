import { CardType } from "./types";

export let cardTypes: CardType[] = [
  {
    name: 'amex',
    pattern: /^3[47]/,
    valid_length: [15],
    cvv_length: [4]
  }, {
    name: 'diners_club_carte_blanche',
    pattern: /^30[0-5]/,
    valid_length: [14],
    cvv_length: [3]
  }, {
    name: 'diners_club_international',
    pattern: /^3([689]|09)/,
    valid_length: [14],
    cvv_length: [3]
  }, {
    name: 'jcb',
    pattern: /^35(2[89]|[3-8][0-9])/,
    valid_length: [16],
    cvv_length: [3]
  }, {
    name: 'laser',
    pattern: /^(6304|670[69]|6771)/,
    valid_length: [16, 17, 18, 19],
    cvv_length: [3, 4] //TODO this field is not confirmed
  }, {
    name: 'visa_electron',
    pattern: /^(4026|417500|4508|4844|491(3|7))/,
    valid_length: [16],
    cvv_length: [3]
  }, {
    name: 'visa',
    pattern: /^4/,
    valid_length: [16],
    cvv_length: [3]
  }, {
    name: 'mastercard',
    range : [[222100, 272099],[510000, 559999]],
    valid_length: [16],
    cvv_length: [3]
  }, {
    name: 'maestro',
    pattern: /^(5018|5081|5044|5020|5038|603845|6304|6759|676[1-3]|6220|504834|504817|504645)\d*/,
    valid_length: [12, 13, 14, 15, 16, 17, 18, 19],
    cvv_length: [0, 3]
  }, {
    name: 'rupay',
    range: [
        [508500, 508999],
        [606985, 607384],
        [607385, 607484],
        [607485, 607984],
        [608001, 608100],
        [608101, 608200],
        [608201, 608300],
        [608301, 608350],
        [608351, 608500],
        [652150, 652849],
        [652850, 653049],
        [653050, 653149],
        [817200, 819899],
        [819900, 820199]
    ],
    valid_length: [16],
    cvv_length: [3]
  },
  {
    name: 'discover',
    pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
    valid_length: [16],
    cvv_length: [3]
  },
  {
    name: 'sodexo',
    pattern: /^(637513)/,
    valid_length: [16],
    cvv_length: [3],
    gaps: [4, 8, 12]
  },
  { name : 'unionpay',
    pattern : /^6[0289]|9[0245689][014568][0123568]\d*/,
    valid_length : [16,17,18,19],
    cvv_length : [3]
  }
];
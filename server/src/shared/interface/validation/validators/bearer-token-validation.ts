import { InvalidParamError } from '@/shared/interface/validation/errors';

import {
  TokenValidator,
  Validation,
} from '@/shared/interface/validation/protocols';

export class BearerTokenValidation implements Validation {
  private readonly fieldName: string;
  private readonly tokenValidator: TokenValidator;

  constructor(fieldName: string, tokenValidator: TokenValidator) {
    this.fieldName = fieldName;
    this.tokenValidator = tokenValidator;
  }

  validate(input: Validation.Params): Validation.Result {
    const token = input[this.fieldName];

    const hasBearer = token.includes('Bearer ');

    if (!hasBearer) return new InvalidParamError(this.fieldName);

    const tokenReplaced = token.replace('Bearer ', '');

    const tokenIsValid = this.tokenValidator.validate(tokenReplaced);

    if (!tokenIsValid) return new InvalidParamError(this.fieldName);
  }
}

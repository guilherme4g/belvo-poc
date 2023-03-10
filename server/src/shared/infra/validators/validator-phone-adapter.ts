import validator from 'validator';

import { PhoneValidator } from '@/shared/interface/validation/protocols';

export class ValidatorPhoneAdapter implements PhoneValidator {
  validate(phone: PhoneValidator.Params): PhoneValidator.Result {
    const phoneIsValid = validator.isMobilePhone(phone, 'pt-BR', {
      strictMode: true,
    });
    return phoneIsValid;
  }
}

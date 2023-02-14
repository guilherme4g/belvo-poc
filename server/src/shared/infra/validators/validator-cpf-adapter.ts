import { CpfValidator } from '@/shared/interface/validation/protocols';

export class ValidatorCpfAdapter implements CpfValidator {
  validate(cpf: CpfValidator.Params): CpfValidator.Result {
    if (typeof cpf !== 'string') return false;

    cpf = cpf.replace(/[\s.-]*/gim, '');

    while (cpf.length < 11) {
      cpf = '0' + cpf;
    }

    if (
      cpf.length !== 11 ||
      !Array.from(cpf).filter((e) => e !== cpf[0]).length
    ) {
      return false;
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  }
}

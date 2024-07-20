import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';

@ValidatorConstraint({ async: false })
class IsDNIConstraint implements ValidatorConstraintInterface {
  validate(dni: string) {
    const dniRegex = /^[0-9]{8}$/;
    return dniRegex.test(dni); // El DNI debe tener exactamente 8 dígitos numéricos
  }

  defaultMessage() {
    return 'DNI debe ser un número de 8 dígitos';
  }
}

// Decorador para la validación del DNI
export function IsDNI(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDNIConstraint,
    });
  };
}
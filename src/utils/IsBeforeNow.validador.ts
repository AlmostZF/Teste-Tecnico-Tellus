import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsBeforeNow(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isBeforeNow',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const valueDate = new Date(value).toLocaleString()
                    if (!(valueDate)) {
                        return false;
                    }
                    const now = new Date().toLocaleString();
                    return valueDate < now;
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be a date before the current date`;
                }
            },
        });
    };
}

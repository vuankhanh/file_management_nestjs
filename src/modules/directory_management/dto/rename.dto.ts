import { IsNotEmpty, IsString, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ async: false })
export class IsSameRootPathConstraint implements ValidatorConstraintInterface {
  validate(newPath: string, args: ValidationArguments) {
    try {
      const oldPath = (args.object as any)[args.constraints[0]];
      const oldRootPath = oldPath.substring(0, oldPath.lastIndexOf("/"));
      const newRootPath = newPath.substring(0, newPath.lastIndexOf("/"));
      return oldRootPath === newRootPath;
    } catch (error) {
      return
    }
  }

  defaultMessage(args: ValidationArguments) {
    return 'Root path of oldPath and newPath must be the same';
  }
}
export class RenameDto {
  @IsString({ message: 'Old path must be a string' })
  @IsNotEmpty({ message: 'Old path is required' })
  oldPath: string;

  @IsString({ message: 'New path must be a string' })
  @IsNotEmpty({ message: 'New path is required' })
  @Validate(IsSameRootPathConstraint, ['oldPath'], { message: 'Root path of oldPath and newPath must be the same' })
  newPath: string;
}
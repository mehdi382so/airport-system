import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class CreatePassengerDto {
  @IsString({ message: 'Firstname must be string' })
  @IsNotEmpty({ message: 'Firstname is required' })
  firstname: string;

  @IsString({ message: 'Lastname must be string' })
  @IsNotEmpty({ message: 'Lastname is required' })
  lastname: string;

  @IsString({ message: 'passport must be string' })
  @IsNotEmpty({ message: 'passport is required' })
  @Matches(/^[1-9]{1}[0-9]{9}$/, {
    message: 'Passenger passport must be ten digits (not starting by 0)',
  })
  passport: string;

  @IsNotEmpty({ message: 'Birth date is required' })
  @IsDateString({}, { message: 'Birth must be Date type' })
  birth: string;

  @IsString({ message: 'Gender must be string' })
  @IsNotEmpty({ message: 'Gender is required' })
  @IsIn(['male', 'female'], {
    message: 'Passenger gender must be one of: male, female',
  })
  gender: string;

  @IsString({ message: 'Phone number must be string' })
  @IsNotEmpty({ message: 'Phone number is required' })
  @Matches(/^(\+?\d{10,15})$/, {
    message:
      'Phone number must be between 10 to 15 numbers (+ must be the first char or not exists)',
  })
  phone: string;
}

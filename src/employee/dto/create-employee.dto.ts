import { IsDateString, IsIn, IsNotEmpty, IsNumber, IsString, Length, Matches } from "class-validator";

export class CreateEmployeeDto {
  @IsNumber({}, { message: 'Airline id must be number' })
  @IsNotEmpty({ message: 'Airline id is required '})
  airline_id: number;
  
  @IsString({ message: 'Username must be string' })
  @IsNotEmpty({ message: 'Username is required' })
  @Matches(/^[A-Za-z0-9]{4,32}$/, { message: 'Username must be between 4 to 32 English letters and numbers'})
  username: string;
  
  @IsString({ message: 'Password must be string' })
  @IsNotEmpty({ message: 'Password is required' })
  @Matches(/^[A-Za-z0-9_\-!@#$%^&*?]{8,64}$/)
  password: string;

  @IsString({ message: 'Role must be string' })
  @IsNotEmpty({ message: 'Role is required '})
  @IsIn([ 'manager', 'pilot', 'crew', 'staff' ])
  role: string;

  @IsString({ message: 'Firstname must be string' })
  @IsNotEmpty({ message: 'Firstname is required' })
  firstname: string
  
  @IsString({ message: 'Lastname must be string' })
  @IsNotEmpty({ message: 'Lastname is required' })
  lastname: string

  @IsNotEmpty({ message: 'Birth date is required' })
  @IsDateString({}, { message: 'Birth must be Date type' })
  birth: string;

  @IsString({ message: 'Gender must be string' })
  @IsNotEmpty({ message: 'Gender is required' })
  @IsIn([ 'male', 'female' ])
  gender: string

  @IsString({ message: 'Phone number must be string' })
  @IsNotEmpty({ message: 'Phone number is required' })
  @Matches(/^(\+?\d{10,15})$/, { message: 'Phone number must be between 10 to 15 numbers (+ must be the first char or not exists)'})
  phone: string;
}
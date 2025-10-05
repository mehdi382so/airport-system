import { IsNotEmpty, IsString } from 'class-validator';

export class LoginEmployeeDto {
  @IsString({ message: 'Username must be string' })
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @IsString({ message: 'Password must be string' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}

import { IsNotEmpty, IsString, IsUrl, Matches } from 'class-validator';

export class CreateAirlineDto {
  @IsString({ message: 'Airline name must be string' })
  @IsNotEmpty({ message: 'Airline name is required' })
  name: string;

  @IsString({ message: 'Country name must be string' })
  @IsNotEmpty({ message: 'Country name is required' })
  country: string;

  @IsUrl({}, { message: 'Website url is invalid' })
  website: string;

  @IsString({ message: 'Phone number must be string' })
  @IsNotEmpty({ message: 'Phone number is required' })
  @Matches(/^(\+?\d{10,15})$/, {
    message:
      'Phone number must be between 10 to 15 numbers (+ must be the first char or not exists)',
  })
  phone: string;
}

import { IsLatitude, IsLongitude, IsNotEmpty, IsString } from 'class-validator';

export class CreateAirportDto {
  @IsString({ message: 'Airport name must be string' })
  @IsNotEmpty({ message: 'Airport name is required' })
  name: string;

  @IsString({ message: 'Airport city must be string' })
  @IsNotEmpty({ message: 'Airport city is required' })
  city: string;

  @IsString({ message: 'Airport country must be string' })
  @IsNotEmpty({ message: 'Airport country is required' })
  country: string;

  @IsString({ message: 'Airport timezone must be string' })
  @IsNotEmpty({ message: 'Airport timezone is required' })
  timezone: string;

  @IsLatitude({ message: 'Latitude is not valid' })
  latitude: number;

  @IsLongitude({ message: 'Longitude is not valid' })
  longitude: number;
}

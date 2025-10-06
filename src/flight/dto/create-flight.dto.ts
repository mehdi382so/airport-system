import {
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateFlightDto {
  @IsInt({ message: 'Route id must be number' })
  @Min(1, { message: 'Route id must be at least 1' })
  @IsNotEmpty({ message: 'Route id is required' })
  route_id: number;

  @IsInt({ message: 'Aircraft id must be number' })
  @Min(1, { message: 'Aircraft id must be at least 1' })
  @IsNotEmpty({ message: 'Aircraft id is required' })
  aircraft_id: number;

  @IsString({ message: 'Flight number must be string' })
  @IsNotEmpty({ message: 'Flight number is required' })
  number: string;

  @IsDateString(
    {},
    { message: 'Flight departure must be a valid date-time string' },
  )
  @IsNotEmpty({ message: 'Flight departure time is required' })
  departure: string;

  @IsDateString(
    {},
    { message: 'Flight arrival must be a valid date-time string' },
  )
  @IsNotEmpty({ message: 'Flight arrival time is required' })
  arrival: string;

  @IsString({ message: 'Flight status must be string' })
  @IsIn(['scheduled', 'delayed', 'cancelled', 'completed'], {
    message:
      'Flight status must be one of: scheduled, delayed, cancelled, completed',
  })
  @IsNotEmpty({ message: 'Flight status is required' })
  status: string;

  @IsNumber({}, { message: 'Flight base price must be number' })
  @Min(0, { message: 'Flight base price must be at least 0' })
  @IsNotEmpty({ message: 'Flight base price is required' })
  base_price: number;
}

import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateRouteDto {
  @IsInt({ message: 'Origin airport id must be number' })
  @IsNotEmpty({ message: 'Origin airport id is required' })
  origin_airport_id: number;

  @IsInt({ message: 'Destination airport id must be number' })
  @IsNotEmpty({ message: 'Destination airport id is required' })
  destination_airport_id: number;

  @IsNumber({}, { message: 'Route distance must be number' })
  @IsNotEmpty({ message: 'Route distance is required' })
  @Min(1, { message: 'Route distance must be at least 1' })
  distance_km: number;

  @IsInt({ message: 'Route estimated time must be number' })
  @IsNotEmpty({ message: 'Route estimated time is required' })
  @Min(1, { message: 'Route estimated time must be at least 1' })
  estimated_duration_min: number;
}

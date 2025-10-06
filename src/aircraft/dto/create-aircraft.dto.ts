import { IsIn, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateAircraftDto {
  @IsString({ message: 'Aircraft model must be string' })
  @IsNotEmpty({ message: 'Aircraft model is required' })
  model: string;

  @IsString({ message: 'Aircraft type must be string' })
  @IsNotEmpty({ message: 'Aircraft type is required' })
  type: string;

  @IsInt({ message: 'Aircraft capacity must be number' })
  @Min(1, { message: 'Aircraft capacity must be at least 1' })
  capacity: number;

  @IsString({ message: 'Aircraft name must be string' })
  @IsNotEmpty({ message: 'Aircraft name is required' })
  name: string;

  @IsInt({ message: 'Aircraft year built must be number' })
  @Min(1900, { message: 'Aircraft year built must be greater than 1900' })
  @Max(new Date().getFullYear(), {
    message: 'Year built cannot be in the future',
  })
  year_built: number;

  @IsString({ message: 'Status must be string' })
  @IsIn(['active', 'maintenance', 'retired'], {
    message: 'Aircraft status must be one of: active, maintenance and retired',
  })
  status: string;
}

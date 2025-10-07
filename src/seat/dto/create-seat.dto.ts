import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateSeatDto {
  @IsInt({ message: 'Aircraft id must be number' })
  aircraft_id: number;

  @IsString({ message: 'Seat number must be string' })
  @IsNotEmpty({ message: 'Seat number is required' })
  number: string;

  @IsString({ message: 'Seat class must be string' })
  @IsIn(['economy', 'business', 'first'], {
    message: 'Seat class must be one of : economy, business, first',
  })
  class: string;

  @IsBoolean({ message: 'Seat position by window is boolean' })
  is_window: boolean;

  @IsBoolean({ message: 'Seat position by aisle is boolean' })
  is_aisle: boolean;
}

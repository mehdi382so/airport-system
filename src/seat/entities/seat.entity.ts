import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('seats')
export class Seat {
  @PrimaryGeneratedColumn()
  seat_id: number;

  @Column()
  aircraft_id: number;

  @Column()
  number: string;

  @Column()
  class: string;

  @Column({ default: false })
  is_window: boolean;

  @Column({ default: false })
  is_aisle: boolean;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('airlines')
export class Airline {
  @PrimaryGeneratedColumn()
  airline_id: number;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  website: string;

  @Column()
  phone: string;
}

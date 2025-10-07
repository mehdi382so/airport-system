import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('passengers')
export class Passenger {
  @PrimaryGeneratedColumn()
  passenger_id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  birth: string;

  @Column()
  gender: string;

  @Column()
  passport: string;

  @Column()
  phone: string;
}

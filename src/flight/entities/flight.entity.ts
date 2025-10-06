import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('flights')
export class Flight {
  @PrimaryGeneratedColumn()
  flight_id: number;

  @Column()
  airline_id: number;

  @Column()
  route_id: number;

  @Column()
  aircraft_id: number;

  @Column()
  number: string;

  @Column({ type: 'timestamptz' })
  departure: Date;

  @Column({ type: 'timestamptz' })
  arrival: Date;

  @Column()
  status: string;

  @Column('double precision')
  base_price: number;
}

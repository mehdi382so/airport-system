import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('aircrafts')
export class Aircraft {
  @PrimaryGeneratedColumn()
  aircraft_id: number;

  @Column()
  airline_id: number;

  @Column()
  model: string;

  @Column()
  type: string;

  @Column()
  capacity: number;

  @Column()
  name: string;

  @Column()
  year_built: number;

  @Column()
  status: string;
}

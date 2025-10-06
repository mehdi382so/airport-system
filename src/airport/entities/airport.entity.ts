import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('airports')
export class Airport {
  @PrimaryGeneratedColumn()
  airport_id: number;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  timezone: string;

  @Column('double precision')
  latitude: number;

  @Column('double precision')
  longitude: number;
}

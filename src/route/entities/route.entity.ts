import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('routes')
export class Route {
  @PrimaryGeneratedColumn()
  route_id: number;

  @Column()
  origin_airport_id: number;

  @Column()
  destination_airport_id: number;

  @Column('double precision')
  distance_km: number;

  @Column()
  estimated_duration_min: number;
}

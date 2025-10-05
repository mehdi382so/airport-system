import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  employee_id: number;

  @Column()
  airline_id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  birth: string;

  @Column()
  gender: string;

  @Column()
  phone: string;
}

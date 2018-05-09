import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class User_Entity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 500
  })
  name: string;

  @Column('varchar')
  password: string;

  @UpdateDateColumn()
  create_at: string;
}
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  otp: number;

  @Column()
  phone_number: string;

  @Column()
  is_otp_verified:boolean
 
  @Column()
  is_loged_in:boolean
 
  
}

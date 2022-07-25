import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Photos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  getUrl: string;

  @Column()
  putUrl: string;

   
  @Column()
  name: string;


  @Column()
  type: string;

}

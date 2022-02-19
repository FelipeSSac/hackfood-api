import {
  Column, CreateDateColumn,
  Entity, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import { IUser } from '@modules/users/entities/IUser';

@Entity('users')
class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column('varchar')
    name: string;

  @Column('varchar')
    email: string;

  @CreateDateColumn()
    created_at: Date;

  @UpdateDateColumn()
    updated_at: Date;
}

export { User };

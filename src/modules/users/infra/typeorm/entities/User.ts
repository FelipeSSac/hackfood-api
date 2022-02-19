import {
  Column, PrimaryGeneratedColumn,
  Entity, OneToMany,
  CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { IUser } from '@modules/users/entities/IUser';

import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { IProduct } from '@modules/products/entities/IProduct';

@Entity('users')
class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column('varchar')
    name: string;

  @Column('varchar')
    email: string;

  @Exclude()
  @Column('varchar')
    password: string;

  @OneToMany(() => Product, (product) => product.user)
    products: IProduct[];

  @CreateDateColumn()
    created_at: Date;

  @UpdateDateColumn()
    updated_at: Date;
}

export { User };

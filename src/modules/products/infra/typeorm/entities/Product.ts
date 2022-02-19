import {
  Column, CreateDateColumn,
  Entity, JoinColumn,
  ManyToOne, PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import { IProduct } from '@modules/products/entities/IProduct';

import { IUser } from '@modules/users/entities/IUser';
import { User } from '@modules/users/infra/typeorm/entities/User';

@Entity('products')
class Product implements IProduct {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column('varchar')
    name: string;

  @Column('numeric')
    price: number;

  @Column('boolean')
    has_lactose: boolean;

  @Column({
    type: 'varchar',
    nullable: true,
  })
    description?: string | undefined;

  @Column({
    type: 'varchar',
    nullable: true,
  })
    image?: string | undefined;

  @Exclude()
  @Column('uuid')
    user_id: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.products)
    user: IUser;

  @CreateDateColumn()
    created_at: string;

  @UpdateDateColumn()
    updated_at: string;

  @Expose({ name: 'image_url' })
  getImageUrl(): string | null {
    return this.image
      ? `${process.env.APP_API_URL}/files/${this.image}`
      : '';
  }
}

export { Product };

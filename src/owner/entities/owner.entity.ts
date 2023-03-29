import { Account } from 'src/account/entities/account.entity';
import { OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Column } from 'typeorm';

export class Owner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  business: boolean;

  @OneToMany(() => Account, (account) => account.owner)
  account: Account[];
}

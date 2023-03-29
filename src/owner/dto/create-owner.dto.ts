import { IsNotEmpty } from 'class-validator';

export class CreateOwnerDto {
  @IsNotEmpty({ message: 'A teljes név nem lehet üres' })
  name: string;
  @IsNotEmpty({ message: 'Válasszon, hogy üzleti vagy magánszemély' })
  bussines: boolean;
}

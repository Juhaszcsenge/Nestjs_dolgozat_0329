import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { Owner } from 'src/owner/entities/owner.entity';
import { ManyToOne } from 'typeorm';

export class CreateAccountDto {
  id: number;
  @IsString()
  @IsNotEmpty({ message: 'Nem lehet üres ' })
  type: string;
  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'Nem lehet kisebb mint 1' })
  size: number;
}

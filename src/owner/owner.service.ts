import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnerService {
  constructor(private dataSource: DataSource) {}

  async create(createOwnerDto: CreateOwnerDto) {
    const OwnerRepo = this.dataSource.getRepository(Owner);
    const newOwner = new Owner();
    newOwner.fullName = createOwnerDto.name;
    newOwner.business = createOwnerDto.bussines;
    await OwnerRepo.save(newOwner);
  }

  async findAll() {
    return await this.dataSource.getRepository(Owner).find();
  }

  async findOne(id: number) {
    return await this.dataSource.getRepository(Owner).findBy({ id: id });
  }

  async update(id: number, updateOwnerDto: UpdateOwnerDto) {
    const OwnerRepo = this.dataSource.getRepository(Owner);
    if (!(await OwnerRepo.findOneBy({ id: id }))) {
      throw new BadRequestException('Ilyen id-val nem található user');
    }
    const OwnerToUpdate = await OwnerRepo.findOneBy({ id });
    if (updateOwnerDto.bussines == null && updateOwnerDto.name == null) {
      throw new BadRequestException('Nem társul semmilyen adat');
    }
    OwnerToUpdate.fullName = updateOwnerDto.name;
    OwnerToUpdate.business = updateOwnerDto.bussines;
  }

  async remove(id: number) {
    const OwnerRepo = this.dataSource.getRepository(Owner);

    if (!(await OwnerRepo.findOneBy({ id: id }))) {
      throw new BadRequestException('Ilyen id-val nem található');
    }
    OwnerRepo.delete(id);
  }
}

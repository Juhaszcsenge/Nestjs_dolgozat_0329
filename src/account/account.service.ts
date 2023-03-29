import { BadRequestException, Injectable, ConflictException} from '@nestjs/common';
import { Owner } from 'src/owner/entities/owner.entity';
import { DataSource } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(private dataSource : DataSource) {

  }

    async create(createAccountDto: CreateAccountDto) {
      const AccountRep = this.dataSource.getRepository(Account)
      const newAccount = new Account()
      newAccount.type = createAccountDto.type
      newAccount.size = createAccountDto.size
      await AccountRep.save(newAccount)
    }
 
  async addAccountToBank(accountid : Number, ownerid : number){
    const AccountRep = this.dataSource.getRepository(Account)
    const OwnerRepo = this.dataSource.getRepository(Owner)
    const Account = await AccountRep.findOne({where: {id : accountid}, relations : {Owner : true}}})
    const user = await OwnerRepo.findOne({id : ownerid})
    console.log(Account)

    if (Account == null){
      throw new BadRequestException("Ilyen számla nem létezik")
    }
    if (user == null){
      throw new BadRequestException("A felhasználó nem létezik")
    }
    if(Account.Owner != null){
      throw new ConflictException("Már van ilyen számla")
    }
    Account.Owner = user
    return AccountRep.save(Account)

  

  async findAll() {
    return await this.dataSource.getRepository(Account).find;
  }

  async findOne(id: number) {
    return await this.dataSource.getRepository(Account).findBy({id: id});
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const AccountRep = this.dataSource.getRepository(Account)
    if(!await AccountRep.findOneBy({id: id})){
      throw new BadRequestException("Ilyen id-val nincs számla")
    }
    const AccountToUpdate = await AccountRep.findOneBy({id})
    if(UpdateAccountDto.accounNumber == null && UpdateAccountDto.balance == null){
      throw new BadRequestException("Nincs semilyen adat")
    }
    AccountToUpdate.type = UpdateAccountDto.accounNumber
    AccountToUpdate.size = UpdateAccountDto.balance
  }

  async remove(id: number) {
    const AccountRep = this.dataSource.getRepository(Account)
    if(!await AccountRep.findOneBy({id: id})) {
      throw new BadRequestException("Ilyen id-val nem található számla")
    }
    AccountRep.delete(id)
  }
}



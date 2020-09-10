import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { User } from '../user/user.entity'
import { Admin } from '../admin/admin.entity'
import { TokenListing } from '../tokenlisting/tokenlisting.entity'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  database: 'etherpm',
  password: 'postgres',
  entities: [ User, TokenListing, Admin ],
  synchronize: true,
}

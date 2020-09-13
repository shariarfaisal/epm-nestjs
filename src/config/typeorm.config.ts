import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { User } from '../user/user.entity'
import { Admin } from '../admin/admin.entity'
import { TokenListing } from '../tokenlisting/tokenlisting.entity'
import * as config from 'config'

const dbConfig = config.get('db')

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE || dbConfig.type,
  host: process.env.DB_HOST || dbConfig.host,
  port: process.env.DB_PORT || dbConfig.port,
  username: process.env.DB_USERNAME || dbConfig.username,
  database: process.env.DB_DATABASE || dbConfig.database,
  password: process.env.DB_PASSWORD || dbConfig.password,
  entities: [ User, TokenListing, Admin ],
  synchronize: dbConfig.synchronize,
}

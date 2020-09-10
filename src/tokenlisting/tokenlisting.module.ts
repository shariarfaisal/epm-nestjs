import { Module } from '@nestjs/common';
import { TokenlistingController } from './tokenlisting.controller';
import { TokenlistingService } from './tokenlisting.service';
import { PassportModule } from '@nestjs/passport'



@Module({
  imports:[
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [TokenlistingController],
  providers: [TokenlistingService]
})
export class TokenlistingModule {}

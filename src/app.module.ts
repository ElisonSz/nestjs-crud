import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { EquiposController } from './equipos/equipos.controller';
import { EquiposService } from './equipos/equipos.service';
import { EquiposModule } from './equipos/equipos.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, EquiposModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

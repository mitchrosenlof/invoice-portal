import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { InvoicesModule } from './invoices/invoices.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, InvoicesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

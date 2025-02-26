import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { InvoicesModule } from './invoices/invoices.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller'
import { InvoicesController } from './invoices/invoices.controller';

@Module({
  imports: [DatabaseModule, InvoicesModule, AuthModule, UsersModule],
  providers: [AppService],
})
export class AppModule {}

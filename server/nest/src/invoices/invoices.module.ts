import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [InvoicesController],
  providers: [InvoicesService],
  exports: [InvoicesService],
})

export class InvoicesModule {}

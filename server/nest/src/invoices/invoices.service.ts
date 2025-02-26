import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class InvoicesService {
  constructor(private readonly databaseService: DatabaseService) {}
  
  async create(createInvoiceDto: Prisma.InvoiceCreateInput) {
    return this.databaseService.invoice.create({
      data: createInvoiceDto
    })
  }

  async findAll(userId: number) {
    return this.databaseService.invoice.findMany({
      where: {
        user_id: userId
      },
    });
  }

  async findOne(userId: number, id: number) {
    return this.databaseService.invoice.findUnique({
      where: {
        id,
        user_id: userId
      }
    });
  }
}

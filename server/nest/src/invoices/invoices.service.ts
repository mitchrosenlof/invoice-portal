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

  async findAll() {
    return this.databaseService.invoice.findMany({});
  }

  async findOne(id: number) {
    return this.databaseService.invoice.findUnique({
      where: {
        id,
      }
    });
  }

  // update(id: number, updateInvoiceDto: Prisma.InvoiceUpdateInput) {
  //   return this.databaseService.invoice.update({
  //     where: {
  //       id,
  //     },
  //     data: updateInvoiceDto,
  //   });
  // }
}

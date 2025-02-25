import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { Prisma } from '@prisma/client';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  create(@Body() createInvoiceDto: Prisma.InvoiceCreateInput) {
    return this.invoicesService.create(createInvoiceDto);
  }

  @Get()
  findAll(@Body() findAllInvoicesDto: { userId: number }) {
    return this.invoicesService.findAll(findAllInvoicesDto.userId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.invoicesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
  //   return this.invoicesService.update(+id, updateInvoiceDto);
  // }
}

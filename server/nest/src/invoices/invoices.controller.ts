import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { Prisma } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService, private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createInvoiceDto: Prisma.InvoiceCreateInput) {
    return this.invoicesService.create(createInvoiceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getInvoices(@Request() req) {
    const user = await this.usersService.findOne(req.user.email);
    const invoices = await this.invoicesService.findAll(user!.id);
    return invoices;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getInvoice(@Request() req, @Param('id') id: string) {
    const user = await this.usersService.findOne(req.user.email);
    const invoices = await this.invoicesService.findOne(user!.id, +id);
    return invoices;
  }
}

import { Controller, Get, Post, UseGuards, Request, Param } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { InvoicesService } from './invoices/invoices.service';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private appService: AppService,
    private authService: AuthService,
    private invoicesService: InvoicesService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }


  @UseGuards(LocalAuthGuard)
  @Post('auth/logout')
  async logout(@Request() req) {
    return req.logout();
  }

  @UseGuards(JwtAuthGuard)
  @Get('invoices')
  async getInvoices(@Request() req) {
    const user = await this.usersService.findOne(req.user.email);
    const invoices = await this.invoicesService.findAll(user!.id);
    return invoices;
  }

  @UseGuards(JwtAuthGuard)
  @Get('invoices/:id')
  async getInvoice(@Request() req, @Param('id') id: string) {
    const user = await this.usersService.findOne(req.user.email);
    const invoices = await this.invoicesService.findOne(user!.id, +id);
    return invoices;
  }
}

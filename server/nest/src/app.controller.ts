import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('invoices')
export class AppController {
  constructor(private readonly appService: AppService) {}
}

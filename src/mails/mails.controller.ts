import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { MailsService } from './mails.service';
import { CreateMailDto } from './dto/create-mail.dto';


@Controller('mails')
export class MailsController {
  constructor(private readonly mailsService: MailsService) {}

  @Post()
  send_bases(@Body() createMailDto: CreateMailDto) {
    return this.mailsService.send_bases(createMailDto)
  }

  @Get()
  findAll() {
    return this.mailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mailsService.findOne(+id);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mailsService.remove(+id);
  }
}

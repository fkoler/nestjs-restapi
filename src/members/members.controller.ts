import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Ip } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

import { MembersService } from './members.service';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

@SkipThrottle()
@Controller('members')
export class MembersController {

  constructor(private readonly membersService: MembersService) { }

  private readonly logger = new MyLoggerService(MembersController.name);

  @Post()
  create(@Body() createMemberDto: Prisma.MemberCreateInput) {
    return this.membersService.create(createMemberDto);
  }

  @SkipThrottle({ default: false })
  @Get()
  findAll(@Ip() ip: string, @Query('instrument') instrument?: 'Vocal' | 'Guitar' | 'Drums' | 'Keyboards' | 'Bass') {
    this.logger.log(`Request for All Members\t${ip}`, MembersController.name);

    return this.membersService.findAll(instrument);
  }

  @Throttle({ short: { ttl: 1000, limit: 1 } })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: Prisma.MemberUpdateInput) {
    return this.membersService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membersService.remove(+id);
  }
}

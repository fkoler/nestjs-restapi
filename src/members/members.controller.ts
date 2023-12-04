import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { MembersService } from './members.service';


@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) { }

  @Post()
  create(@Body() createMemberDto: Prisma.MemberCreateInput) {
    return this.membersService.create(createMemberDto);
  }

  @Get()
  findAll(@Query('instrument') instrument?: 'Vocal' | 'Guitar' | 'Drums' | 'Keyboards' | 'Bass') {
    return this.membersService.findAll(instrument);
  }

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

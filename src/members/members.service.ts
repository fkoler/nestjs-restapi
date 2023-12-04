import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class MembersService {

  constructor(private readonly databaseService: DatabaseService) { }

  async create(createMemberDto: Prisma.MemberCreateInput) {
    return this.databaseService.member.create({
      data: createMemberDto
    });
  }

  async findAll(instrument?: 'Vocal' | 'Guitar' | 'Drums' | 'Keyboards' | 'Bass') {
    if (instrument) return this.databaseService.member.findMany({
      where: {
        instrument,
      }
    });

    return this.databaseService.member.findMany()
  }

  async findOne(id: number) {
    return this.databaseService.member.findUnique({
      where: {
        id,
      }
    });
  }

  async update(id: number, updateMemberDto: Prisma.MemberUpdateInput) {
    return this.databaseService.member.update({
      where: {
        id,
      },
      data: updateMemberDto,
    })
  }

  async remove(id: number) {
    return this.databaseService.member.delete({
      where: {
        id,
      }
    });
  }
}

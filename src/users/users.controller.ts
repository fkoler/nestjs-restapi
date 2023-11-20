import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get()
    findAll(@Query('instrument') instrument?: 'Vocal' | 'Guitar' | 'Drums' | 'Keyboards' | 'Bass') {
        return this.usersService.findAll(instrument);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Post()
    create(@Body() user: {
        first_name: string,
        last_name: string,
        instrument: 'Vocal' | 'Guitar' | 'Drums' | 'Keyboards' | 'Bass',
    }) {
        return this.usersService.create(user);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() userUpdate: {
        first_name?: string,
        last_name?: string,
        instrument?: 'Vocal' | 'Guitar' | 'Drums' | 'Keyboards' | 'Bass',
    }) {
        return this.usersService.update(+id, userUpdate);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.usersService.delete(+id);
    }
}

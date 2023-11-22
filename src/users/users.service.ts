import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDto } from './DTO/create-user.dto';
import { UpdateUserDto } from './DTO/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "first_name": "Till",
            "last_name": "Lindemann",
            "instrument": "Vocal"
        },
        {
            "id": 2,
            "first_name": "Paul",
            "last_name": "Landers",
            "instrument": "Guitar"
        },
        {
            "id": 3,
            "first_name": "Christoph",
            "last_name": "Schneider",
            "instrument": "Drums"
        },
        {
            "id": 4,
            "first_name": "Christian",
            "last_name": "Lorenz",
            "instrument": "Keyboards"
        },
        {
            "id": 5,
            "first_name": "Richard",
            "last_name": "Kruspe",
            "instrument": "Guitar"
        },
        {
            "id": 6,
            "first_name": "Oliver",
            "last_name": "Riedel",
            "instrument": "Bass"
        }
    ];

    findAll(instrument?: 'Vocal' | 'Guitar' | 'Drums' | 'Keyboards' | 'Bass') {

        if (instrument) {
            const instrumentsArray = this.users.filter(user => user.instrument === instrument);

            if (instrumentsArray.length === 0) throw new NotFoundException('Instrument\'s Player Not Found');

            return instrumentsArray;
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);

        if (!user) throw new NotFoundException('This Instrument Not Found');

        return user;
    }

    create(createUserDto: CreateUserDto) {
        const usersByHighestId = [...this.users]
            .sort((a, b) => b.id - a.id);

        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...createUserDto,
        };

        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updateUserDto }
            }
            return user;
        })

        return this.findOne(id);
    };

    delete(id: number) {
        const deletedUser = this.findOne(id);

        this.users = this.users.filter(user => user.id !== id);

        return deletedUser;
    }
}

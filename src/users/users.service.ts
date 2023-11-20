import { Injectable } from '@nestjs/common';

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
            return this.users.filter(user => user.instrument === instrument);
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);

        return user;
    }

    create(user: {
        first_name: string,
        last_name: string,
        instrument: 'Vocal' | 'Guitar' | 'Drums' | 'Keyboards' | 'Bass',
    }) {
        const usersByHighestId = [...this.users]
            .sort((a, b) => b.id - a.id);

        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...user,
        };

        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updatedUser: {
        first_name?: string,
        last_name?: string,
        instrument?: 'Vocal' | 'Guitar' | 'Drums' | 'Keyboards' | 'Bass',
    }) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updatedUser }
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

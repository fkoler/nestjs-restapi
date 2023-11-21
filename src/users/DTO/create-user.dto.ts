export class CreateUserDto {
    first_name: string;
    last_name: string;
    instrument: 'Vocal' | 'Guitar' | 'Drums' | 'Keyboards' | 'Bass';
};

import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsEnum(['Vocal', 'Guitar', 'Drums', 'Keyboards', 'Bass'], {
        message: 'Valid Instrument required'
    })
    instrument: 'Vocal' | 'Guitar' | 'Drums' | 'Keyboards' | 'Bass';
};

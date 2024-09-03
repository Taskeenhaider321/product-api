import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../schemas/product.schema';
import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { User } from '../../auth/schema/auth.schema';

export class CreateProductDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(Category, { message: "Please enter correct category." })
    category: Category;

    user: User
}
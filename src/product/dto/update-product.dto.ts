import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../schemas/product.schema';
import { IsString, IsEnum, IsNumber, ValidateIf, IsNotEmpty } from 'class-validator';
import { User } from '../../auth/schema/auth.schema';

export class UpdateProductDto {

    @ApiProperty()
    @IsString()
    @ValidateIf(o => o.name !== undefined)
    @IsNotEmpty({ message: 'Name must not be an empty string if provided.' })
    name?: string;

    @ApiProperty()
    @IsString()
    @ValidateIf(o => o.description !== undefined)
    @IsNotEmpty({ message: 'Description must not be an empty string if provided.' })
    description?: string;

    @ApiProperty()
    @IsNumber()
    price?: number;

    @ApiProperty()
    @IsEnum(Category, { message: "Please enter a correct category." })
    category?: Category;

    user?: User;
}

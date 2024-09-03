import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    Matches,
  } from 'class-validator';
  import { Transform } from 'class-transformer';
  import * as validator from 'validator';
  import { ApiProperty } from "@nestjs/swagger";
  
  export class SignUpAuthDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => validator.escape(value.trim()))
    name: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @Transform(({ value }) => validator.normalizeEmail(value))
    email: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' })
    @Matches(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter' })
    @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number' })
    @Matches(/(?=.*[!@#$%^&*])/, { message: 'Password must contain at least one special character' })
    password: string;
  }
  
import { ClassTransformer, Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsString, ValidateNested } from "class-validator";
import { CreateAddressDto } from "./create-address.dto";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  // @IsNotEmptyObject()
  // @ValidateNested()
  // @Type(() => CreateAddressDto)
  // address: CreateAddressDto;
}

import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { CreateAddressDto } from "src/users/dtos/create-address.dto";

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  // @IsString()
  // @IsNotEmpty()
  // address: CreateAddressDto;
}

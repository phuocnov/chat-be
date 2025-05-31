import { CreateAddressDto } from "src/users/dtos/create-address.dto";

export class SignUpDto {
  username: string;
  email: string;
  password: string;
  address: CreateAddressDto;
}

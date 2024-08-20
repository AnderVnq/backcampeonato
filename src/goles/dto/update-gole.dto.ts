import { PartialType } from '@nestjs/mapped-types';
import { CreateGoleDto } from './create-gole.dto';

export class UpdateGoleDto extends PartialType(CreateGoleDto) {}

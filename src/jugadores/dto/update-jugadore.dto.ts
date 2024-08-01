import { PartialType } from '@nestjs/mapped-types';
import { CreateJugadoreDto } from './create-jugadore.dto';

export class UpdateJugadoreDto extends PartialType(CreateJugadoreDto) {}

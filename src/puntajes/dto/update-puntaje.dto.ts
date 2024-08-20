import { PartialType } from '@nestjs/mapped-types';
import { CreatePuntajeDto } from './create-puntaje.dto';

export class UpdatePuntajeDto extends PartialType(CreatePuntajeDto) {}

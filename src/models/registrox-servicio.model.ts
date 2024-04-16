import {Entity, model, property} from '@loopback/repository';

@model()
export class RegistroxServicio extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'date',
    required: true,
  })
  hora: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @property({
    type: 'string',
  })
  comentario?: string;

  @property({
    type: 'string',
    required: true,
  })
  code: string;


  constructor(data?: Partial<RegistroxServicio>) {
    super(data);
  }
}

export interface RegistroxServicioRelations {
  // describe navigational properties here
}

export type RegistroxServicioWithRelations = RegistroxServicio & RegistroxServicioRelations;

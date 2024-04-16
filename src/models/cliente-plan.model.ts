import {Entity, model, property} from '@loopback/repository';

@model()
export class ClientePlan extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  cuota: string;

  @property({
    type: 'number',
    required: true,
  })
  precioDefinido: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaInicio: string;


  constructor(data?: Partial<ClientePlan>) {
    super(data);
  }
}

export interface ClientePlanRelations {
  // describe navigational properties here
}

export type ClientePlanWithRelations = ClientePlan & ClientePlanRelations;

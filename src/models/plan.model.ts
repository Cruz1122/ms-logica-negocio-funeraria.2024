import {Entity, model, property} from '@loopback/repository';

@model()
export class Plan extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
  })
  detalles?: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidadBeneficiarios: number;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;


  constructor(data?: Partial<Plan>) {
    super(data);
  }
}

export interface PlanRelations {
  // describe navigational properties here
}

export type PlanWithRelations = Plan & PlanRelations;

import {Entity, model, property} from '@loopback/repository';

@model()
export class Facturacion extends Entity {
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
  fechaFacturacion: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estadoPago: boolean;


  constructor(data?: Partial<Facturacion>) {
    super(data);
  }
}

export interface FacturacionRelations {
  // describe navigational properties here
}

export type FacturacionWithRelations = Facturacion & FacturacionRelations;

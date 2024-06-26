import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Facturacion} from './facturacion.model';

@model({
  settings: {
    foreignKeys:
    {
      fk_pago_idFacturacion: {
        name: "fk_pago_idFacturacion",
        entity: "Facturacion",
        entityKey: "id",
        foreignKey: "idFacturacion"
      },
    }
  }
})
export class Pago extends Entity {
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
  metodoPago: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaPago: string;

  @belongsTo(() => Facturacion, {name: 'facturacion'})
  idFacturacion: number;

  constructor(data?: Partial<Pago>) {
    super(data);
  }
}

export interface PagoRelations {
  // describe navigational properties here
}

export type PagoWithRelations = Pago & PagoRelations;

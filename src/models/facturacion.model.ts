import {Entity, belongsTo, hasOne, model, property} from '@loopback/repository';
import {ClientePlan} from './cliente-plan.model';
import {Pago} from './pago.model';

@model({
  settings: {
    foreignKeys:
    {
      fk_facturacion_idClientePlan: {
        name: "fk_facturacion_idClientePlan",
        entity: "ClientePlan",
        entityKey: "id",
        foreignKey: "idClientePlan"
      },
    }
  }
})
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

  @hasOne(() => Pago, {keyTo: 'idFacturacion'})
  pago: Pago;

  @belongsTo(() => ClientePlan, {name: 'ClientePlan'})
  idClientePlan: number;

  constructor(data?: Partial<Facturacion>) {
    super(data);
  }
}

export interface FacturacionRelations {
  // describe navigational properties here
}

export type FacturacionWithRelations = Facturacion & FacturacionRelations;

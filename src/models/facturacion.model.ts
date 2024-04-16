import {Entity, model, property, hasOne, belongsTo} from '@loopback/repository';
import {Pago} from './pago.model';
import {ClientePlan} from './cliente-plan.model';

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

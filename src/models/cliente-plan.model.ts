import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Facturacion} from './facturacion.model';
import {Cliente} from './cliente.model';
import {Plan} from './plan.model';

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

  @hasMany(() => Facturacion, {keyTo: 'idClientePlan'})
  facturaciones: Facturacion[];

  @belongsTo(() => Cliente, {name: 'cliente'})
  idCliente: number;

  @belongsTo(() => Plan, {name: 'plan'})
  idPlan: number;

  constructor(data?: Partial<ClientePlan>) {
    super(data);
  }
}

export interface ClientePlanRelations {
  // describe navigational properties here
}

export type ClientePlanWithRelations = ClientePlan & ClientePlanRelations;

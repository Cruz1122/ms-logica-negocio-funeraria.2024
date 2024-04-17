import {Entity, belongsTo, hasMany, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Facturacion} from './facturacion.model';
import {Plan} from './plan.model';

@model({
  settings: {
    foreignKeys:
    {
      fk_clientePlan_idCliente: {
        name: "fk_clientePlan_idCliente",
        entity: "Cliente",
        entityKey: "id",
        foreignKey: "idCliente"
      },
      fk_clientePlan_idPlan: {
        name: "fk_clientePlan_idPlan",
        entity: "Plan",
        entityKey: "id",
        foreignKey: "idPlan"
      },
    }
  }
})
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

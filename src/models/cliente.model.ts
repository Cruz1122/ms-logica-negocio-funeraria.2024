import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {ClientePlan} from './cliente-plan.model';
import {Beneficiario} from './beneficiario.model';

@model()
export class Cliente extends Entity {
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
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  documento: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estado: boolean;

  @property({
    type: 'date',
    required: true,
  })
  fechaRegistro: string;

  @hasOne(() => ClientePlan, {keyTo: 'idCliente'})
  clientePlan: ClientePlan;

  @hasMany(() => Beneficiario, {keyTo: 'idCliente'})
  beneficiarios: Beneficiario[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;

import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {EstadoBeneficiario} from './estado-beneficiario.model';

@model({
  settings: {
    foreignKeys:
    {
      fk_beneficiario_idCliente: {
        name: "fk_beneficiario_idCliente",
        entity: "Cliente",
        entityKey: "id",
        foreignKey: "idCliente"
      },
      fk_beneficiario_idEstadoBeneficiario: {
        name: "fk_beneficiario_idEstadoBeneficiario",
        entity: "EstadoBeneficiario",
        entityKey: "id",
        foreignKey: "idEstadoBeneficiario"
      },
    }

  }
})
export class Beneficiario extends Entity {
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
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  numeroDocumento: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaRegistro: string;

  @belongsTo(() => Cliente, {name: 'cliente'})
  idCliente: number;

  @belongsTo(() => EstadoBeneficiario, {name: 'estadoBeneficiario'})
  idEstadoBeneficiario: number;

  constructor(data?: Partial<Beneficiario>) {
    super(data);
  }
}

export interface BeneficiarioRelations {
  // describe navigational properties here
}

export type BeneficiarioWithRelations = Beneficiario & BeneficiarioRelations;

import {Entity, belongsTo, model, property} from '@loopback/repository';
import {ServicioFunerario} from './servicio-funerario.model';

@model({
  settings: {
    foreignKeys: {
      fk_RegistroServicio_idServicioFunerario: {
        name: 'fk_RegistroServicio_idServicioFunerario',
        entity: 'ServicioFunerario',
        entityKey: 'id',
        foreignKey: 'idServicioFunerario',
      },
    },
  },
})
export class RegistroServicio extends Entity {
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
  fecha: string;

  @property({
    type: 'string',
    format: 'time',
    required: true,
  })
  hora: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @property({
    type: 'string',
  })
  comentario?: string;

  @property({
    type: 'string',
    required: true,
  })
  code: string;

  @belongsTo(() => ServicioFunerario, {name: 'servicioFunerario'})
  idServicioFunerario: number;

  constructor(data?: Partial<RegistroServicio>) {
    super(data);
  }
}

export interface RegistroServicioRelations {
  // describe navigational properties here
}

export type RegistroServicioWithRelations = RegistroServicio &
  RegistroServicioRelations;

import {Entity, belongsTo, model, property} from '@loopback/repository';
import {ServicioFunerario} from './servicio-funerario.model';

@model({
  settings: {
    foreignKeys:
    {
      fk_Resena_idServicioFunerario: {
        name: "fk_Resena_idServicioFunerario",
        entity: "ServicioFunerario",
        entityKey: "id",
        foreignKey: "idServicioFunerario"
      },
    }
  }
})
export class Resena extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  calificacion: number;

  @property({
    type: 'string',
  })
  comentario?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaPublicacion: string;

  @belongsTo(() => ServicioFunerario, {name: 'servicioFunerario'})
  idServicioFunerario: number;

  constructor(data?: Partial<Resena>) {
    super(data);
  }
}

export interface ResenaRelations {
  // describe navigational properties here
}

export type ResenaWithRelations = Resena & ResenaRelations;

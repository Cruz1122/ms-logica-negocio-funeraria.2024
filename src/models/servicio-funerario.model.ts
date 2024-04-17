import {Entity, belongsTo, hasMany, model, property} from '@loopback/repository';
import {Plan} from './plan.model';
import {RegistroServicio} from './registro-servicio.model';

@model({
  settings: {
    foreignKeys:
    {
      fk_servicioFunerario_idPlan: {
        name: "fk_servicioFunerario_idPlan",
        entity: "Plan",
        entityKey: "id",
        foreignKey: "idPlan"
      },
    }
  }
})
export class ServicioFunerario extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  codeChat?: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @belongsTo(() => Plan, {name: 'plan'})
  idPlan: number;

  @hasMany(() => RegistroServicio, {keyTo: 'idServicioFunerario'})
  registrosServicios: RegistroServicio[];

  constructor(data?: Partial<ServicioFunerario>) {
    super(data);
  }
}

export interface ServicioFunerarioRelations {
  // describe navigational properties here
}

export type ServicioFunerarioWithRelations = ServicioFunerario & ServicioFunerarioRelations;

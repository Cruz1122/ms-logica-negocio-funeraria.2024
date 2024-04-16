import {Entity, model, property, hasMany} from '@loopback/repository';
import {Plan} from './plan.model';
import {PlanxServicio} from './planx-servicio.model';

@model()
export class Servicio extends Entity {
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
  })
  detalles?: string;

  @hasMany(() => Plan, {through: {model: () => PlanxServicio, keyFrom: 'idServicio', keyTo: 'idPlan'}})
  planes: Plan[];

  constructor(data?: Partial<Servicio>) {
    super(data);
  }
}

export interface ServicioRelations {
  // describe navigational properties here
}

export type ServicioWithRelations = Servicio & ServicioRelations;

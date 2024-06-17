import {Entity, hasMany, model, property} from '@loopback/repository';
import {ClientePlan} from './cliente-plan.model';
import {PlanxServicio} from './planx-servicio.model';
import {ServicioFunerario} from './servicio-funerario.model';
import {Servicio} from './servicio.model';

@model()
export class Plan extends Entity {
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

  @property({
    type: 'number',
    required: true,
  })
  cantidadBeneficiarios: number;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'string',
    required: true,
  })
  foto: string;

  @hasMany(() => ClientePlan, {keyTo: 'idPlan'})
  clientesPlanes: ClientePlan[];

  @hasMany(() => Servicio, {
    through: {
      model: () => PlanxServicio,
      keyFrom: 'idPlan',
      keyTo: 'idServicio',
    },
  })
  servicios: Servicio[];

  @hasMany(() => ServicioFunerario, {keyTo: 'idPlan'})
  serviciosFunerarios: ServicioFunerario[];

  constructor(data?: Partial<Plan>) {
    super(data);
  }
}

export interface PlanRelations {
  // describe navigational properties here
}

export type PlanWithRelations = Plan & PlanRelations;

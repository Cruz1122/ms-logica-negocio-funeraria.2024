import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys:
    {
      fk_PlanxServicio_idServicio: {
        name: "fk_PlanxServicio_idServicio",
        entity: "Servicio",
        entityKey: "id",
        foreignKey: "idServicio"
      },
      fk_PlanxServicio_idPlan: {
        name: "fk_PlanxServicio_idPlan",
        entity: "Plan",
        entityKey: "id",
        foreignKey: "idPlan"
      },
    }
  }
})
export class PlanxServicio extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  idPlan?: number;

  @property({
    type: 'number',
  })
  idServicio?: number;

  constructor(data?: Partial<PlanxServicio>) {
    super(data);
  }
}

export interface PlanxServicioRelations {
  // describe navigational properties here
}

export type PlanxServicioWithRelations = PlanxServicio & PlanxServicioRelations;

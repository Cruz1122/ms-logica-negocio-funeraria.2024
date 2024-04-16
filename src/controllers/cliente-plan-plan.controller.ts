import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ClientePlan,
  Plan,
} from '../models';
import {ClientePlanRepository} from '../repositories';

export class ClientePlanPlanController {
  constructor(
    @repository(ClientePlanRepository)
    public clientePlanRepository: ClientePlanRepository,
  ) { }

  @get('/cliente-plans/{id}/plan', {
    responses: {
      '200': {
        description: 'Plan belonging to ClientePlan',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Plan),
          },
        },
      },
    },
  })
  async getPlan(
    @param.path.number('id') id: typeof ClientePlan.prototype.id,
  ): Promise<Plan> {
    return this.clientePlanRepository.plan(id);
  }
}

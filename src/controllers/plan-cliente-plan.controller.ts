import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Plan,
  ClientePlan,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanClientePlanController {
  constructor(
    @repository(PlanRepository) protected planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/cliente-plans', {
    responses: {
      '200': {
        description: 'Array of Plan has many ClientePlan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ClientePlan)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ClientePlan>,
  ): Promise<ClientePlan[]> {
    return this.planRepository.clientesPlanes(id).find(filter);
  }

  @post('/plans/{id}/cliente-plans', {
    responses: {
      '200': {
        description: 'Plan model instance',
        content: {'application/json': {schema: getModelSchemaRef(ClientePlan)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Plan.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClientePlan, {
            title: 'NewClientePlanInPlan',
            exclude: ['id'],
            optional: ['idPlan']
          }),
        },
      },
    }) clientePlan: Omit<ClientePlan, 'id'>,
  ): Promise<ClientePlan> {
    return this.planRepository.clientesPlanes(id).create(clientePlan);
  }

  @patch('/plans/{id}/cliente-plans', {
    responses: {
      '200': {
        description: 'Plan.ClientePlan PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClientePlan, {partial: true}),
        },
      },
    })
    clientePlan: Partial<ClientePlan>,
    @param.query.object('where', getWhereSchemaFor(ClientePlan)) where?: Where<ClientePlan>,
  ): Promise<Count> {
    return this.planRepository.clientesPlanes(id).patch(clientePlan, where);
  }

  @del('/plans/{id}/cliente-plans', {
    responses: {
      '200': {
        description: 'Plan.ClientePlan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ClientePlan)) where?: Where<ClientePlan>,
  ): Promise<Count> {
    return this.planRepository.clientesPlanes(id).delete(where);
  }
}

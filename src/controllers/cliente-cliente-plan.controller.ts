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
  Cliente,
  ClientePlan,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteClientePlanController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/cliente-plan', {
    responses: {
      '200': {
        description: 'Cliente has one ClientePlan',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ClientePlan),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ClientePlan>,
  ): Promise<ClientePlan> {
    return this.clienteRepository.clientePlan(id).get(filter);
  }

  @post('/clientes/{id}/cliente-plan', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(ClientePlan)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClientePlan, {
            title: 'NewClientePlanInCliente',
            exclude: ['id'],
            optional: ['idCliente']
          }),
        },
      },
    }) clientePlan: Omit<ClientePlan, 'id'>,
  ): Promise<ClientePlan> {
    return this.clienteRepository.clientePlan(id).create(clientePlan);
  }

  @patch('/clientes/{id}/cliente-plan', {
    responses: {
      '200': {
        description: 'Cliente.ClientePlan PATCH success count',
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
    return this.clienteRepository.clientePlan(id).patch(clientePlan, where);
  }

  @del('/clientes/{id}/cliente-plan', {
    responses: {
      '200': {
        description: 'Cliente.ClientePlan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ClientePlan)) where?: Where<ClientePlan>,
  ): Promise<Count> {
    return this.clienteRepository.clientePlan(id).delete(where);
  }
}

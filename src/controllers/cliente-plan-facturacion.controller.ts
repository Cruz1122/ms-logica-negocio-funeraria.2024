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
  ClientePlan,
  Facturacion,
} from '../models';
import {ClientePlanRepository} from '../repositories';

export class ClientePlanFacturacionController {
  constructor(
    @repository(ClientePlanRepository) protected clientePlanRepository: ClientePlanRepository,
  ) { }

  @get('/cliente-plans/{id}/facturacions', {
    responses: {
      '200': {
        description: 'Array of ClientePlan has many Facturacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Facturacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Facturacion>,
  ): Promise<Facturacion[]> {
    return this.clientePlanRepository.facturaciones(id).find(filter);
  }

  @post('/cliente-plans/{id}/facturacions', {
    responses: {
      '200': {
        description: 'ClientePlan model instance',
        content: {'application/json': {schema: getModelSchemaRef(Facturacion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ClientePlan.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Facturacion, {
            title: 'NewFacturacionInClientePlan',
            exclude: ['id'],
            optional: ['idClientePlan']
          }),
        },
      },
    }) facturacion: Omit<Facturacion, 'id'>,
  ): Promise<Facturacion> {
    return this.clientePlanRepository.facturaciones(id).create(facturacion);
  }

  @patch('/cliente-plans/{id}/facturacions', {
    responses: {
      '200': {
        description: 'ClientePlan.Facturacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Facturacion, {partial: true}),
        },
      },
    })
    facturacion: Partial<Facturacion>,
    @param.query.object('where', getWhereSchemaFor(Facturacion)) where?: Where<Facturacion>,
  ): Promise<Count> {
    return this.clientePlanRepository.facturaciones(id).patch(facturacion, where);
  }

  @del('/cliente-plans/{id}/facturacions', {
    responses: {
      '200': {
        description: 'ClientePlan.Facturacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Facturacion)) where?: Where<Facturacion>,
  ): Promise<Count> {
    return this.clientePlanRepository.facturaciones(id).delete(where);
  }
}

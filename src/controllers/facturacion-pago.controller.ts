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
  Facturacion,
  Pago,
} from '../models';
import {FacturacionRepository} from '../repositories';

export class FacturacionPagoController {
  constructor(
    @repository(FacturacionRepository) protected facturacionRepository: FacturacionRepository,
  ) { }

  @get('/facturacions/{id}/pago', {
    responses: {
      '200': {
        description: 'Facturacion has one Pago',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Pago),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Pago>,
  ): Promise<Pago> {
    return this.facturacionRepository.pago(id).get(filter);
  }

  @post('/facturacions/{id}/pago', {
    responses: {
      '200': {
        description: 'Facturacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pago)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Facturacion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pago, {
            title: 'NewPagoInFacturacion',
            exclude: ['id'],
            optional: ['idFacturacion']
          }),
        },
      },
    }) pago: Omit<Pago, 'id'>,
  ): Promise<Pago> {
    return this.facturacionRepository.pago(id).create(pago);
  }

  @patch('/facturacions/{id}/pago', {
    responses: {
      '200': {
        description: 'Facturacion.Pago PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pago, {partial: true}),
        },
      },
    })
    pago: Partial<Pago>,
    @param.query.object('where', getWhereSchemaFor(Pago)) where?: Where<Pago>,
  ): Promise<Count> {
    return this.facturacionRepository.pago(id).patch(pago, where);
  }

  @del('/facturacions/{id}/pago', {
    responses: {
      '200': {
        description: 'Facturacion.Pago DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pago)) where?: Where<Pago>,
  ): Promise<Count> {
    return this.facturacionRepository.pago(id).delete(where);
  }
}

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
  ServicioFunerario,
  Resena,
} from '../models';
import {ServicioFunerarioRepository} from '../repositories';

export class ServicioFunerarioResenaController {
  constructor(
    @repository(ServicioFunerarioRepository) protected servicioFunerarioRepository: ServicioFunerarioRepository,
  ) { }

  @get('/servicio-funerarios/{id}/resenas', {
    responses: {
      '200': {
        description: 'Array of ServicioFunerario has many Resena',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Resena)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Resena>,
  ): Promise<Resena[]> {
    return this.servicioFunerarioRepository.resenas(id).find(filter);
  }

  @post('/servicio-funerarios/{id}/resenas', {
    responses: {
      '200': {
        description: 'ServicioFunerario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Resena)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ServicioFunerario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resena, {
            title: 'NewResenaInServicioFunerario',
            exclude: ['id'],
            optional: ['idServicioFunerario']
          }),
        },
      },
    }) resena: Omit<Resena, 'id'>,
  ): Promise<Resena> {
    return this.servicioFunerarioRepository.resenas(id).create(resena);
  }

  @patch('/servicio-funerarios/{id}/resenas', {
    responses: {
      '200': {
        description: 'ServicioFunerario.Resena PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resena, {partial: true}),
        },
      },
    })
    resena: Partial<Resena>,
    @param.query.object('where', getWhereSchemaFor(Resena)) where?: Where<Resena>,
  ): Promise<Count> {
    return this.servicioFunerarioRepository.resenas(id).patch(resena, where);
  }

  @del('/servicio-funerarios/{id}/resenas', {
    responses: {
      '200': {
        description: 'ServicioFunerario.Resena DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Resena)) where?: Where<Resena>,
  ): Promise<Count> {
    return this.servicioFunerarioRepository.resenas(id).delete(where);
  }
}

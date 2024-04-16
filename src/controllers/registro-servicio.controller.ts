import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {RegistroServicio} from '../models';
import {RegistroServicioRepository} from '../repositories';

export class RegistroServicioController {
  constructor(
    @repository(RegistroServicioRepository)
    public registroServicioRepository : RegistroServicioRepository,
  ) {}

  @post('/registro-servicio')
  @response(200, {
    description: 'RegistroServicio model instance',
    content: {'application/json': {schema: getModelSchemaRef(RegistroServicio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroServicio, {
            title: 'NewRegistroServicio',
            exclude: ['id'],
          }),
        },
      },
    })
    registroServicio: Omit<RegistroServicio, 'id'>,
  ): Promise<RegistroServicio> {
    return this.registroServicioRepository.create(registroServicio);
  }

  @get('/registro-servicio/count')
  @response(200, {
    description: 'RegistroServicio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(RegistroServicio) where?: Where<RegistroServicio>,
  ): Promise<Count> {
    return this.registroServicioRepository.count(where);
  }

  @get('/registro-servicio')
  @response(200, {
    description: 'Array of RegistroServicio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(RegistroServicio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(RegistroServicio) filter?: Filter<RegistroServicio>,
  ): Promise<RegistroServicio[]> {
    return this.registroServicioRepository.find(filter);
  }

  @patch('/registro-servicio')
  @response(200, {
    description: 'RegistroServicio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroServicio, {partial: true}),
        },
      },
    })
    registroServicio: RegistroServicio,
    @param.where(RegistroServicio) where?: Where<RegistroServicio>,
  ): Promise<Count> {
    return this.registroServicioRepository.updateAll(registroServicio, where);
  }

  @get('/registro-servicio/{id}')
  @response(200, {
    description: 'RegistroServicio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(RegistroServicio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(RegistroServicio, {exclude: 'where'}) filter?: FilterExcludingWhere<RegistroServicio>
  ): Promise<RegistroServicio> {
    return this.registroServicioRepository.findById(id, filter);
  }

  @patch('/registro-servicio/{id}')
  @response(204, {
    description: 'RegistroServicio PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroServicio, {partial: true}),
        },
      },
    })
    registroServicio: RegistroServicio,
  ): Promise<void> {
    await this.registroServicioRepository.updateById(id, registroServicio);
  }

  @put('/registro-servicio/{id}')
  @response(204, {
    description: 'RegistroServicio PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() registroServicio: RegistroServicio,
  ): Promise<void> {
    await this.registroServicioRepository.replaceById(id, registroServicio);
  }

  @del('/registro-servicio/{id}')
  @response(204, {
    description: 'RegistroServicio DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.registroServicioRepository.deleteById(id);
  }
}

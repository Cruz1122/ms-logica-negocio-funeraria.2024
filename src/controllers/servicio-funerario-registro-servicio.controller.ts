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
  RegistroServicio,
} from '../models';
import {ServicioFunerarioRepository} from '../repositories';

export class ServicioFunerarioRegistroServicioController {
  constructor(
    @repository(ServicioFunerarioRepository) protected servicioFunerarioRepository: ServicioFunerarioRepository,
  ) { }

  @get('/servicio-funerarios/{id}/registro-servicios', {
    responses: {
      '200': {
        description: 'Array of ServicioFunerario has many RegistroServicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RegistroServicio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<RegistroServicio>,
  ): Promise<RegistroServicio[]> {
    return this.servicioFunerarioRepository.registrosServicios(id).find(filter);
  }

  @post('/servicio-funerarios/{id}/registro-servicios', {
    responses: {
      '200': {
        description: 'ServicioFunerario model instance',
        content: {'application/json': {schema: getModelSchemaRef(RegistroServicio)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ServicioFunerario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroServicio, {
            title: 'NewRegistroServicioInServicioFunerario',
            exclude: ['id'],
            optional: ['idServicioFunerario']
          }),
        },
      },
    }) registroServicio: Omit<RegistroServicio, 'id'>,
  ): Promise<RegistroServicio> {
    return this.servicioFunerarioRepository.registrosServicios(id).create(registroServicio);
  }

  @patch('/servicio-funerarios/{id}/registro-servicios', {
    responses: {
      '200': {
        description: 'ServicioFunerario.RegistroServicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroServicio, {partial: true}),
        },
      },
    })
    registroServicio: Partial<RegistroServicio>,
    @param.query.object('where', getWhereSchemaFor(RegistroServicio)) where?: Where<RegistroServicio>,
  ): Promise<Count> {
    return this.servicioFunerarioRepository.registrosServicios(id).patch(registroServicio, where);
  }

  @del('/servicio-funerarios/{id}/registro-servicios', {
    responses: {
      '200': {
        description: 'ServicioFunerario.RegistroServicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(RegistroServicio)) where?: Where<RegistroServicio>,
  ): Promise<Count> {
    return this.servicioFunerarioRepository.registrosServicios(id).delete(where);
  }
}

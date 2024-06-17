import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {ConfiguracionNotificaciones} from '../config/notificaciones.config';
import {Pqrs} from '../models';
import {PqrsRepository} from '../repositories';
import {NotificacionesService} from '../services';

export class PqrsController {
  constructor(
    @repository(PqrsRepository)
    public pqrsRepository: PqrsRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
  ) {}

  @post('/pqrs')
  @response(200, {
    description: 'Pqrs model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pqrs)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pqrs, {
            title: 'NewPqrs',
            exclude: ['id'],
          }),
        },
      },
    })
    pqrs: Omit<Pqrs, 'id'>,
  ): Promise<Pqrs> {
    let datosEmail = {
      destination: 'funerariadigitalpqrs@gmail.com',
      message:
        'Tipo de Usuario: ' +
        pqrs.tipoUsuario +
        ' Documento: ' +
        pqrs.documento +
        ' Correo: ' +
        pqrs.email +
        ' Nombre Completo: ' +
        pqrs.nombres +
        ' ' +
        pqrs.apellidos +
        ' Mensaje: ' +
        pqrs.mensaje,
      subject: pqrs.asunto,
    };
    let urlEmail = ConfiguracionNotificaciones.urlEmail;
    console.log('Datos de notificación ', datosEmail);
    console.log('URL ', urlEmail);
    this.servicioNotificaciones.EnviarNotificacion(datosEmail, urlEmail);

    return this.pqrsRepository.create(pqrs);
  }

  @get('/pqrs/count')
  @response(200, {
    description: 'Pqrs model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Pqrs) where?: Where<Pqrs>): Promise<Count> {
    return this.pqrsRepository.count(where);
  }

  @get('/pqrs')
  @response(200, {
    description: 'Array of Pqrs model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pqrs, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Pqrs) filter?: Filter<Pqrs>): Promise<Pqrs[]> {
    return this.pqrsRepository.find(filter);
  }

  @patch('/pqrs')
  @response(200, {
    description: 'Pqrs PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pqrs, {partial: true}),
        },
      },
    })
    pqrs: Pqrs,
    @param.where(Pqrs) where?: Where<Pqrs>,
  ): Promise<Count> {
    return this.pqrsRepository.updateAll(pqrs, where);
  }

  @get('/pqrs/{id}')
  @response(200, {
    description: 'Pqrs model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pqrs, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Pqrs, {exclude: 'where'}) filter?: FilterExcludingWhere<Pqrs>,
  ): Promise<Pqrs> {
    return this.pqrsRepository.findById(id, filter);
  }

  @patch('/pqrs/{id}')
  @response(204, {
    description: 'Pqrs PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pqrs, {partial: true}),
        },
      },
    })
    pqrs: Pqrs,
  ): Promise<void> {
    await this.pqrsRepository.updateById(id, pqrs);
  }

  @put('/pqrs/{id}')
  @response(204, {
    description: 'Pqrs PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pqrs: Pqrs,
  ): Promise<void> {
    await this.pqrsRepository.replaceById(id, pqrs);
  }

  @del('/pqrs/{id}')
  @response(204, {
    description: 'Pqrs DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pqrsRepository.deleteById(id);
  }
}

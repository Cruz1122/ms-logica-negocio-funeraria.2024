import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  RegistroServicio,
  ServicioFunerario,
} from '../models';
import {RegistroServicioRepository} from '../repositories';

export class RegistroServicioServicioFunerarioController {
  constructor(
    @repository(RegistroServicioRepository)
    public registroServicioRepository: RegistroServicioRepository,
  ) { }

  @get('/registro-servicios/{id}/servicio-funerario', {
    responses: {
      '200': {
        description: 'ServicioFunerario belonging to RegistroServicio',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ServicioFunerario),
          },
        },
      },
    },
  })
  async getServicioFunerario(
    @param.path.number('id') id: typeof RegistroServicio.prototype.id,
  ): Promise<ServicioFunerario> {
    return this.registroServicioRepository.servicioFunerario(id);
  }
}

import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ServicioFunerario,
  Plan,
} from '../models';
import {ServicioFunerarioRepository} from '../repositories';

export class ServicioFunerarioPlanController {
  constructor(
    @repository(ServicioFunerarioRepository)
    public servicioFunerarioRepository: ServicioFunerarioRepository,
  ) { }

  @get('/servicio-funerarios/{id}/plan', {
    responses: {
      '200': {
        description: 'Plan belonging to ServicioFunerario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Plan),
          },
        },
      },
    },
  })
  async getPlan(
    @param.path.number('id') id: typeof ServicioFunerario.prototype.id,
  ): Promise<Plan> {
    return this.servicioFunerarioRepository.plan(id);
  }
}

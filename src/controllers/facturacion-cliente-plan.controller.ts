import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Facturacion,
  ClientePlan,
} from '../models';
import {FacturacionRepository} from '../repositories';

export class FacturacionClientePlanController {
  constructor(
    @repository(FacturacionRepository)
    public facturacionRepository: FacturacionRepository,
  ) { }

  @get('/facturacions/{id}/cliente-plan', {
    responses: {
      '200': {
        description: 'ClientePlan belonging to Facturacion',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ClientePlan),
          },
        },
      },
    },
  })
  async getClientePlan(
    @param.path.number('id') id: typeof Facturacion.prototype.id,
  ): Promise<ClientePlan> {
    return this.facturacionRepository.ClientePlan(id);
  }
}

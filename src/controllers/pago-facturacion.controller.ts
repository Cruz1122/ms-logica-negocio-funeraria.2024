import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pago,
  Facturacion,
} from '../models';
import {PagoRepository} from '../repositories';

export class PagoFacturacionController {
  constructor(
    @repository(PagoRepository)
    public pagoRepository: PagoRepository,
  ) { }

  @get('/pagos/{id}/facturacion', {
    responses: {
      '200': {
        description: 'Facturacion belonging to Pago',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Facturacion),
          },
        },
      },
    },
  })
  async getFacturacion(
    @param.path.number('id') id: typeof Pago.prototype.id,
  ): Promise<Facturacion> {
    return this.pagoRepository.facturacion(id);
  }
}

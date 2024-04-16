import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Pago, PagoRelations, Facturacion} from '../models';
import {FacturacionRepository} from './facturacion.repository';

export class PagoRepository extends DefaultCrudRepository<
  Pago,
  typeof Pago.prototype.id,
  PagoRelations
> {

  public readonly facturacion: BelongsToAccessor<Facturacion, typeof Pago.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('FacturacionRepository') protected facturacionRepositoryGetter: Getter<FacturacionRepository>,
  ) {
    super(Pago, dataSource);
    this.facturacion = this.createBelongsToAccessorFor('facturacion', facturacionRepositoryGetter,);
    this.registerInclusionResolver('facturacion', this.facturacion.inclusionResolver);
  }
}

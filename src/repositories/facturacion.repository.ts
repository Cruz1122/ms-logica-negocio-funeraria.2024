import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Facturacion, FacturacionRelations, Pago, ClientePlan} from '../models';
import {PagoRepository} from './pago.repository';
import {ClientePlanRepository} from './cliente-plan.repository';

export class FacturacionRepository extends DefaultCrudRepository<
  Facturacion,
  typeof Facturacion.prototype.id,
  FacturacionRelations
> {

  public readonly pago: HasOneRepositoryFactory<Pago, typeof Facturacion.prototype.id>;

  public readonly ClientePlan: BelongsToAccessor<ClientePlan, typeof Facturacion.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PagoRepository') protected pagoRepositoryGetter: Getter<PagoRepository>, @repository.getter('ClientePlanRepository') protected clientePlanRepositoryGetter: Getter<ClientePlanRepository>,
  ) {
    super(Facturacion, dataSource);
    this.ClientePlan = this.createBelongsToAccessorFor('ClientePlan', clientePlanRepositoryGetter,);
    this.registerInclusionResolver('ClientePlan', this.ClientePlan.inclusionResolver);
    this.pago = this.createHasOneRepositoryFactoryFor('pago', pagoRepositoryGetter);
    this.registerInclusionResolver('pago', this.pago.inclusionResolver);
  }
}

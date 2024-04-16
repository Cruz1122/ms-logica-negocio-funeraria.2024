import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ClientePlan, ClientePlanRelations, Facturacion, Cliente, Plan} from '../models';
import {FacturacionRepository} from './facturacion.repository';
import {ClienteRepository} from './cliente.repository';
import {PlanRepository} from './plan.repository';

export class ClientePlanRepository extends DefaultCrudRepository<
  ClientePlan,
  typeof ClientePlan.prototype.id,
  ClientePlanRelations
> {

  public readonly facturaciones: HasManyRepositoryFactory<Facturacion, typeof ClientePlan.prototype.id>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof ClientePlan.prototype.id>;

  public readonly plan: BelongsToAccessor<Plan, typeof ClientePlan.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('FacturacionRepository') protected facturacionRepositoryGetter: Getter<FacturacionRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>,
  ) {
    super(ClientePlan, dataSource);
    this.plan = this.createBelongsToAccessorFor('plan', planRepositoryGetter,);
    this.registerInclusionResolver('plan', this.plan.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.facturaciones = this.createHasManyRepositoryFactoryFor('facturaciones', facturacionRepositoryGetter,);
    this.registerInclusionResolver('facturaciones', this.facturaciones.inclusionResolver);
  }
}

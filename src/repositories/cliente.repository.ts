import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Cliente, ClienteRelations, ClientePlan, Beneficiario} from '../models';
import {ClientePlanRepository} from './cliente-plan.repository';
import {BeneficiarioRepository} from './beneficiario.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly clientePlan: HasOneRepositoryFactory<ClientePlan, typeof Cliente.prototype.id>;

  public readonly beneficiarios: HasManyRepositoryFactory<Beneficiario, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ClientePlanRepository') protected clientePlanRepositoryGetter: Getter<ClientePlanRepository>, @repository.getter('BeneficiarioRepository') protected beneficiarioRepositoryGetter: Getter<BeneficiarioRepository>,
  ) {
    super(Cliente, dataSource);
    this.beneficiarios = this.createHasManyRepositoryFactoryFor('beneficiarios', beneficiarioRepositoryGetter,);
    this.registerInclusionResolver('beneficiarios', this.beneficiarios.inclusionResolver);
    this.clientePlan = this.createHasOneRepositoryFactoryFor('clientePlan', clientePlanRepositoryGetter);
    this.registerInclusionResolver('clientePlan', this.clientePlan.inclusionResolver);
  }
}

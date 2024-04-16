import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Plan, PlanRelations, ClientePlan, Servicio, PlanxServicio, ServicioFunerario} from '../models';
import {ClientePlanRepository} from './cliente-plan.repository';
import {PlanxServicioRepository} from './planx-servicio.repository';
import {ServicioRepository} from './servicio.repository';
import {ServicioFunerarioRepository} from './servicio-funerario.repository';

export class PlanRepository extends DefaultCrudRepository<
  Plan,
  typeof Plan.prototype.id,
  PlanRelations
> {

  public readonly clientesPlanes: HasManyRepositoryFactory<ClientePlan, typeof Plan.prototype.id>;

  public readonly servicios: HasManyThroughRepositoryFactory<Servicio, typeof Servicio.prototype.id,
          PlanxServicio,
          typeof Plan.prototype.id
        >;

  public readonly serviciosFunerarios: HasManyRepositoryFactory<ServicioFunerario, typeof Plan.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ClientePlanRepository') protected clientePlanRepositoryGetter: Getter<ClientePlanRepository>, @repository.getter('PlanxServicioRepository') protected planxServicioRepositoryGetter: Getter<PlanxServicioRepository>, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>, @repository.getter('ServicioFunerarioRepository') protected servicioFunerarioRepositoryGetter: Getter<ServicioFunerarioRepository>,
  ) {
    super(Plan, dataSource);
    this.serviciosFunerarios = this.createHasManyRepositoryFactoryFor('serviciosFunerarios', servicioFunerarioRepositoryGetter,);
    this.registerInclusionResolver('serviciosFunerarios', this.serviciosFunerarios.inclusionResolver);
    this.servicios = this.createHasManyThroughRepositoryFactoryFor('servicios', servicioRepositoryGetter, planxServicioRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
    this.clientesPlanes = this.createHasManyRepositoryFactoryFor('clientesPlanes', clientePlanRepositoryGetter,);
    this.registerInclusionResolver('clientesPlanes', this.clientesPlanes.inclusionResolver);
  }
}

import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ServicioFunerario, ServicioFunerarioRelations, Plan, RegistroServicio} from '../models';
import {PlanRepository} from './plan.repository';
import {RegistroServicioRepository} from './registro-servicio.repository';

export class ServicioFunerarioRepository extends DefaultCrudRepository<
  ServicioFunerario,
  typeof ServicioFunerario.prototype.id,
  ServicioFunerarioRelations
> {

  public readonly plan: BelongsToAccessor<Plan, typeof ServicioFunerario.prototype.id>;

  public readonly registrosServicios: HasManyRepositoryFactory<RegistroServicio, typeof ServicioFunerario.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('RegistroServicioRepository') protected registroServicioRepositoryGetter: Getter<RegistroServicioRepository>,
  ) {
    super(ServicioFunerario, dataSource);
    this.registrosServicios = this.createHasManyRepositoryFactoryFor('registrosServicios', registroServicioRepositoryGetter,);
    this.registerInclusionResolver('registrosServicios', this.registrosServicios.inclusionResolver);
    this.plan = this.createBelongsToAccessorFor('plan', planRepositoryGetter,);
    this.registerInclusionResolver('plan', this.plan.inclusionResolver);
  }
}

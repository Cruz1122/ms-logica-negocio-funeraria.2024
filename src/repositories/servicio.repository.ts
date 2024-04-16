import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Servicio, ServicioRelations, Plan, PlanxServicio} from '../models';
import {PlanxServicioRepository} from './planx-servicio.repository';
import {PlanRepository} from './plan.repository';

export class ServicioRepository extends DefaultCrudRepository<
  Servicio,
  typeof Servicio.prototype.id,
  ServicioRelations
> {

  public readonly planes: HasManyThroughRepositoryFactory<Plan, typeof Plan.prototype.id,
          PlanxServicio,
          typeof Servicio.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PlanxServicioRepository') protected planxServicioRepositoryGetter: Getter<PlanxServicioRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>,
  ) {
    super(Servicio, dataSource);
    this.planes = this.createHasManyThroughRepositoryFactoryFor('planes', planRepositoryGetter, planxServicioRepositoryGetter,);
    this.registerInclusionResolver('planes', this.planes.inclusionResolver);
  }
}

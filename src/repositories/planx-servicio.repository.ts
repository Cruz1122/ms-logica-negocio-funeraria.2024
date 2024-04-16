import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {PlanxServicio, PlanxServicioRelations} from '../models';

export class PlanxServicioRepository extends DefaultCrudRepository<
  PlanxServicio,
  typeof PlanxServicio.prototype.id,
  PlanxServicioRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(PlanxServicio, dataSource);
  }
}

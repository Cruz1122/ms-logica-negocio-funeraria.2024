import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Pqrs, PqrsRelations} from '../models';

export class PqrsRepository extends DefaultCrudRepository<
  Pqrs,
  typeof Pqrs.prototype.id,
  PqrsRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Pqrs, dataSource);
  }
}

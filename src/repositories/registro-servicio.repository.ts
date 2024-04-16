import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {RegistroServicio, RegistroServicioRelations, ServicioFunerario} from '../models';
import {ServicioFunerarioRepository} from './servicio-funerario.repository';

export class RegistroServicioRepository extends DefaultCrudRepository<
  RegistroServicio,
  typeof RegistroServicio.prototype.id,
  RegistroServicioRelations
> {

  public readonly servicioFunerario: BelongsToAccessor<ServicioFunerario, typeof RegistroServicio.prototype.id>;

  constructor(@inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ServicioFunerarioRepository') protected servicioFunerarioRepositoryGetter: Getter<ServicioFunerarioRepository>,) {
    super(RegistroServicio, dataSource);
    this.servicioFunerario = this.createBelongsToAccessorFor('servicioFunerario', servicioFunerarioRepositoryGetter,);
    this.registerInclusionResolver('servicioFunerario', this.servicioFunerario.inclusionResolver);
  }
}

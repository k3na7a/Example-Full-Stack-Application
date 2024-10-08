import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

import { AvatarEntity } from 'src/library/entities/user/avatar.entity';
import { ProfileEntity } from 'src/library/entities/user/profile.entity';
import { UserEntity } from 'src/library/entities/user/user.entity';

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'demo_nest_api',
  entities: [UserEntity, ProfileEntity, AvatarEntity],
  synchronize: true,
};

export class TypeOrmPlugin {
  public static forRoot = TypeOrmModule.forRoot(config);
  public static forFeature = (entities: EntityClassOrSchema[]) =>
    TypeOrmModule.forFeature(entities);
}

import { Module } from '@nestjs/common';

import { UserModule } from 'src/app/modules';
import { GamesModule } from 'src/app/modules/games/games.module';

import { PlatformController } from './controllers/platform.controller';
import { GameController } from './controllers/game.controller';
import { GenreController } from './controllers/genre.controller';
import { SeriesController } from './controllers/series.controller';
import { DeveloperController } from './controllers/developer.controller';
import { PublisherController } from './controllers/publisher.controller';
import { GametypeController } from './controllers/gametype.controller';

@Module({
  imports: [UserModule, GamesModule],
  controllers: [
    GameController,
    PlatformController,
    GenreController,
    SeriesController,
    DeveloperController,
    PublisherController,
    GametypeController,
  ],
})
export class GamesAdminModule {}

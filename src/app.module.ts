import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InventariosModule } from './inventarios/inventarios.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api/(.*)', '/inventarios/(.*)'],
    }),
    InventariosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

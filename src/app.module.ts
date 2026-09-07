import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InventariosModule } from './inventarios/inventarios.module';

@Module({
  imports: [InventariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { InventariosService } from './inventarios.service';
import { InventariosController } from './inventarios.controller';

@Module({
  providers: [InventariosService],
  controllers: [InventariosController]
})
export class InventariosModule {}

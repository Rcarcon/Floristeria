import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PedidosService } from './pedidos.service';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Get()
  obtenerPedidos() {
    return this.pedidosService.findAll();
  }

  @Get(':id')
  obtenerPedido(@Param('id') id: string) {
    return this.pedidosService.findOne(Number(id));
  }

  @Post()
  crearPedido(@Body() datos: any) {
    return this.pedidosService.create(datos);
  }

  @Put(':id')
  actualizarPedido(@Param('id') id: string, @Body() datos: any) {
    return this.pedidosService.update(Number(id), datos);
  }

  @Delete(':id')
  eliminarPedido(@Param('id') id: string) {
    return this.pedidosService.remove(Number(id));
  }
}

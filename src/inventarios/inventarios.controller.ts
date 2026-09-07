import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { InventariosService } from './inventarios.service';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { AjustarStockDto } from './dto/ajustar-stock.dto';

@Controller('inventarios')
export class InventariosController {
  constructor(private readonly inventariosService: InventariosService) {}

  @Get()
  findAll(@Query('categoria') categoria?: string) {
    return {
      exito: true,
      data: this.inventariosService.findAll(categoria),
    };
  }

  @Get('resumen')
  getResumen() {
    return {
      exito: true,
      data: this.inventariosService.obtenerResumen(),
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return {
      exito: true,
      data: this.inventariosService.findOne(id),
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createInventarioDto: CreateInventarioDto) {
    const nuevoProducto = this.inventariosService.create(createInventarioDto);
    return {
      exito: true,
      mensaje: 'Producto agregado al inventario exitosamente',
      data: nuevoProducto,
    };
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInventarioDto: UpdateInventarioDto,
  ) {
    const productoActualizado = this.inventariosService.update(id, updateInventarioDto);
    return {
      exito: true,
      mensaje: 'Producto actualizado exitosamente',
      data: productoActualizado,
    };
  }

  @Patch(':id/stock')
  ajustarStock(
    @Param('id') id: string,
    @Body() ajustarStockDto: AjustarStockDto,
  ) {
    const resultado = this.inventariosService.ajustarStock(id, ajustarStockDto.cantidad);
    return {
      exito: true,
      mensaje: resultado.mensaje,
      data: resultado.item,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const resultado = this.inventariosService.remove(id);
    return {
      exito: true,
      mensaje: resultado.mensaje,
      id: resultado.idEliminado,
    };
  }
}

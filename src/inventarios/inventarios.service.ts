import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { InventarioItem } from './entities/inventario.entity';

@Injectable()
export class InventariosService {
  private inventario: InventarioItem[] = [
    {
      id: '1',
      nombre: 'Rosas Rojas Premium',
      descripcion: 'Docena de rosas rojas de tallo largo exportación',
      categoria: 'Rosas',
      precio: 150.0,
      stock: 45,
      unidadMedida: 'docena',
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    },
    {
      id: '2',
      nombre: 'Girasoles Frescos',
      descripcion: 'Ramo de 6 girasoles brillantes',
      categoria: 'Girasoles',
      precio: 95.0,
      stock: 20,
      unidadMedida: 'ramo',
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    },
    {
      id: '3',
      nombre: 'Orquídeas Phalaenopsis',
      descripcion: 'Planta de orquídea en maceta de cerámica',
      categoria: 'Orquideas',
      precio: 275.0,
      stock: 8,
      unidadMedida: 'unidad',
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    },
    {
      id: '4',
      nombre: 'Tulipanes Holandeses Surtidos',
      descripcion: 'Paquete de 10 tulipanes de colores variados',
      categoria: 'Tulipanes',
      precio: 180.0,
      stock: 15,
      unidadMedida: 'paquete',
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    },
    {
      id: '5',
      nombre: 'Lirios Blancos Perfumados',
      descripcion: 'Ramo de lirios blancos aromáticos',
      categoria: 'Lirios',
      precio: 120.0,
      stock: 5,
      unidadMedida: 'ramo',
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    },
  ];

  findAll(categoria?: string): InventarioItem[] {
    if (categoria) {
      const catLower = categoria.toLowerCase();
      return this.inventario.filter(item =>
        item.categoria.toLowerCase().includes(catLower),
      );
    }
    return this.inventario;
  }

  findOne(id: string): InventarioItem {
    const item = this.inventario.find(i => i.id === id);
    if (!item) {
      throw new NotFoundException(`Producto de inventario con ID "${id}" no encontrado`);
    }
    return item;
  }

  create(createDto: CreateInventarioDto): InventarioItem {
    const nuevoId = (this.inventario.length > 0 
      ? Math.max(...this.inventario.map(i => Number(i.id) || 0)) + 1 
      : 1).toString();

    const nuevoItem: InventarioItem = {
      id: nuevoId,
      nombre: createDto.nombre,
      descripcion: createDto.descripcion ?? 'Sin descripción',
      categoria: createDto.categoria,
      precio: Number(createDto.precio),
      stock: Number(createDto.stock),
      unidadMedida: createDto.unidadMedida ?? 'unidad',
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    };

    this.inventario.push(nuevoItem);
    return nuevoItem;
  }

  update(id: string, updateDto: UpdateInventarioDto): InventarioItem {
    const item = this.findOne(id);

    if (updateDto.nombre !== undefined) item.nombre = updateDto.nombre;
    if (updateDto.descripcion !== undefined) item.descripcion = updateDto.descripcion;
    if (updateDto.categoria !== undefined) item.categoria = updateDto.categoria;
    if (updateDto.precio !== undefined) item.precio = Number(updateDto.precio);
    if (updateDto.stock !== undefined) item.stock = Number(updateDto.stock);
    if (updateDto.unidadMedida !== undefined) item.unidadMedida = updateDto.unidadMedida;

    item.fechaActualizacion = new Date();
    return item;
  }

  ajustarStock(id: string, cantidad: number): { mensaje: string; item: InventarioItem } {
    const item = this.findOne(id);
    const nuevoStock = item.stock + cantidad;

    if (nuevoStock < 0) {
      throw new BadRequestException(
        `Stock insuficiente. El stock actual es ${item.stock} y se intentó descontar ${Math.abs(cantidad)} unidades.`,
      );
    }

    item.stock = nuevoStock;
    item.fechaActualizacion = new Date();

    return {
      mensaje: `Stock actualizado con éxito. Stock anterior: ${item.stock - cantidad}, nuevo stock: ${item.stock}`,
      item,
    };
  }

  remove(id: string): { mensaje: string; idEliminado: string } {
    const index = this.inventario.findIndex(i => i.id === id);
    if (index === -1) {
      throw new NotFoundException(`Producto de inventario con ID "${id}" no encontrado`);
    }

    this.inventario.splice(index, 1);
    return {
      mensaje: `Producto con ID "${id}" eliminado correctamente del inventario`,
      idEliminado: id,
    };
  }

  obtenerResumen() {
    const totalProductos = this.inventario.length;
    const stockTotalUnidades = this.inventario.reduce((acc, item) => acc + item.stock, 0);
    const valorTotalInventario = this.inventario.reduce(
      (acc, item) => acc + item.stock * item.precio,
      0,
    );
    const productosBajoStock = this.inventario.filter(item => item.stock < 10);

    return {
      totalProductos,
      stockTotalUnidades,
      valorTotalInventario: Number(valorTotalInventario.toFixed(2)),
      alertaBajoStock: productosBajoStock.map(p => ({
        id: p.id,
        nombre: p.nombre,
        stock: p.stock,
      })),
    };
  }
}

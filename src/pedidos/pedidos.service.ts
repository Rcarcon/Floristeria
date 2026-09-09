import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class PedidosService {
  private pedidos = [
    {
      id: 1,
      cliente: 'Ana López',
      producto: 'Ramo de rosas',
      cantidad: 1,
      precio: 150,
      estado: 'Pendiente',
    },
    {
      id: 2,
      cliente: 'Carlos Pérez',
      producto: 'Arreglo floral',
      cantidad: 2,
      precio: 200,
      estado: 'Preparando',
    },
  ];

  findAll() {
    return this.pedidos;
  }

  findOne(id: number) {
    const pedido = this.pedidos.find((pedido) => pedido.id === id);

    if (!pedido) {
      throw new NotFoundException('Pedido no encontrado');
    }

    return pedido;
  }

  create(datos: any) {
    const nuevoPedido = {
      id: this.pedidos.length + 1,
      ...datos,
    };

    this.pedidos.push(nuevoPedido);

    return {
      mensaje: 'Pedido creado correctamente',
      pedido: nuevoPedido,
    };
  }

  update(id: number, datos: any) {
    const pedido = this.findOne(id);

    Object.assign(pedido, datos);

    return {
      mensaje: 'Pedido actualizado correctamente',
      pedido,
    };
  }

  remove(id: number) {
    const pedido = this.findOne(id);

    this.pedidos = this.pedidos.filter((pedido) => pedido.id !== id);

    return {
      mensaje: 'Pedido eliminado correctamente',
      pedido,
    };
  }
}
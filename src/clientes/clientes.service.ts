import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClientesService {
  private clientes: Cliente[] = [
    {
      id: 1,
      nombre: 'Ana',
      apellido: 'López',
      telefono: '5555-1111',
      correo: 'ana@email.com',
      direccion: 'Guatemala',
      estado: true,
    },
    {
      id: 2,
      nombre: 'Carlos',
      apellido: 'Pérez',
      telefono: '5555-2222',
      correo: 'carlos@email.com',
      direccion: 'Villa Nueva',
      estado: true,
    },
  ];

  private ultimoId = 2;

  findAll(): Cliente[] {
    return this.clientes;
  }

  findOne(id: number): Cliente {
    const cliente = this.clientes.find((cliente) => cliente.id === id);

    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }

    return cliente;
  }

  create(createClienteDto: CreateClienteDto): Cliente {
    const nuevoCliente: Cliente = {
      id: ++this.ultimoId,
      ...createClienteDto,
    };

    this.clientes.push(nuevoCliente);

    return nuevoCliente;
  }

  update(id: number, updateClienteDto: UpdateClienteDto): Cliente {
    const cliente = this.findOne(id);

    Object.assign(cliente, updateClienteDto);

    return cliente;
  }

  remove(id: number): { mensaje: string } {
    const cliente = this.findOne(id);

    this.clientes = this.clientes.filter(
      (clienteActual) => clienteActual.id !== cliente.id,
    );

    return {
      mensaje: `Cliente con ID ${id} eliminado correctamente`,
    };
  }
}
import { IsString, IsNotEmpty, IsNumber, IsPositive, IsInt, Min, IsOptional } from 'class-validator';

export class CreateInventarioDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsNotEmpty({ message: 'La categoría es obligatoria' })
  categoria: string;

  @IsNumber({}, { message: 'El precio debe ser un número válido' })
  @IsPositive({ message: 'El precio debe ser mayor a cero' })
  precio: number;

  @IsInt({ message: 'El stock debe ser un número entero' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  stock: number;

  @IsString()
  @IsOptional()
  unidadMedida?: string;
}

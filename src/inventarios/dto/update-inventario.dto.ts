import { IsString, IsNumber, IsPositive, IsInt, Min, IsOptional } from 'class-validator';

export class UpdateInventarioDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsOptional()
  categoria?: string;

  @IsNumber({}, { message: 'El precio debe ser un número válido' })
  @IsPositive({ message: 'El precio debe ser mayor a cero' })
  @IsOptional()
  precio?: number;

  @IsInt({ message: 'El stock debe ser un número entero' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  @IsOptional()
  stock?: number;

  @IsString()
  @IsOptional()
  unidadMedida?: string;
}

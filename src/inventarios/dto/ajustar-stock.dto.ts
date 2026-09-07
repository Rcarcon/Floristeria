import { IsInt, IsNotEmpty } from 'class-validator';

export class AjustarStockDto {
  @IsInt({ message: 'La cantidad debe ser un número entero (positivo para sumar, negativo para restar)' })
  @IsNotEmpty({ message: 'La cantidad de ajuste es obligatoria' })
  cantidad: number;
}

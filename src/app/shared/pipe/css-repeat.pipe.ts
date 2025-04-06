import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cssRepeat'
})
export class CssRepeatPipe implements PipeTransform {
    transform(count: number, value: string = '1fr'): string {
      return `repeat(${count}, ${value})`;
    }
  }
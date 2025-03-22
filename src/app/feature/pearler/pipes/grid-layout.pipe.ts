import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gridRow',
})
export class GridRowPipe implements PipeTransform {
  transform(key: string, offset: number): string {
    const [_, y] = key.split(':');
    return `${parseInt(y) + offset}`;
  }
}

@Pipe({
  name: 'gridColumn',
})
export class GridColumnPipe implements PipeTransform {
  transform(key: string, offset: number): string {
    const [x, _] = key.split(':');
    return `${parseInt(x) + offset}`;
  }
}

@Pipe({
  name: 'repeat'
})
export class RepeatPipe implements PipeTransform {
  transform(value: number): string {
    return `repeat(${value}, 1fr)`;
  }
}

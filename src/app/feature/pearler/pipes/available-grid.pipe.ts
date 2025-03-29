import { Pipe, PipeTransform } from '@angular/core';
import { Direction } from '../services/pearler-grid-manager.service';
import { RGBGrid } from '../../../shared/models/RGBGrid';

@Pipe({
  name: 'isAvailable',
})
export class AvailableGridPipe implements PipeTransform {
  transform(gridKey: string, grids: Map<string, RGBGrid>, direction: Direction): boolean {
    const [x, y] = this.parseGridLocation(gridKey);
    const [adjacentX, adjacentY] = this.getAdjacentGridLocation(x, y, direction);

    const adjacentKey = this.getGridLocationKey(adjacentX, adjacentY);
    return !grids.has(adjacentKey);
  }

  private getAdjacentGridLocation(x: number, y: number, direction: Direction) {
    switch (direction) {
      case 'up':
        return [x, y - 1];
      case 'down':
        return [x, y + 1];
      case 'left':
        return [x - 1, y];
      case 'right':
        return [x + 1, y];
    }
  }

  private parseGridLocation(locationKey: string): [number, number] {
    return locationKey
      .split(':')
      .map((s) => parseInt(s))
      .slice(0, 2) as [number, number];
  }

  private getGridLocationKey(positionX: number, positionY: number) {
    return `${positionX}:${positionY}`;
  }
}

import { computed, Injectable, signal } from '@angular/core';
import { injectLocalStorage } from 'ngxtension/inject-local-storage';

export type RGBGrid = number[][][];
export type Direction = 'up' | 'down' | 'left' | 'right';

@Injectable()
export class PearlerGridManagerService {
  private readonly baseColorArray = [255, 255, 255];
  private pearlerGrids = injectLocalStorage<Map<string, RGBGrid>>(
    'pearler-designer-grids',
    {
      defaultValue: new Map<string, RGBGrid>(),
      stringify: (grids: unknown) => {
        return JSON.stringify(
          Array.from((grids as Map<string, RGBGrid>).entries())
        );
      },
      parse: (grids: string) => {
        return new Map(JSON.parse(grids));
      },
    }
  );

  private readonly trayGridDimensions = computed(() => {
    const grids = this.pearlerGrids();
    if (!grids || grids.size === 0) return { width: 0, height: 0 };

    let minX: number | undefined = undefined;
    let maxX: number | undefined = undefined;
    let minY: number | undefined = undefined;
    let maxY: number | undefined = undefined;


    for (const key of grids.keys()) {
      const [x, y] = key.split(':').map(Number);
      
      if (minX === undefined || x < minX) minX = x;
      if (maxX === undefined || x > maxX) maxX = x;
      if (minY === undefined || y < minY) minY = y;
      if (maxY === undefined || y > maxY) maxY = y;
    }

    const deltaX = (maxX as number) - (minX as number) + 1;
    const deltaY = (maxY as number) - (minY as number) + 1;

    return { width: deltaX, height: deltaY };
  });

  private readonly trayGridOffset = computed(() => {
    const grids = this.pearlerGrids();
    if (!grids || grids.size === 0) return { x: 0, y: 0 };

    let minX: number | undefined = undefined;
    let minY: number | undefined = undefined;
    const yValues = [];
    for (const key of grids.keys()) {
      const [x, y] = key.split(':').map(Number);

      if (minX === undefined || x < minX) minX = x;
      if (minY === undefined || y < minY) minY = y;
    }

    return { x: -1 * (minX as number), y: -1 * (minY as number) };
  });

  getPearlerGrids() {
    return this.pearlerGrids.asReadonly();
  }

  getTrayGridOffset() {
    return this.trayGridOffset;
  }

  getTrayGridDimensions() {
    return this.trayGridDimensions;
  }

  initializeFreshGrids(width: number, height: number) {
    this.pearlerGrids.set(
      new Map<string, RGBGrid>()
        .set(this.getGridLocationKey(0, 0), this.getEmptyGrid(width, height))
        
    );
  }

  addGrid(positionX: number, positionY: number) {
    this.pearlerGrids.update((grids) => {
      if (grids && grids.size > 0) {
        const [width, height] = this.getCurrentGridDimensions();
        const key = this.getGridLocationKey(positionX, positionY);
        const newGrid = this.getEmptyGrid(width, height);

        grids.set(key, newGrid);
      }

      return grids;
    });
  }

  clearGrids() {
    this.pearlerGrids.update((grids) => {
      if (!!grids && grids.size > 0) {
        const [width, height] = this.getCurrentGridDimensions();

        for (const key of grids.keys()) {
          grids.set(key, this.getEmptyGrid(width, height));
        }
      }

      return grids;
    });
  }

  setPixelColor(
    gridPositionKey: string,
    row: number,
    col: number,
    r: number,
    g: number,
    b: number
  ) {
    this.pearlerGrids.update((grids) => {
      if (!grids) return grids;

      const [positionX, positionY] = this.parseGridLocation(gridPositionKey);
      const key = this.getGridLocationKey(positionX, positionY);
      const grid = grids.get(key);
      if (!grid) return grids;

      grid[row][col] = [r, g, b];
      return grids;
    });
  }

  private getEmptyGrid(width: number, height: number) {
    return Array.from({ length: height }, () =>
      Array.from({ length: width }, () => this.baseColorArray)
    );
  }

  private getGridLocationKey(positionX: number, positionY: number) {
    return `${positionX}:${positionY}`;
  }

  private parseGridLocation(locationKey: string): [number, number] {
    return locationKey
      .split(':')
      .map(Number)
      .slice(0, 2) as [number, number];
  }

  private getCurrentGridDimensions(): [number, number] {
    const grids = this.pearlerGrids();
    if (!grids || grids.size === 0) return [0, 0];

    const grid = grids.get(this.getGridLocationKey(0, 0));
    if (!grid) return [0, 0];

    return [grid[0].length, grid.length];
  }
}

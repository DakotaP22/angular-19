import { Injectable, signal } from '@angular/core';
import { injectLocalStorage } from 'ngxtension/inject-local-storage';

type RGBGrid = number[][][];

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

  getPearlerGrids() {
    return this.pearlerGrids;
  }

  initializeFreshGrids(width: number, height: number) {
    this.pearlerGrids.set(
      new Map<string, RGBGrid>().set(
        this.getGridLocationKey(0, 0),
        this.getEmptyGrid(width, height)
      )
    );
  }

  clearGrids() {
    this.pearlerGrids.update((grids) => {
      if (!!grids && grids.size > 0) {
        const [ width, height ] = this.getCurrentGridDimensions();

        for(const key of grids.keys()) {
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
      .map((s) => parseInt(s))
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

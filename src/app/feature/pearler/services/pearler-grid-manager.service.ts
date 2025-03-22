import { Injectable, signal } from '@angular/core';
import { injectLocalStorage } from 'ngxtension/inject-local-storage';

type RGBGrid = number[][][];

@Injectable()
export class PearlerGridManagerService {
  private pearlerGrids = signal<Map<string, RGBGrid>>(new Map());
  private readonly width = injectLocalStorage<number>('pearler-grid-width', {
    defaultValue: 32,
  });
  private readonly height = injectLocalStorage<number>('pearler-grid-height', {
    defaultValue: 32,
  });
  private readonly baseColorArray = [255, 255, 255];

  getPearlerGrids() {
    if(this.pearlerGrids().size === 0) {
      this.initalizeGrid();
    }
    return this.pearlerGrids;
  }

  setGridDimensions(width: number, height: number) {
    this.width.set(width);
    this.height.set(height);
  }

  initalizeGrid() {
    const map = new Map<string, RGBGrid>();
    map.set(this.getGridLocationKey(0, 0), this.getEmptyGrid());
    map.set(this.getGridLocationKey(0, 1), this.getEmptyGrid());

    this.pearlerGrids.set(map);
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

  private getEmptyGrid() {
    return Array.from({ length: this.height() }, () =>
      Array.from({ length: this.height() }, () => this.baseColorArray)
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
}

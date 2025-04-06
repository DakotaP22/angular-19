import { Injectable } from '@angular/core';
import { injectLocalStorage } from 'ngxtension/inject-local-storage';
import { RGBGrid } from '../../../../../shared/models/RGBGrid';

@Injectable()
export class MultiStitchGridManagerService {
  private readonly baseColorArray = [255, 255, 255]; // Default color for empty cells
  private rgbGrid = injectLocalStorage<RGBGrid | null>(
    'multi-stitch-designer-grid', // Key for local storage
    {
      defaultValue: null,
    }
  );

  getMutliStitchGrid() {
    return this.rgbGrid.asReadonly();
  }

  initializeFreshGrid(width: number, height: number) {
    const emptyGrid = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => this.baseColorArray)
    );
    this.rgbGrid.set(emptyGrid);
  }

  setPixelColor(row: number, col: number, r: number, g: number, b: number) {
    this.rgbGrid.update((currentGrid) => {
        if(currentGrid) {
            currentGrid[col][row] = [r, g, b]; 
        }

        return currentGrid;
    })
  }

  addRowAbove() {
    // this.rgbGrid.update((currentGrid) => {
    //     if(!currentGrid) return currentGrid;

    //     const newRow = Array.from({ length: currentGrid ? currentGrid[0].length : 0 }, () => this.baseColorArray);
    //     return [newRow, ...currentGrid];
    // })
  }

  addRowBelow() {
    // this.rgbGrid.update((currentGrid) => {
    //     if(!currentGrid) return currentGrid;

    //     const newRow = Array.from({ length: currentGrid ? currentGrid[0].length : 0 }, () => this.baseColorArray);
    //     return [...currentGrid, newRow];
    // })
  }
}

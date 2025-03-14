import { Injectable, signal } from '@angular/core';

@Injectable()
export class PearlerGridManagerService {

    private rgbMatrix = signal<number[][][] | null>(null);

    initializeMatrix(width: number, height: number) {
        const baseColorArray = [255,255,255];

        this.rgbMatrix.set(Array.from({ length: height }, () => Array.from({ length: width }, () => baseColorArray)));        
    }

    getMatrix() {
        return this.rgbMatrix;
    }

    setPixelColor(row: number, col: number, r: number, g: number, b: number) {
        console.log(`Setting pixel color at (${row}, ${col}) to rgb(${r}, ${g}, ${b})`);
        this.rgbMatrix.update(matrix => {
            if (!matrix) return matrix;

            matrix[row][col] = [r, g, b];

            return matrix;
        })
    }
}
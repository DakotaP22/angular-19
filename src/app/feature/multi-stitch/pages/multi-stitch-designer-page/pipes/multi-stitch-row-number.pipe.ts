import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'rowNumber'
})

export class MultiStitchRowNumberPipe implements PipeTransform {
    transform(row: number, column: number): number {
        if(row == 0) return 1;

        if(column % 2 == 0) {
            return ((row + 1) * 2) - 1
        } else {
            return (row) * 2
        }
    }
}
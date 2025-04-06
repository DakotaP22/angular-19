import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'bgColor'
})

export class BackgroundColorPipe implements PipeTransform {
    transform(rgbArray: number[]): any {
        return `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;
    }
}
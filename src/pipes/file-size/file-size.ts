import { Pipe, PipeTransform } from '@angular/core';

import { AlimentItem, FilterCriteria } from './../../models';

@Pipe({ name: 'fileSize' })
export class FileSizePipe implements PipeTransform {

    transform(fileSize: number, outputSize: string) {
        if(!outputSize) {  // default option: in bytes
            return fileSize;
        } else if(outputSize.toLowerCase() === 'kb') {
            return (fileSize / 1024).toFixed(2);
        } else if(outputSize.toLowerCase() === 'mb') {
            return (fileSize / (1024 * 1024)).toFixed(2);
        } else {
            return fileSize;
        }
    }

}

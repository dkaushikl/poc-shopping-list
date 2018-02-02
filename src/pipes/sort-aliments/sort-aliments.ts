import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortAliments',
})
export class SortAlimentsPipe implements PipeTransform {

  transform(value: string, ...args) {
    console.log('Pipe value: ', value);
    return value.toLowerCase();
  }

}

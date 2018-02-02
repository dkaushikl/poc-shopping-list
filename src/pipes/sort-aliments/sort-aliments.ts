import { Pipe, PipeTransform } from '@angular/core';

import { AlimentItem, FilterCriteria } from './../../models';

@Pipe({
  name: 'sortAliments',
})
export class SortAlimentsPipe implements PipeTransform {

  transform(aliments: Array<AlimentItem>, filteringCriteria: FilterCriteria) {
    console.log('Pipe value: ', aliments);
    return aliments;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

import { AlimentItem, FilterCriteria } from './../../models';

@Pipe({
  name: 'sortAliments'
})
export class SortAlimentsPipe implements PipeTransform {

  transform(aliments: Array<AlimentItem>, filteringCriteria: FilterCriteria) {
    if(!filteringCriteria) 
      return aliments;

    switch(filteringCriteria.sorting) {
      case 'asc':
        return aliments.sort(this.stringFunctionComparison);
      case 'desc':
        return aliments.sort((a, b) => this.stringFunctionComparison(a, b) * -1);
      case 'none':
      default: return aliments;
    }
  }

  private stringFunctionComparison(alimentA: AlimentItem, alimentB: AlimentItem) {
    return (alimentA.name === alimentB.name) 
      ? 0
      : (alimentA.name > alimentB.name) ? 1 : -1;
  }

}

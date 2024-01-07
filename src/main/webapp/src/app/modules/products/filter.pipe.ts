import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      return Object.values(item).some((val: any) => {
        if (Array.isArray(val)) {
          // If the property is an array (e.g., 'categories'), check each item in the array
          return val.some((category: any) =>
            Object.values(category).some((categoryVal: any) =>
              categoryVal.toString().toLowerCase().includes(searchText)
            )
          );
        } else {
          // For non-array properties, check the property value
          return val.toString().toLowerCase().includes(searchText);
        }
      });
    });
    
  }
}

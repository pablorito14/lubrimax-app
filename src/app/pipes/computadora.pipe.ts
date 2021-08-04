import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'computadora'
})
export class ComputadoraPipe implements PipeTransform {

  transform(value: any[], query: string): any {
    if(query === '' || query === undefined) {
      return value;
    }
    return value.filter(mant => mant.computadora.toLowerCase().indexOf(query) != -1)
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchw',
  pure: false
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {    
    let res = value;
    if(args)
        res = value.filter((item) => item.name.indexOf(args) > -1 );
    return  res;
  }

}

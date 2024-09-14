import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(allProd: Product[], word: string): Product[] {
     return allProd.filter( (p)=> {
        return p.title.toLowerCase().includes(word.toLowerCase())
     })
  }

}

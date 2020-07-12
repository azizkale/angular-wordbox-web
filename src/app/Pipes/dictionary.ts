import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dict'
})

export class DictionaryPipe implements PipeTransform{
    
    transform() {
        throw new Error("Method not implemented.");
    }
    
}
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dict'
})

export class DictionaryPipe implements PipeTransform {

    transform(word: string) {
        if (word === 'Buch')
          return console.log(word)
    }

}
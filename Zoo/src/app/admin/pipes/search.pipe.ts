import {Injectable,Pipe,PipeTransform} from '@angular/core';
//Nombre de la tuberia con @pipe

@Pipe({name: 'search'})
@Injectable()
export class SearchPipe implements PipeTransform{
    //viene dentro de PipeTransform
    transform(items: any, term:any):any{
        if(term == undefined){
            return items;
        }
        return items.filter(function(item){
            return item.name.toLowerCase().includes(term.toLowerCase());
        });
    }
}
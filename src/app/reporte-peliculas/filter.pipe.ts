    import { Pipe, PipeTransform } from '@angular/core';

    @Pipe({
    name: 'filter'
    })
    export class FilterPipe implements PipeTransform {
    transform(items: any[], filter: any): any {
        if (!items || !filter) {
        return items;
        }

        return items.filter(item => {
        let cumpleFiltroGenero = true;
        let cumpleFiltroAnio = true;

        if (filter.genero && filter.genero !== '') {
            cumpleFiltroGenero = item.genero.toLowerCase().includes(filter.genero.toLowerCase());
        }

        if (filter.lanzamiento && filter.lanzamiento !== null) {
            cumpleFiltroAnio = item.lanzamiento === filter.lanzamiento;
        }

        return cumpleFiltroGenero && cumpleFiltroAnio;
        });
    }
    }
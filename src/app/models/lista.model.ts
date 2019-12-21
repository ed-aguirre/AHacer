import { ListaItem } from './lista-item.model';

export class Lista {
    id: number;
    titulo: string;
    creadaEn: Date;
    terminadaEn: Date;
    completada: boolean;
    item: ListaItem[];

    constructor(titulo: string) {
        this.titulo = titulo;
        // tslint:disable-next-line: new-parens
        this.creadaEn = new Date;
        this.completada = false;
        this.item = [];
        this.id  = new Date().getTime();
    }
}

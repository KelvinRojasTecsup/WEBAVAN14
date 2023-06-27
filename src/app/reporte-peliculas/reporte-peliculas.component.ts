import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilterPipe } from './filter.pipe';
import * as XLSX from 'xlsx';
import * as fileSaver from 'file-saver';
 declare var require: any;
 const pdfMake = require('pdfmake/build/pdfmake');
 const pdfFonts = require('pdfmake/build/vfs_fonts');

@Component({
  selector: 'app-reporte-peliculas',
  templateUrl: './reporte-peliculas.component.html',
  styleUrls: ['./reporte-peliculas.component.css']
})
export class ReportePeliculasComponent implements OnInit {
  peliculas: any[] = [];
  filtroGenero: string = '';
  filtroAnio: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('./assets/peliculas.json').subscribe(data => {
      this.peliculas = data;
    });
  }

  generarPDF() {
    const peliculasFiltradas = this.peliculas.filter(pelicula =>
      (!this.filtroGenero || pelicula.genero.toLowerCase().includes(this.filtroGenero.toLowerCase())) &&
      (!this.filtroAnio || pelicula.lanzamiento === this.filtroAnio)
    );

    const contenido = [
      { text: 'Informe de Películas', style: 'header' },
      { text: '\n\n' },
      {
        table: {
          headerRows: 1,
          widths: ['*', '*', '*'],
          body: [
            ['Título', 'Género', 'Año de lanzamiento'],
            ...peliculasFiltradas.map(pelicula => [pelicula.titulo, pelicula.genero, pelicula.lanzamiento.toString()])
          ]
        }
      }
    ];

    const estilos = {
      header: {
        fontSize: 24,
        bold: true,
        alignment: undefined,
        margin: [0, 0, 0, 10],
        color: '#3366FF',
        fontFamily: 'Arial',
        background: '#F2F2F2',
        decoration: 'underline'
      },
      tableHeader: {
        fillColor: '#EEEEEE',
        bold: true,
        color: '#333333',
        alignment: 'center',
        fontSize: 12
      },
      tableCell: {
        fontSize: 10,
        color: '#555555',
        fillColor: '#EFEFEF',
        font: 'Calibri'
      }
    };

    const documentDefinition = {
      content: contenido,
      styles: estilos
    };

    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(documentDefinition).open();
  }

  exportarExcel() {
    const peliculasFiltradas = this.peliculas.filter(pelicula =>
      (!this.filtroGenero || pelicula.genero.toLowerCase().includes(this.filtroGenero.toLowerCase())) &&
      (!this.filtroAnio || pelicula.lanzamiento === this.filtroAnio)
    );

    const data: any[] = [['Título', 'Género', 'Año de lanzamiento']];
    peliculasFiltradas.forEach(pelicula => {
      data.push([pelicula.titulo, pelicula.genero, pelicula.lanzamiento.toString()]);
    });

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Películas');
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const fecha = new Date().toISOString().slice(0, 10);
    const nombreArchivo = `Informe_Películas_${fecha}.xlsx`;
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    fileSaver.saveAs(blob, nombreArchivo);
  }
}

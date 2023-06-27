import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportePeliculasComponent } from './reporte-peliculas/reporte-peliculas.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './reporte-peliculas/filter.pipe';
import * as XLSX from 'xlsx';
import * as fileSaver from 'file-saver';


@NgModule({
  declarations: [
    AppComponent,
    ReportePeliculasComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

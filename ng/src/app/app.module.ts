import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TallaComponent } from './components/talla/talla.component';
import { ErrorComponent } from './components/error/error.component';
import { TipoComponent } from './components/tipo/tipo.component';
import { ModeloComponent } from './components/modelo/modelo.component';
import { MarcaComponent } from './components/marca/marca.component';
import { GenerarVentaComponent } from './components/generar-venta/generar-venta.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { TallaNewComponent } from './components/talla-new/talla-new.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TallaComponent,
    ErrorComponent,
    TipoComponent,
    ModeloComponent,
    MarcaComponent,
    GenerarVentaComponent,
    VentasComponent,
    TallaNewComponent
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

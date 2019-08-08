import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Externals
import { NgxPaginationModule } from "ngx-pagination";


// Rutas
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TallaComponent } from './components/tallas/talla/talla.component';
import { ErrorComponent } from './components/error/error.component';
import { TipoComponent } from './components/tipos/tipo/tipo.component';
import { ModeloComponent } from './components/modelos/modelo/modelo.component';
import { MarcaComponent } from './components/marcas/marca/marca.component';
import { GenerarVentaComponent } from './components/ventas/generar-venta/generar-venta.component';
import { VentasComponent } from './components/ventas/venta/ventas.component';
import { DetalleVentaComponent } from './components/ventas/detalle-venta/detalle-venta.component';

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
    DetalleVentaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

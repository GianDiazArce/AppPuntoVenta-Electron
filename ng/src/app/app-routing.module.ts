import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { TallaComponent } from './components/tallas/talla/talla.component';
import { GenerarVentaComponent } from './components/ventas/generar-venta/generar-venta.component';
import { TipoComponent } from './components/tipos/tipo/tipo.component';
import { MarcaComponent } from './components/marcas/marca/marca.component';
import { ModeloComponent } from './components/modelos/modelo/modelo.component';
import { MarcaNewComponent } from './components/marcas/marca-new/marca-new.component';
import { VentasComponent } from './components/ventas/venta/ventas.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'inicio', component: HomeComponent},

  // Rutas de tallas
  {path: 'talla', component:TallaComponent},

  {path: 'marca', component:MarcaComponent},
  {path: 'nueva-marca', component:MarcaNewComponent},

  {path: 'ventas', component:VentasComponent},
  {path: 'generar-venta', component: GenerarVentaComponent},
  
  {path: 'tipo', component:TipoComponent},
  {path: 'modelo', component:ModeloComponent},

  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

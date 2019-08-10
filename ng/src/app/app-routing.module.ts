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
import { VentasComponent } from './components/ventas/venta/ventas.component';
import { DetalleVentaComponent } from './components/ventas/detalle-venta/detalle-venta.component';
import { LoginComponent } from './components/user/login/login.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'inicio', component: HomeComponent},

  // Rutas de tallas
  {path: 'talla', component:TallaComponent},

  {path: 'marca', component:MarcaComponent},

  {path: 'ventas', component:VentasComponent},
  {path: 'generar-venta', component: GenerarVentaComponent},
  {path: 'detalle-venta/:id', component: DetalleVentaComponent},
  
  {path: 'tipo', component:TipoComponent},
  {path: 'modelo', component:ModeloComponent},

  {path: 'login', component:LoginComponent},
  {path: 'logout/:sure', component:LoginComponent},

  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

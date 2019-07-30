import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { TallaComponent } from './components/talla/talla.component';
import { GenerarVentaComponent } from './components/generar-venta/generar-venta.component';
import { TipoComponent } from './components/tipo/tipo.component';
import { MarcaComponent } from './components/marca/marca.component';
import { ModeloComponent } from './components/modelo/modelo.component';
import { TallaNewComponent } from './components/talla-new/talla-new.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'inicio', component: HomeComponent},

  // Rutas de tallas
  {path: 'talla', component:TallaComponent},
  {path: 'nueva-talla', component:TallaNewComponent},


  {path: 'generar-venta', component: GenerarVentaComponent},
  {path: 'tipo', component:TipoComponent},
  {path: 'marca', component:MarcaComponent},
  {path: 'modelo', component:ModeloComponent},

  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

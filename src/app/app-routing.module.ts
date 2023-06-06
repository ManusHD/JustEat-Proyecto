import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ErrorComponent } from './componentes/error/error.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { RestaurantesComponent } from './componentes/restaurantes/restaurantes.component';
import { RestauranteComponent } from './componentes/restaurante/restaurante.component';
import { ValoracionesComponent } from './componentes/valoraciones/valoraciones.component';
import { DatosComponent } from './componentes/perfil/datos/datos.component';
import { PedidosComponent } from './componentes/perfil/pedidos/pedidos.component';
import { RestaurantesPerfilComponent } from './componentes/perfil/restaurantes-perfil/restaurantes-perfil.component';
import { AuthGuard } from './guardianes/auth.guard';

const routes: Routes = [
  {path: '', component:InicioComponent},
  {path: 'login', component:LoginComponent},
  {path: 'registro', component:RegistroComponent},
  {path: 'perfil', component:PerfilComponent, canActivate: [AuthGuard] },
  {path: 'carrito', component:CarritoComponent},
  {path: 'error', component:ErrorComponent},
  {path: 'perfil', component:PerfilComponent, canActivate: [AuthGuard] },
  {path: 'datos', component:DatosComponent, canActivate: [AuthGuard] },
  {path: 'pedidos', component:PedidosComponent, canActivate: [AuthGuard] },
  {path: 'perfil/restaurantes', component:RestaurantesPerfilComponent, canActivate: [AuthGuard] },
  {path: 'restaurantes/:filtro', component:RestaurantesComponent},
  {path: 'restaurante/:id', component:RestauranteComponent},
  {path: 'valoraciones/:id', component:ValoracionesComponent},
  {path: '**', component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

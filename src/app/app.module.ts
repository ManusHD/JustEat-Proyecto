import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { LoginComponent } from './componentes/login/login.component';
import { LogoutComponent } from './componentes/logout/logout.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ErrorComponent } from './componentes/error/error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlatoComponent } from './componentes/plato/plato.component';
import { RestaurantesComponent } from './componentes/restaurantes/restaurantes.component';
import { RestaurantsService } from './services/restaurantes.service';
import { LoggingService } from './LoggingService';
import { HttpClientModule } from '@angular/common/http';
import { DataServices } from './data.services';
import { RestauranteComponent } from './componentes/restaurante/restaurante.component';
import { ValoracionesComponent } from './componentes/valoraciones/valoraciones.component';
import { RestaurantService } from './services/restaurante.service';
import { CabeceraService } from './services/cabecera.service';
import { BuscarService } from './services/buscar.service';
import { LoginService } from './services/login.service';
import { AuthService } from './services/auth.service';
import { DatosComponent } from './componentes/perfil/datos/datos.component';
import { RestaurantesPerfilComponent } from './componentes/perfil/restaurantes-perfil/restaurantes-perfil.component';
import { PedidosComponent } from './componentes/perfil/pedidos/pedidos.component';
import { AuthGuard } from './guardianes/auth.guard';
import { RestaurantsPerfilService } from './services/restaurantes-perfil.service';
import { RegistroService } from './services/registro.service';
import { PedidosService } from './services/pedidos.service';
import { DatosService } from './services/datos.service';
import { DishService } from './services/dish.service';
import { CestaService } from './services/cesta.service';
import { SeguimientousuarioComponent } from './componentes/seguimientousuario/seguimientousuario.component';
import { SeguimientousuarioService } from './services/seguimientousuario.service';

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    CarritoComponent,
    LoginComponent,
    LogoutComponent,
    RegistroComponent,
    PerfilComponent,
    InicioComponent,
    ErrorComponent,
    PlatoComponent,
    RestaurantesComponent,
    RestauranteComponent,
    ValoracionesComponent,
    DatosComponent,
    RestaurantesPerfilComponent,
    PedidosComponent,
    SeguimientousuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [RestaurantsService, LoggingService, 
    DataServices, RestaurantService, CabeceraService, 
    BuscarService, LoginService, AuthService, AuthGuard, 
    RestaurantsPerfilService, RegistroService, PedidosService,
    DatosService, DishService, CestaService, SeguimientousuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }

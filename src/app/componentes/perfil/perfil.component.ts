import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import { RestaurantsPerfilService } from 'src/app/services/restaurantes-perfil.service';
import { RestaurantsService } from 'src/app/services/restaurantes.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{
  
  constructor(private restaurantsService: RestaurantsService,
              private pedidosService: PedidosService,
              private rps: RestaurantsPerfilService){}

  ngOnInit(): void {
    this.restaurantsService.cargarRestaurantes();
    const id = Number.parseInt(localStorage.getItem('idUser')!);
    console.log("Cargando MapaPedidos");
    this.pedidosService.cargarPedidos(id);
    this.rps.setRestaurantes(id);
    this.restaurantsService.cargarCategorias();
  }

}

import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/model/restaurant.model';
import { BuscarService } from 'src/app/services/buscar.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { RestaurantsService } from 'src/app/services/restaurantes.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{
  
  filtro:string = '';
  restaurantes?: Restaurant[];

  constructor(private buscar: BuscarService, 
              private restaurantsService: RestaurantsService,
              private pedidosService: PedidosService){}
              
  ngOnInit(): void {
    this.restaurantsService.cargarRestaurantes();
    const token = localStorage.getItem('token');
    if(token && token.length > 0){
      const id = Number.parseInt(localStorage.getItem('idUser')!);
      console.log("Cargando MapaPedidos");
      this.pedidosService.cargarPedidos(id); 
    }
  }
  
  onBuscarRestaurantes(){
    this.buscar.buscarRestaurante(this.filtro);
  }

}
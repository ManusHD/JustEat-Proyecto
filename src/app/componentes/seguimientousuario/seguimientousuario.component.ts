import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/model/dish.model';
import { Restaurant } from 'src/app/model/restaurant.model';
import { RestaurantsPerfilService } from 'src/app/services/restaurantes-perfil.service';
import { SeguimientousuarioService } from 'src/app/services/seguimientousuario.service';

@Component({
  selector: 'app-seguimientousuario',
  templateUrl: './seguimientousuario.component.html',
  styleUrls: ['./seguimientousuario.component.css']
})
export class SeguimientousuarioComponent implements OnInit{

  pedidos:Dish[] = [];
  nPedidos: number = 0;
  restaurantes: number = 0;
  token:string = localStorage.getItem('token')!;
  blanco:boolean = true;

  constructor(private rps: RestaurantsPerfilService,
              private sus: SeguimientousuarioService){}

  ngOnInit(): void {
    const id = JSON.parse(localStorage.getItem('idUser')!) as number;
    this.rps.setRestaurantes(id);
    this.sus.obtenerNumeroPedidos(id).subscribe(
      (data: Object) => {
          if (Array.isArray(data)) {
                  this.pedidos = data as Dish[];
                  console.log("Numero de pedidos if: ");
                  this.nPedidos = this.pedidos.length;
                  if(this.nPedidos > 2){
                    this.blanco = false;
                  }
              } else {
                  console.log("Numero de pedidos else");
                  this.pedidos.push(data as Dish);
                  this.nPedidos = this.pedidos.length;
            }
      }
      
  )


    setTimeout(() => {
      this.restaurantes = this.rps.obtenerRestaurantes().length
    }, 1000);
    



  }




}

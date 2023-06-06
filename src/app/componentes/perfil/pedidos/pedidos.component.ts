import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order.model';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit{

  pedidos: {id: number, platos: string[], price:number}[] = [];

  constructor(private pedidosService: PedidosService){}

  ngOnInit(): void {
    console.log("Empezampos el establecimiento");
    this.pedidos = this.pedidosService.getMapaPedidos();
  }

}

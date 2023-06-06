import { Injectable } from "@angular/core";
import { Dish } from "../model/dish.model";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

@Injectable()
export class CestaService {
  private cesta: Dish[] = [];
  private apiUrl = 'https://localhost:3000';
  private token = localStorage.getItem('token')! as string;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  agregarCesta(dish: Dish) {
    const cesta = JSON.parse(localStorage.getItem('cesta')!);
    if(cesta){
      this.cesta = cesta;
    }
    this.cesta.push(dish);
    localStorage.setItem('cesta', JSON.stringify(this.cesta));
  }

  quitarCesta(dish: Dish) {
    const cesta = JSON.parse(localStorage.getItem('cesta')!);
    if(cesta){
      this.cesta = cesta;
    }
    this.cesta = this.cesta.filter((plato) => plato.id != dish.id);
    localStorage.setItem('cesta', JSON.stringify(this.cesta));
    return this.cesta;
  }

  getCesta() {
    return this.cesta;
  }

  realizarPedido(idUser: number, totalCesta:number) {
    const order = {
      campo1: idUser,
      campo2: totalCesta,
    };
    
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` }); 
    this.http.post(`${this.apiUrl}/pedidos`, order, { headers }).subscribe(
      (response) => {
        const idOrder = response as number;
        console.log("Pedido insertado correctamente. ID del pedido: " + idOrder);

        this.cesta.forEach((plato) => {
          const orderDish = {
            ido: idOrder,
            iddi: plato.id,
          };
          this.http
            .post(`${this.apiUrl}/orderDishes`, orderDish, { headers })
            .subscribe(
              (response) => {
                console.log("OrderDish insertado correctamente");
                console.log(response);
              },
              (error) => {
                console.log(error);
              }
            );
        });

        this.cesta = [];
        localStorage.setItem('cesta', JSON.stringify(this.cesta));
      },
      (error) => {
        console.error("Error al insertar el pedido. Error: " + error);
      }
    );
  }
}

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Order } from "../model/order.model";
import { Injectable } from "@angular/core";
import { Dish } from "../model/dish.model";
import { OrderDishes } from "../model/orderDishes.model";

@Injectable()
export class PedidosService{
    pedidos: Order[] = [];
    pedidosFinales: {id: number, platos: string[], price:number}[] = [];
    dishes: Dish[] = [];
    orderDishes: OrderDishes[] = [];
    private token = localStorage.getItem('token') as string;
    private apiUrl = 'https://localhost:3000';

    constructor(private httpClient: HttpClient){}
    
    //Carga todo lo necesario para ejecutar la funcion getMapaPedidos de usuario con ID = idUsuario
    cargarPedidos(idUsuario: number){
        this.token = localStorage.getItem('token') as string;
        this.orderDishes = [];
        this.getOrders(idUsuario);
        this.getDishes();
    }

    getMapaPedidos() {
        this.pedidosFinales = [];
        for (const pedido of this.pedidos) {
          const platos: string[] = [];
          let totalPrice = 0;
        
          const orderDishesRelacionados = this.orderDishes.filter((orderDish) => orderDish.ido === pedido.id);
        
          for (const orderDish of orderDishesRelacionados) {
            const plato = this.dishes.find((dish) => dish.id === orderDish.iddi);
        
            if (plato) {
              platos.push(plato.name);
              totalPrice += plato.price;
            }
          }
        
          this.pedidosFinales.push({ id: pedido.id, platos, price: totalPrice });
        }
        console.log("this.pedidosFinales: ");
        console.log(this.pedidosFinales);

        return this.pedidosFinales;
    }
      
      

    //Devuelve los pedidos del usuario con ID = id:number
    getOrders(id:number){
        console.log(`Obteniendo los pedidos`);
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
        this.httpClient.get(`${this.apiUrl}/pedidos/${id}`, { headers }).subscribe(
            (data: Object) => {
                if (Array.isArray(data)) {
                    this.pedidos = data as Order[]; 
                    console.log("Devolviendo los pedidos");
                    console.log(this.pedidos);
                    this.pedidos.forEach(pedido => {
                        this.getOrderDishes(pedido.id);
                    });
                } else {
                    this.pedidos.push(data as Order);
                    console.log(this.pedidos);
                }
            }
          );
    }

    //Obtiene los platos del id del pedido dado
    getOrderDishes(id:number){
        console.log(`Obteniendo los platos por pedidos`);
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
        this.httpClient.get(`${this.apiUrl}/orderDishes/${id}`, { headers }).subscribe(
            (data: Object) => {   
                if (Array.isArray(data)) {
                    this.orderDishes.push(...data as OrderDishes[]);
                    console.log("Devolviendo los orderDishes");
                    console.log(this.orderDishes);
                }else {
                    this.orderDishes.push(data as OrderDishes);
                    console.log("Devolviendo los orderDishes");
                    console.log(this.orderDishes);
                }
            }
        );
    }


    getDishes(){
        console.log(`Obteniendo los platos`);
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
        this.httpClient.get(`${this.apiUrl}/platos`, { headers }).subscribe(
            (data: Object) => {
                if (Array.isArray(data)) {
                    this.dishes = data as Dish[];
                    console.log("Devolviendo los platos");
                    console.log(this.dishes);
                  } else {
                    console.log(this.dishes);
                    console.log("Devolviendo los platos");
                    this.dishes = [];
                    this.dishes.push(data as Dish);
                  }
            }
          );
    }

}
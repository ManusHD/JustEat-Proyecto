import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Restaurant } from "../model/restaurant.model";
import { Injectable } from "@angular/core";
import { RestaurantService } from "./restaurante.service";
import { RestaurantsService } from "./restaurantes.service";

@Injectable()
export class RestaurantsPerfilService{

    
    restaurantes: Restaurant[] = [];
    private apiUrl = 'https://localhost:3000';
    private token = localStorage.getItem('token') as string;

    constructor(private httpClient: HttpClient, 
                private restaurantService: RestaurantService, 
                private restaurantsService: RestaurantsService){}

    setRestaurantes(id:number){
        console.log("El id de usuario a obtener : " + id);
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
        this.httpClient.get(`${this.apiUrl}/perfil/restaurantes/${id}`, { headers }).subscribe(
            (data: Object) => {
                if (Array.isArray(data)) {
                    this.restaurantes = data as Restaurant[];
                    localStorage.setItem('misRestaurantes', JSON.stringify(this.restaurantes));
                    } else {
                    this.restaurantes.push(data as Restaurant);
                  }
            }
          );
}

    obtenerRestaurantes(){
        console.log("obteniendo los restaurantes");
        return this.restaurantes;
    }

    postRestaurante(nombre:string, direccion:string, city:string, tel:string, email:string, bikeFriendly:number){
        const r:Restaurant = new Restaurant;
        r.name = nombre;
        r.address = direccion;
        r.city = city;
        r.telephone = tel;
        r.contactemail = email;
        r.bikeFriendly = bikeFriendly;
        this.restaurantsService.crearNuevoRestaurante(r);
    }

    visitarRestaurante(id:number){
        let rest = this.restaurantes.find(restaurant => restaurant.id === id)!;
        this.restaurantService.setRestaurante(rest);
    }

    cargarCategorias(){
        this.restaurantsService.cargarCategorias();
    }

    postRestaurantCategories(categorias: number[]){
        this.httpClient.post
    }


}
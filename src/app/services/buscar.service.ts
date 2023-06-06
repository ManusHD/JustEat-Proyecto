import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { RestaurantsService } from "./restaurantes.service";

@Injectable()
export class BuscarService{

    login:boolean = true;
    
    constructor(private router: Router,
        private restaurantsService: RestaurantsService){}

    buscarRestaurante(filtro:string){
        this.restaurantsService.filtrarRestaurantes(filtro);
        console.log(this.restaurantsService.getRestaurantes());
        this.router.navigate(['/restaurantes/' + filtro]);
    }
}
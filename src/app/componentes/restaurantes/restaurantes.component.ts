import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoggingService } from 'src/app/LoggingService';
import { Restaurant } from 'src/app/model/restaurant.model';
import { RestaurantsService } from 'src/app/services/restaurantes.service';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css']
})
export class RestaurantesComponent implements OnInit{


  restaurantes: Restaurant[] = [];
  seleccion: string = 'todos';
  disponibles: Restaurant[] = [];
  noDisponibles: Restaurant[] = [];

  constructor(private loggingService: LoggingService, 
              private restaurantsService: RestaurantsService,
              private cdr: ChangeDetectorRef){}

  ngOnInit(): void{
    this.restaurantes = this.restaurantsService.getRestaurantes();
    console.log("Restaurantes disponibles");
    console.log(this.restaurantes);

    this.disponibles = this.restaurantes.filter(
      (restaurante) => { return restaurante.available === 1
    });
    console.log("Restaurantes NO disponibles");
    console.log(this.disponibles);

    this.noDisponibles = this.restaurantes.filter(
      (restaurante) => { return restaurante.available === 0;
    });
    console.log("Restaurantes TODOS");
    console.log(this.noDisponibles);
  }
  
  onMostrarRestaurantes(){
    this.loggingService.enviarMensajeAConsola("Mostrando los restaurantes: " + this.restaurantsService.restaurantes[0].address);
  }
  
  onVisitarRestaurante(r: Restaurant){
    this.restaurantsService.visitarRestaurante(r);
  }

  onOrdenar(){
    this.restaurantes = this.restaurantsService.ordenarRestaurantes();
    this.cdr.detectChanges();
    console.log("Nuevo orden");
    console.log(this.restaurantes);
  }

  onMostrarSeleccion(){
    switch(this.seleccion){
      case 'disponibles':
        console.log("Seleccion: " + this.seleccion);
        console.log(this.restaurantes);
        this.restaurantes = this.disponibles;
        this.restaurantsService.setRestaurantes(this.restaurantes);
        console.log(this.restaurantes);
        this.cdr.detectChanges();
        break;
      case 'noDisponibles':
        console.log("Seleccion: " + this.seleccion);
        this.restaurantes = this.noDisponibles;
        this.restaurantsService.setRestaurantes(this.restaurantes);
        console.log(this.restaurantes);
        this.cdr.detectChanges();
        break;

      case 'todos':
        console.log("Seleccion: " + this.seleccion);
        this.restaurantes = JSON.parse(localStorage.getItem('restaurantesBusqueda')!) as Restaurant[];
        console.log(this.restaurantes);
        this.restaurantsService.setRestaurantes(this.restaurantes);
        this.cdr.detectChanges();
        break;
    }
  }
}
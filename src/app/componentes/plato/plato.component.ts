import { Component, Input, OnInit } from '@angular/core';
import { Dish } from 'src/app/model/dish.model';
import { CestaService } from 'src/app/services/cesta.service';
import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.css']
})
export class PlatoComponent implements OnInit{
  @Input() dish!: Dish;
  @Input() mio: boolean = false;

  constructor(private dishService: DishService,
              private cestaService: CestaService) { }
  
  ngOnInit(): void {
    
  }

  onBorrarPlato(){
    this.dishService.borrarPlato(this.dish.id);
  }

  onAgregarCesta(){
    console.log("Se va a añadir a la cesta el plato:");
    console.log(this.dish);
    this.cestaService.agregarCesta(this.dish);
  }

}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Dish } from 'src/app/model/dish.model';
import { CestaService } from 'src/app/services/cesta.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{

  cesta: Dish[] = [];
  vacia:boolean = true;
  total:number = 0;
  checkCesta: boolean = false;

  constructor(private cestaService: CestaService,
              private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    const cesta = JSON.parse(localStorage.getItem('cesta')!);
    console.log("La cesta cesta tiene: ");
    console.log(cesta);
    if(cesta && cesta.length > 0){
      this.cesta = cesta;
    }else{
      this.cesta = this.cestaService.getCesta();
    }
    if(this.cesta.length > 0){
      this.vacia = false;
    }
    this.setTotal();
    console.log("La cesta tiene: ");
    console.log(this.cesta);
    console.log("Con un valor de: ");
    console.log(this.total);
  }

  setTotal(){
    this.total = this.cesta.reduce((acu, dish) => acu + dish.price, 0);
  }

  onQuitarCesta(d:Dish){
    this.cesta = this.cestaService.quitarCesta(d);
    console.log("La cesta tiene:");
    console.log(this.cesta);
    if(this.cesta.length < 1){
      this.vacia = true;
    }
    this.setTotal();
    this.cdr.detectChanges();
  }

  onRealizarPedido(){
    const idUser = Number.parseInt(localStorage.getItem('idUser')!);
    this.cestaService.realizarPedido(idUser, this.total);
    this.cesta = [];
    this.setTotal();
    this.vacia = true;
    this.onCambiarCheckCesta();
    this.cdr.detectChanges();
  }

  onCambiarCheckCesta(){
    this.checkCesta = !this.checkCesta;
  }



}


import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category.model';
import { Restaurant } from 'src/app/model/restaurant.model';
import { RestaurantsPerfilService } from 'src/app/services/restaurantes-perfil.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-restaurantes-perfil',
  templateUrl: './restaurantes-perfil.component.html',
  styleUrls: ['./restaurantes-perfil.component.css', '../perfil.component.css']
})
export class RestaurantesPerfilComponent implements OnInit{

  restaurantes?: Restaurant[];
  crear?: boolean;
  editar: boolean = false;
  categorias: Category[] = [];
  nuevoRestauranteForm!: FormGroup;

  constructor(private restaurantsPerfilService: RestaurantsPerfilService){}


  ngOnInit(): void {
    this.restaurantsPerfilService.cargarCategorias();
    const id = Number.parseInt(localStorage.getItem('idUser')!);
    console.log("El ud de usuario es: " + id);
    const misRestaurantes = JSON.parse(localStorage.getItem('misRestaurantes')!);
    if(misRestaurantes){
      this.restaurantes = misRestaurantes as Restaurant[];
      console.log("Mostrando losre stantnuuewrij");
      console.log(this.restaurantes);
    }else{
      this.restaurantes = this.restaurantsPerfilService.obtenerRestaurantes();
    }
    const categorias = JSON.parse(localStorage.getItem('categorias')!);
    this.categorias = categorias;
    console.log("Categorias del componente");
    console.log(this.categorias);
    this.crear = false;
    this.nuevoRestauranteForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      cEmail: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', [Validators.required, 
        Validators.pattern(/^(\+\d{1,3})?[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/)]),
      ciudad: new FormControl('', Validators.required),
      bikeFriendly: new FormControl('', Validators.required)
    });
  }

  cambiarCrear(){
    this.crear = !this.crear;
  }

  nuevoRestaurante(){
    const nombre = this.nuevoRestauranteForm.get('nombre')?.value;
    const direccion = this.nuevoRestauranteForm.get('direccion')?.value;
    const city = this.nuevoRestauranteForm.get('ciudad')?.value;
    const tel = this.nuevoRestauranteForm.get('telefono')?.value;
    const email = this.nuevoRestauranteForm.get('cEmail')?.value;
    const bikeFriendly = this.nuevoRestauranteForm.get('bikeFriendly')?.value;
    console.log(`Se va a insertar nombre: ${nombre}, direccion: ${direccion}, email: ${email}`);
    this.restaurantsPerfilService.postRestaurante(nombre, direccion, city, tel, email, bikeFriendly);
  }

  onVisitarRestaurante(id:number){
    this.restaurantsPerfilService.visitarRestaurante(id);
  }

}

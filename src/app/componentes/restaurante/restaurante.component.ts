import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dish } from 'src/app/model/dish.model';
import { Restaurant } from 'src/app/model/restaurant.model';
import { RestaurantService } from 'src/app/services/restaurante.service';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { Category } from 'src/app/model/category.model';
import { ValoracionesComponent } from '../valoraciones/valoraciones.component';
import { Review } from 'src/app/model/review.model';

@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.css']
})
export class RestauranteComponent implements OnInit{
  restaurante: Restaurant = new Restaurant;
  r: Restaurant = new Restaurant;
  dishes: Dish[] = [];
  mio:boolean = false;
  logeado:boolean = false;
  crear:boolean = false;
  editar: boolean = false;
  dishForm!: FormGroup;
  reviewForm!: FormGroup;
  editarRestauranteForm!: FormGroup;
  categorias: Category[] = [];
  checkBorrar: boolean = false;
  checkEdicion: boolean = false;
  valoraciones: Review[] = [];
  valorar:boolean = false;
  usersName:string [] = [];

  constructor(private restaurantService: RestaurantService,
              private router: Router){}

  ngOnInit(): void {
    const rActual = JSON.parse(localStorage.getItem('restauranteActual')!);
    if(rActual){
      this.restaurante = JSON.parse(localStorage.getItem('restauranteActual')!);
    }else{
      this.restaurante = this.restaurantService.getRestaurante();
    }
    if(this.restaurante.idu == Number.parseInt(localStorage.getItem('idUser')!)){
      this.mio = true;
      this.logeado = true;
    }

    this.restaurantService.obtenerValoraciones(this.restaurante.id).subscribe(
      (valoraciones: Review[]) => {
        this.valoraciones = valoraciones;
        console.log("Las valoraciones son:");
        console.log(this.valoraciones);
      },
      (error) => {
        console.log("Error al obtener las valoraciones");
        console.log(error);
      }
    );
    
    
    this.restaurantService.setRestauranteCategorias(this.restaurante.id);
    this.restaurantService.setPlatos(this.restaurante.id);
    //Se espera un tiempo para que se puedan cargar todos los platos del restaurante
    setTimeout(() =>{
      this.dishes = this.restaurantService.getPlatos();
      this.categorias = this.restaurantService.getCategorias();
    }, 1000);
    
    this.dishForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)])
    });

    this.reviewForm = new FormGroup({
      review: new FormControl('', Validators.required),
      grade: new FormControl('', Validators.required)
    });

    this.editarRestauranteForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      cEmail: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', [Validators.required, 
        Validators.pattern(/^(\+\d{1,3})?[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/)]),
      ciudad: new FormControl('', Validators.required),
      bikeFriendly: new FormControl('', Validators.required),
      available: new FormControl('', Validators.required)
    });
  }

  setRestaurante(r: Restaurant){
    this.restaurantService.setRestaurante(r);
  }

  onCambiarBorrarRestaurante(){
    this.checkBorrar = !this.checkBorrar;
  }

  onBorrarRestaurante(){
    this.restaurantService.deleteRestaurante(this.restaurante.id);
    this.router.navigate(['/']);
  }

  onCambiarCrearPlato(){
    this.crear = !this.crear;
  }

  onAddDish(){
    if(this.dishForm.valid){
      this.restaurantService.addDish(this.dishForm.value.name, this.dishForm.value.price, this.dishForm.value.description, this.restaurante.id);
    }
  }

  onCambiarEditar(){
    this.editar = !this.editar;
  }

  onCambiarCheckEditar(){
    this.checkEdicion = !this.checkEdicion;
    this.r.name = this.editarRestauranteForm.get('nombre')?.value;
    this.r.address = this.editarRestauranteForm.get('direccion')?.value;
    this.r.city = this.editarRestauranteForm.get('ciudad')?.value;
    this.r.telephone = this.editarRestauranteForm.get('telefono')?.value;
    this.r.contactemail = this.editarRestauranteForm.get('cEmail')?.value;
    this.r.bikeFriendly = this.editarRestauranteForm.get('bikeFriendly')?.value;
    this.r.available = this.editarRestauranteForm.get('available')?.value;
  }

  onEditarRestaurante(){
    const nombre = this.editarRestauranteForm.get('nombre')?.value;
    const direccion = this.editarRestauranteForm.get('direccion')?.value;
    const city = this.editarRestauranteForm.get('ciudad')?.value;
    const tel = this.editarRestauranteForm.get('telefono')?.value;
    const email = this.editarRestauranteForm.get('cEmail')?.value;
    const bikeFriendly = this.editarRestauranteForm.get('bikeFriendly')?.value;
    const idRest = this.restaurante.id;
    const available = this.editarRestauranteForm.get('available')?.value;
    console.log(`Se va a editar nombre: ${nombre}, direccion: ${direccion}, email: ${email}`);
    this.restaurantService.editarRestaurante(nombre, direccion, tel, city, email, bikeFriendly, available, idRest);
  }

  cambiarValorar(){
    this.valorar = !this.valorar;
  }

  onPublicarValoracion(){
    this.restaurantService.publicarValoracion(this.restaurante.id, this.reviewForm.get('review')?.value, 
                                              this.reviewForm.get('grade')?.value);
  }

}



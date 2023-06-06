import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { DatosService } from 'src/app/services/datos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css', '../perfil.component.css']
})
export class DatosComponent implements OnInit{
  name!:string;
  surname!:string;
  email!:string;
  password!:string;
  modoEdicion: boolean = false;
  checkEdicion: boolean = false;
  userCheck: User = new User;
  cname!:string;
  csurname!:string;
  cpassword!:string;
  editarPerfilForm!: FormGroup;
  borrarCuenta: boolean = false;

  constructor(private datosService: DatosService,
              private router: Router){}

  ngOnInit(): void {
    this.name = localStorage.getItem('username')!;
    this.surname = localStorage.getItem('surname')!;
    this.email = localStorage.getItem('email')!;
    this.modoEdicion = false;
    this.editarPerfilForm = new FormGroup({
      cname: new FormControl('', Validators.required),
      csurname: new FormControl('', Validators.required),
      cpassword: new FormControl('', Validators.required)
    });
  }

  cambiarModoEdicion(){
    this.modoEdicion = !this.modoEdicion;
  }

  cambiarBorrarCuenta(){
    this.borrarCuenta = !this.borrarCuenta;
  }

  onEliminar(){
    const id = JSON.parse(localStorage.getItem('idUser')!) as number;
    this.datosService.eliminarCuenta(id);
  }

  onEditar(){
    this.datosService.editar(this.cname, this.csurname, this.cpassword);
  }

  onEditarCheckPerfil(){
      this.cname = this.editarPerfilForm.value.cname;
      this.csurname = this.editarPerfilForm.value.csurname;
      this.cpassword = this.editarPerfilForm.value.cpassword;
      this.checkEdicion = !this.checkEdicion;
  }

}

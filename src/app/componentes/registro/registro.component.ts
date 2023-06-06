import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{
  errorMessage:boolean = false;
  registroForm!: FormGroup;
  private pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z0-9]).{8,}$/;


  constructor(private registroService: RegistroService) {
    this.registroService.errorRegister.subscribe(
      (error:boolean) => {
        this.errorMessage = error;
      }
    )
  }

  ngOnInit(): void {
    this.registroForm = new FormGroup({
      cname: new FormControl('', Validators.required),
      csurname: new FormControl('', Validators.required),
      cemail: new FormControl('', Validators.required),
      cpassword: new FormControl('', [Validators.required, 
        Validators.pattern(this.pattern)])
    });
  }

  onRegistro() {
    const email = this.registroForm.get('cemail')?.value;
    const password = this.registroForm.get('cpassword')?.value;
    const nombre = this.registroForm.get('cname')?.value;
    const surname = this.registroForm.get('csurname')?.value;
    this.registroService.registrar(email, password, nombre, surname);
  }
}


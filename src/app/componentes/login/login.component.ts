import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/model/restaurant.model';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  emailF:string = "";
  passwordF:string = "";
  logeado: boolean = false;
  errorMessage:boolean = false;

  constructor(private loginService: LoginService){
    this.loginService.errorLogin.subscribe(
      (error:boolean) => {
        this.errorMessage = error;
      }
    )
  }

  ngOnInit(): void {
    
  }

  onLogin() {
    this.loginService.login(this.emailF, this.passwordF);
  }
  
}

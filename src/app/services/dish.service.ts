import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class DishService{
    
  private apiUrl = 'https://localhost:3000';
  private token = localStorage.getItem('token') as string;
    
  constructor(private httpClient: HttpClient,
        private router: Router){}

    borrarPlato(id:number){
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` }); 
        this.httpClient.delete(`${this.apiUrl}/plato/${id}`, { headers }).subscribe(
            (response) => {
                console.log(response);
                this.router.navigate(["/perfil"]);
            },
            (error) => {
                console.log(error);
            }
            );
    }
}
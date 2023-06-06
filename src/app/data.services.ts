import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Restaurant } from "./model/restaurant.model";
import { Router } from "@angular/router";

@Injectable()
export class DataServices{
    private apiUrl = 'https://localhost:3000';
    private token = localStorage.getItem('token');
    constructor(private httpClient: HttpClient,
        private router: Router){}

    //Obtener restaurantes
    cargarRestaurantes(){
        return this.httpClient.get(`${this.apiUrl}/restaurantes`);
    }

    //Crea un nuevo restaurante
    postRestaurantes(r: Restaurant){
        const registro = {
            campo1: r.name,
            campo2: r.address,
            campo3: r.telephone,
            campo4: localStorage.getItem('idUser'),
            campo5: 0,
            campo6: r.city,
            campo7: 0,
            campo8: r.contactemail,
            campo9: 0,
            campo10: r.bikeFriendly,
            campo11: 0
          };
        console.log("Restaurante a insertar");
        console.log(registro);
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` }); 
        return this.httpClient.post(`${this.apiUrl}/restaurantes`, registro, { headers }).subscribe(
            (response) => {
                console.log(response);
                this.router.navigate(["/perfil"]);
            },
            (error) => {
                console.log(error);
                this.router.navigate(["/"]);
            }
        );
        
    }

    //Actualiza un restaurante
    putRestaurante(r: Restaurant){
        const registro = {
            campo1: r.name,
            campo2: r.address,
            campo3: r.telephone,
            campo4: r.idu,
            campo5: r.gradesAverage,
            campo6: r.city,
            campo7: r.minPrice,
            campo8: r.contactemail,
            campo9: r.maxPrice,
            campo10: r.bikeFriendly,
            campo11: r.available,
            id: r.id
          };
        //console.log(registro);
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` }); 
        return this.httpClient.put(`${this.apiUrl}/restaurante/${r.id}`, registro, { headers }).subscribe(
            (response) => {
                console.log(response);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    borrarRestaurante(id: number){
        //console.log(registro);
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` }); 
        return this.httpClient.delete(`${this.apiUrl}/restaurante/${id}`, { headers }).subscribe(
            (response) => {
                console.log(response);
            },
            (error) => {
                console.log(error);
            }
        );
    }






}
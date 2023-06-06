import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { response } from "express";
import { Dish } from "../model/dish.model";

@Injectable()
export class SeguimientousuarioService{

    
    private apiUrl = 'https://localhost:3000';
    private token = localStorage.getItem('token') as string;
    private pedidos: Dish[] = [];

    constructor(private http: HttpClient){}

    obtenerNumeroPedidos(id:number){
        console.log("Obteniendo el numero de pedidos");
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
        return this.http.get(`${this.apiUrl}/pedidos/${id}`, {headers});
    }
}
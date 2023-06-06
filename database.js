const sqlite3 = require('sqlite3').verbose();
const path = require('path');

//Hay que poner la ruta completa de la base de datos, según donde almacena es una u otra
const db = new sqlite3.Database('D:/Uni/3ro/PI/Laboratorio/JustEat/HD.db');

module.exports = db;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.peliculaRoutes = void 0;
const express_1 = require("express");
const Pelicula_1 = require("../model/Pelicula");
const database_1 = require("../database/database");
class PeliculaRoutes {
    constructor() {
        this.getPeliculas = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield Pelicula_1.Peliculas.find();
                console.log(query);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
                console.log(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.nuevaPelicula = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre, recauentrada, numdias, recauotros, gastos, sueldoempleado, numempleados, numpers } = req.params;
            console.log(req.params);
            yield database_1.db.conectarBD();
            const dSchema = {
                _nombre: nombre,
                _recauentrada: parseInt(recauentrada),
                _numdias: parseInt(numdias),
                _recauotros: parseInt(recauotros),
                _gastos: parseInt(gastos),
                _sueldoempleado: parseInt(sueldoempleado),
                _numempleados: parseInt(numempleados),
                _numpers: parseInt(numpers)
            };
            const oSchema = new Pelicula_1.Peliculas(dSchema);
            yield oSchema.save()
                .then((doc) => {
                console.log('Salvado Correctamente: ' + doc);
                res.json(doc);
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.send('Error: ' + err);
            });
            // concatenando con cadena muestra sólo el mensaje
            yield database_1.db.desconectarBD();
        });
        this.getDiaGanado = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield Pelicula_1.Peliculas.findOne({ _nombre: nombre });
                if (query == null) {
                    console.log(query);
                    res.json({});
                }
                else {
                    const pelicula = new Pelicula_1.Pelicula(query._nombre, query._recauentrada, query._numdias, query._recauotros, query._gastos, query._sueldoempleado, query._numempleados);
                    pelicula.diaganado = query._numpers;
                    console.log(pelicula);
                    res.json({ "nombre": pelicula.nombre, "Ganado en ese dia": pelicula.diaganado() });
                }
            }))
                .catch((mensaje) => {
                res.send(mensaje);
                console.log(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.getTotalGanado = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield Pelicula_1.Peliculas.findOne({ _nombre: nombre });
                if (query == null) {
                    console.log(query);
                    res.json({});
                }
                else {
                    const pelicula = new Pelicula_1.Pelicula(query._nombre, query._recauentrada, query._numdias, query._recauotros, query._gastos, query._sueldoempleado, query._numempleados);
                    pelicula.totalganado = query._numpers;
                    console.log(pelicula);
                    res.json({ "nombre": pelicula.nombre, "Ganado en total": pelicula.totalganado() });
                }
            }))
                .catch((mensaje) => {
                res.send(mensaje);
                console.log(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.getPagoEmpleados = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield Pelicula_1.Peliculas.findOne({ _nombre: nombre });
                if (query == null) {
                    console.log(query);
                    res.json({});
                }
                else {
                    const pelicula = new Pelicula_1.Pelicula(query._nombre, query._recauentrada, query._numdias, query._recauotros, query._gastos, query._sueldoempleado, query._numempleados);
                    pelicula.costempleados = query._numpers;
                    console.log(pelicula);
                    res.json({ "nombre": pelicula.nombre, "Pagado a empleados": pelicula.costempleados() });
                }
            }))
                .catch((mensaje) => {
                res.send(mensaje);
                console.log(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.getGastoTotal = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield Pelicula_1.Peliculas.findOne({ _nombre: nombre });
                if (query == null) {
                    console.log(query);
                    res.json({});
                }
                else {
                    const pelicula = new Pelicula_1.Pelicula(query._nombre, query._recauentrada, query._numdias, query._recauotros, query._gastos, query._sueldoempleado, query._numempleados);
                    pelicula.gastostotal = query._numpers;
                    console.log(pelicula);
                    res.json({ "nombre": pelicula.nombre, "Total gastado": pelicula.gastostotal() });
                }
            }))
                .catch((mensaje) => {
                res.send(mensaje);
                console.log(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.getBeneficios = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield Pelicula_1.Peliculas.findOne({ _nombre: nombre });
                if (query == null) {
                    console.log(query);
                    res.json({});
                }
                else {
                    const pelicula = new Pelicula_1.Pelicula(query._nombre, query._recauentrada, query._numdias, query._recauotros, query._gastos, query._sueldoempleado, query._numempleados);
                    pelicula.beneficios = query._numpers;
                    console.log(pelicula);
                    res.json({ "nombre": pelicula.nombre, "Beneficios de la peli": pelicula.beneficios() });
                }
            }))
                .catch((mensaje) => {
                res.send(mensaje);
                console.log(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.getBorrar = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            yield database_1.db.conectarBD();
            yield Pelicula_1.Peliculas.findOneAndDelete({ _nombre: nombre }, (err, doc) => {
                if (err)
                    console.log(err);
                else {
                    if (doc == null) {
                        console.log(`No encontrado`);
                        res.send(`No encontrado`);
                    }
                    else {
                        console.log('Borrado correcto: ' + doc);
                        res.send('Borrado correcto: ' + doc);
                    }
                }
            });
            database_1.db.desconectarBD();
        });
        this.modifica = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            const { recauentrada, numdias, recauotros, gastos, sueldoempleado, numempleados, numpers } = req.body;
            yield database_1.db.conectarBD();
            yield Pelicula_1.Peliculas.findOneAndUpdate({ _nombre: nombre }, {
                _nombre: nombre,
                _recauentrada: recauentrada,
                _numdias: numdias,
                _recauotros: recauotros,
                _gastos: gastos,
                _sueldoempleado: sueldoempleado,
                _numempleados: numempleados,
                _numpers: numpers
            }, {
                new: true,
                runValidators: true // para que se ejecuten las validaciones del Schema
            })
                .then((docu) => {
                if (docu == null) {
                    console.log('La pelicula que desea modificar no existe');
                    res.json({ "Error": "No existe: " + nombre });
                }
                else {
                    console.log('Modificado Correctamente: ' + docu);
                    res.json(docu);
                }
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.json({ error: 'Error: ' + err });
            }); // concatenando con cadena muestra mensaje
            database_1.db.desconectarBD();
        });
        this._router = express_1.Router();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.get('/', this.getPeliculas);
        this._router.post('/nuevapeli', this.nuevaPelicula);
        this._router.get('/diaganado/:nombre', this.getDiaGanado);
        this._router.get('/totalganado/:nombre', this.getTotalGanado);
        this._router.get('/pagoempleados/:nombre', this.getPagoEmpleados);
        this._router.get('/gastototal/:nombre', this.getGastoTotal);
        this._router.get('/beneficios/:nombre', this.getBeneficios);
        this._router.get('/borrar/:nombre', this.getBorrar);
        this._router.post('/modifica/:nombre', this.modifica);
    }
}
const obj = new PeliculaRoutes();
obj.misRutas();
exports.peliculaRoutes = obj.router;

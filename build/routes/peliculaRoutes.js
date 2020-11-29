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
        // private getNuevaPelicula = async (req: Request, res: Response) => {
        //     const {nombre, recauentrada, numdias, recauotros, gastos,
        //         sueldoempleado, numeroempleados, numpers} = req.params
        //     console.log(req.params)
        //     await db.conectarBD()
        //     const schema = {
        //         _nombre: nombre,
        //         _recauentrada: recauentrada,
        //         _numdias: numdias,
        //         _recauotros: recauotros,
        //         _gastos: gastos,
        //         _sueldoempleado: sueldoempleado,
        //         _numeroempleados: numeroempleados,
        //         _numpers: numpers
        //     }
        //     const nSchema = new Peliculas(schema)
        //     await nSchema.save()
        //     .then((doc) => {
        //         console.log('Guardado correctamente: '+ doc)
        //         res.json(doc)
        //     })
        //     .catch((err: any) => {
        //         console.log(err)
        //         res.json(err)
        //     })    
        //     await db.desconectarBD()
        // } 
        this.nuevaPelicula = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre, recauentrada, numdias, recauotros, gastos, sueldoempleado, numeroempleados, numpers } = req.body;
            const schema = {
                _nombre: nombre,
                _recauentrada: recauentrada,
                _numdias: numdias,
                _recauotros: recauotros,
                _gastos: gastos,
                _sueldoempleado: sueldoempleado,
                _numeroempleados: numeroempleados,
                _numpers: numpers
            };
            const nSchema = new Pelicula_1.Peliculas(schema);
            yield database_1.db.conectarBD();
            yield nSchema.save()
                .then((doc) => {
                console.log(doc);
                res.json(doc);
            })
                .catch((err) => {
                console.log(err);
                res.json(err);
            });
            yield database_1.db.desconectarBD();
        });
        this.getDiaGanado = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield Pelicula_1.Peliculas.findOne({ _nombre: nombre });
                if (query == null) {
                    res.json({});
                }
                else {
                    const p = new Pelicula_1.Pelicula(query._nombre, query._recauentrada, query._numdias, query._recauotros, query._gastos, query._sueldoempleado, query._numeroempleados, query._numpers);
                    res.json({ "nombre": p._nombre, "Ganado en ese dia": p.diaganado() });
                }
            }));
            database_1.db.desconectarBD();
        });
        this.getTotalGanado = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield Pelicula_1.Peliculas.findOne({ _nombre: nombre });
                if (query == null) {
                    res.json({});
                }
                else {
                    const p = new Pelicula_1.Pelicula(query._nombre, query._recauentrada, query._numdias, query._recauotros, query._gastos, query._sueldoempleado, query._numeroempleados, query._numpers);
                    res.json({ "nombre": p._nombre, "Ganado en total": p.totalganado() });
                }
            }));
            database_1.db.desconectarBD();
        });
        this.getPagoEmpleados = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield Pelicula_1.Peliculas.findOne({ _nombre: nombre });
                if (query == null) {
                    res.json({});
                }
                else {
                    const p = new Pelicula_1.Pelicula(query._nombre, query._recauentrada, query._numdias, query._recauotros, query._gastos, query._sueldoempleado, query._numeroempleados, query._numpers);
                    res.json({ "nombre": p._nombre, "Pagado a empleados": p.costempleados() });
                }
            }));
            database_1.db.desconectarBD();
        });
        this.getGastoTotal = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield Pelicula_1.Peliculas.findOne({ _nombre: nombre });
                if (query == null) {
                    res.json({});
                }
                else {
                    const p = new Pelicula_1.Pelicula(query._nombre, query._recauentrada, query._numdias, query._recauotros, query._gastos, query._sueldoempleado, query._numeroempleados, query._numpers);
                    res.json({ "nombre": p._nombre, "Gasto total": p.gastostotal() });
                }
            }));
            database_1.db.desconectarBD();
        });
        this.getBeneficios = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield Pelicula_1.Peliculas.findOne({ _nombre: nombre });
                if (query == null) {
                    res.json({});
                }
                else {
                    const p = new Pelicula_1.Pelicula(query._nombre, query._recauentrada, query._numdias, query._recauotros, query._gastos, query._sueldoempleado, query._numeroempleados, query._numpers);
                    res.json({ "nombre": p._nombre, "Beneficios obtenidos": p.beneficios() });
                }
            }));
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
            const { recauentrada, numdias, recauotros, gastos, sueldoempleado, numeroempleados, numpers } = req.body;
            yield database_1.db.conectarBD();
            yield Pelicula_1.Peliculas.findOneAndUpdate({ _nombre: nombre }, {
                _nombre: nombre,
                _recauentrada: recauentrada,
                _numdias: numdias,
                _recauotros: recauotros,
                _gastos: gastos,
                _sueldoempleado: sueldoempleado,
                _numeroempleados: numeroempleados,
                _numpers: numpers
            }, {
                new: true,
                runValidators: true
            })
                .then((docu) => {
                console.log('Modificado Correctamente: ' + docu);
                res.json(docu);
            })
                .catch((err) => {
                console.log(err);
                res.json({ err });
            });
            yield database_1.db.desconectarBD();
        });
        this._router = express_1.Router();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.get('/', this.getPeliculas);
        // this._router.get('/nuevapelicula/:nombre&:recauentrada&:numdias&:recauotros&:gastos&:sueldoempleado&:numeroempleado&:numpers', this.getNuevaPelicula)
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

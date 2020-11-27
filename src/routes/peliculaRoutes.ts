import {Request, Response, Router } from 'express'
import { Peliculas, Pelicula, tPelicula } from '../model/Pelicula'
import { db } from '../database/database'

class PeliculaRoutes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }



    private getPeliculas = async (req: Request, res: Response) => {
        await db.conectarBD()
        .then( async (mensaje) => {
            console.log(mensaje)
            const query = await Peliculas.find()
            console.log(query)
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
            console.log(mensaje)
        })

        db.desconectarBD()

    }

    private nuevaPelicula = async (req: Request, res: Response) => {
        const { nombre, recauentrada, numdias, recauotros, gastos, sueldoempleado,
            numempleados, numpers } = req.params
        console.log(req.params)

        await db.conectarBD()
        const dSchema = {
            _nombre: nombre,
            _recauentrada: parseInt(recauentrada),
            _numdias: parseInt(numdias),
            _recauotros: parseInt(recauotros),
            _gastos: parseInt(gastos),
            _sueldoempleado: parseInt(sueldoempleado),
            _numempleados: parseInt(numempleados),
            _numpers: parseInt(numpers)
        }
        const oSchema = new Peliculas(dSchema)
        await oSchema.save()
        .then( (doc) => {
            console.log('Salvado Correctamente: '+ doc)
            res.json(doc)
        })
        .catch( (err: any) => {
            console.log('Error: '+ err)
            res.send('Error: '+ err)
        }) 
        // concatenando con cadena muestra sólo el mensaje
        await db.desconectarBD()
    } 

    private getDiaGanado = async (req: Request, res: Response) => {
        const { nombre } = req.params
        await db.conectarBD()
        .then( async (mensaje) => {
            console.log(mensaje)
            const query: any = await Peliculas.findOne({_nombre: nombre})
            if (query == null){
                console.log(query)
                res.json({})
            }else{
                const pelicula = new Pelicula(query._nombre, query._recauentrada, 
                    query._numdias, query._recauotros, query._gastos,
                    query._sueldoempleado, query._numempleados)
                pelicula.diaganado = query._numpers  
                console.log(pelicula)
                res.json({"nombre": pelicula.nombre, "Ganado en ese dia": pelicula.diaganado()})
            }
        })
        .catch((mensaje) => {
            res.send(mensaje)
            console.log(mensaje)
        })
        db.desconectarBD()
    }

    private getTotalGanado = async (req: Request, res: Response) => {
        const { nombre } = req.params
        await db.conectarBD()
        .then( async (mensaje) => {
            console.log(mensaje)
            const query: any = await Peliculas.findOne({_nombre: nombre})
            if (query == null){
                console.log(query)
                res.json({})
            }else{
                const pelicula = new Pelicula(query._nombre, query._recauentrada, 
                    query._numdias, query._recauotros, query._gastos,
                    query._sueldoempleado, query._numempleados)
                pelicula.totalganado = query._numpers 
                console.log(pelicula)
                res.json({"nombre": pelicula.nombre, "Ganado en total": pelicula.totalganado()})
            }
        })
        .catch((mensaje) => {
            res.send(mensaje)
            console.log(mensaje)
        })
        db.desconectarBD()
    }

    private getPagoEmpleados = async (req: Request, res: Response) => {
        const { nombre } = req.params
        await db.conectarBD()
        .then( async (mensaje) => {
            console.log(mensaje)
            const query: any = await Peliculas.findOne({_nombre: nombre})
            if (query == null){
                console.log(query)
                res.json({})
            }else{
                const pelicula = new Pelicula(query._nombre, query._recauentrada, 
                    query._numdias, query._recauotros, query._gastos,
                    query._sueldoempleado, query._numempleados)
                pelicula.costempleados = query._numpers
                console.log(pelicula)
                res.json({"nombre": pelicula.nombre, "Pagado a empleados": pelicula.costempleados()})
            }
        })
        .catch((mensaje) => {
            res.send(mensaje)
            console.log(mensaje)
        })
        db.desconectarBD()
    }

    private getGastoTotal = async (req: Request, res: Response) => {
        const { nombre } = req.params
        await db.conectarBD()
        .then( async (mensaje) => {
            console.log(mensaje)
            const query: any = await Peliculas.findOne({_nombre: nombre})
            if (query == null){
                console.log(query)
                res.json({})
            }else{
                const pelicula = new Pelicula(query._nombre, query._recauentrada, 
                    query._numdias, query._recauotros, query._gastos,
                    query._sueldoempleado, query._numempleados)
                pelicula.gastostotal = query._numpers
                console.log(pelicula)
                res.json({"nombre": pelicula.nombre, "Total gastado": pelicula.gastostotal()})
            }
        })
        .catch((mensaje) => {
            res.send(mensaje)
            console.log(mensaje)
        })
        db.desconectarBD()
    }

    private getBeneficios = async (req: Request, res: Response) => {
        const { nombre } = req.params
        await db.conectarBD()
        .then( async (mensaje) => {
            console.log(mensaje)
            const query: any = await Peliculas.findOne({_nombre: nombre})
            if (query == null){
                console.log(query)
                res.json({})
            }else{
                const pelicula = new Pelicula(query._nombre, query._recauentrada, 
                    query._numdias, query._recauotros, query._gastos,
                    query._sueldoempleado, query._numempleados)
                pelicula.beneficios = query._numpers
                console.log(pelicula)
                res.json({"nombre": pelicula.nombre, "Beneficios de la peli": pelicula.beneficios()})
            }
        })
        .catch((mensaje) => {
            res.send(mensaje)
            console.log(mensaje)
        })
        db.desconectarBD()
    }

    private getBorrar = async (req: Request, res: Response) => {
        const {nombre } = req.params
        await db.conectarBD()
        await Peliculas.findOneAndDelete(
            { _nombre: nombre }, 
            (err: any, doc) => {
                if(err) console.log(err)
                else{
                    if (doc == null) {
                        console.log(`No encontrado`)
                        res.send(`No encontrado`)
                    }else {
                        console.log('Borrado correcto: '+ doc)
                        res.send('Borrado correcto: '+ doc)
                    }
                }
            })
        db.desconectarBD()
    }

    private modifica = async (req: Request, res: Response) => {
        const { nombre } = req.params
        const { recauentrada, numdias, recauotros, gastos,
            sueldoempleado, numempleados, numpers  } = req.body
        await db.conectarBD()
        await Peliculas.findOneAndUpdate(
                { _nombre: nombre }, 
                {
                    _nombre: nombre,
                    _recauentrada: recauentrada,
                    _numdias: numdias,
                    _recauotros: recauotros,
                    _gastos: gastos,
                    _sueldoempleado: sueldoempleado,
                    _numempleados: numempleados,
                    _numpers: numpers
                },
                {
                    new: true,
                    runValidators: true // para que se ejecuten las validaciones del Schema
                }  
            )
            .then( (docu) => {
                    if (docu==null){
                        console.log('La pelicula que desea modificar no existe')
                        res.json({"Error":"No existe: "+nombre})
                    } else {
                        console.log('Modificado Correctamente: '+ docu) 
                        res.json(docu)
                    }
                    
                }
            )
            .catch( (err) => {
                console.log('Error: '+err)
                res.json({error: 'Error: '+err })
            }
            ) // concatenando con cadena muestra mensaje
        db.desconectarBD()
    }

    misRutas(){
        this._router.get('/', this.getPeliculas)
        this._router.post('/nuevapeli', this.nuevaPelicula)
        this._router.get('/diaganado/:nombre', this.getDiaGanado)
        this._router.get('/totalganado/:nombre', this.getTotalGanado)
        this._router.get('/pagoempleados/:nombre', this.getPagoEmpleados)
        this._router.get('/gastototal/:nombre', this.getGastoTotal)
        this._router.get('/beneficios/:nombre', this.getBeneficios)
        this._router.get('/borrar/:nombre', this.getBorrar)
        this._router.post('/modifica/:nombre', this.modifica)

    }
}

const obj = new PeliculaRoutes()
obj.misRutas()
export const peliculaRoutes = obj.router

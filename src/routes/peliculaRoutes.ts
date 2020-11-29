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


    private nuevaPelicula = async (req: Request, res: Response) => {
        const {nombre, recauentrada, numdias, recauotros, gastos,
            sueldoempleado, numeroempleados, numpers} = req.body
        const schema = {
            _nombre: nombre,
            _recauentrada: recauentrada,
            _numdias: numdias,
            _recauotros: recauotros,
            _gastos: gastos,
            _sueldoempleado: sueldoempleado,
            _numeroempleados: numeroempleados,
            _numpers: numpers
        }
        const nSchema = new Peliculas(schema)
        await db.conectarBD()
        await nSchema.save()
        .then((doc) => {
            console.log(doc)
            res.json(doc)
        })
        .catch((err: any) => {
            console.log(err)
            res.json(err)
        })    
        await db.desconectarBD()
    } 

    private getDiaGanado = async (req: Request, res: Response) => {
        const { nombre } = req.params
        await db.conectarBD()
        .then( async () => {
            const query: any = await Peliculas.findOne({_nombre: nombre})
            if (query == null){
                res.json({})
            }else{
                const p: any = new Pelicula(query._nombre, query._recauentrada, 
                    query._numdias, query._recauotros, query._gastos,
                    query._sueldoempleado, query._numeroempleados, query._numpers)
                res.json({"nombre": p._nombre, "Ganado en ese dia": p.diaganado()})
            }
        })
        db.desconectarBD()
    }

    private getTotalGanado = async (req: Request, res: Response) => {
        const { nombre } = req.params
        await db.conectarBD()
        .then( async () => {
            const query: any = await Peliculas.findOne({_nombre: nombre})
            if (query == null){
                res.json({})
            }else{
                const p: any = new Pelicula(query._nombre, query._recauentrada, 
                    query._numdias, query._recauotros, query._gastos,
                    query._sueldoempleado, query._numeroempleados, query._numpers)
                res.json({"nombre": p._nombre, "Ganado en total": p.totalganado()})
            }
        })
        db.desconectarBD()
    }

    private getPagoEmpleados = async (req: Request, res: Response) => {
        const { nombre } = req.params
        await db.conectarBD()
        .then( async () => {
            const query: any = await Peliculas.findOne({_nombre: nombre})
            if (query == null){
                res.json({})
            }else{
                const p: any = new Pelicula(query._nombre, query._recauentrada, 
                    query._numdias, query._recauotros, query._gastos,
                    query._sueldoempleado, query._numeroempleados, query._numpers)
                res.json({"nombre": p._nombre, "Pagado a empleados": p.costempleados()})
            }
        })
        db.desconectarBD()
    }

    private getGastoTotal = async (req: Request, res: Response) => {
        const { nombre } = req.params
        await db.conectarBD()
        .then( async () => {
            const query: any = await Peliculas.findOne({_nombre: nombre})
            if (query == null){
                res.json({})
            }else{
                const p: any = new Pelicula(query._nombre, query._recauentrada, 
                    query._numdias, query._recauotros, query._gastos,
                    query._sueldoempleado, query._numeroempleados, query._numpers)
                res.json({"nombre": p._nombre, "Gasto total": p.gastostotal()})
            }
        })
        db.desconectarBD()
    }

    private getBeneficios = async (req: Request, res: Response) => {
        const { nombre } = req.params
        await db.conectarBD()
        .then( async () => {
            const query: any = await Peliculas.findOne({_nombre: nombre})
            if (query == null){
                res.json({})
            }else{
                const p: any = new Pelicula(query._nombre, query._recauentrada, 
                    query._numdias, query._recauotros, query._gastos,
                    query._sueldoempleado, query._numeroempleados, query._numpers)
                res.json({"nombre": p._nombre, "Beneficios obtenidos": p.beneficios()})
            }
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
            sueldoempleado, numeroempleados, numpers  } = req.body
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
                    _numeroempleados: numeroempleados,
                    _numpers: numpers
                },
                {
                    new: true,
                    runValidators: true 
                }  
            )
            .then( (docu) => {
                console.log('Modificado Correctamente: '+ docu) 
                 res.json(docu)
            })
            .catch( (err) => {
                console.log(err)
                res.json({err})
            }
            ) 
        await db.desconectarBD()
    }

    misRutas(){
        this._router.get('/', this.getPeliculas)
        // this._router.get('/nuevapelicula/:nombre&:recauentrada&:numdias&:recauotros&:gastos&:sueldoempleado&:numeroempleado&:numpers', this.getNuevaPelicula)
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

import {Request, Response} from 'express'
import knex from '../database/connection'

class PointsController{
    
    public async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            longitude,
            latitude,
            city,
            uf,
            items,
        } = request.body

        try {
                    
            const trx = await knex.transaction()

            const point = {
                image: 'https://images.unsplash.com/photo-1573481078935-b9605167e06b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
                name,
                email,
                whatsapp,
                longitude,
                latitude,
                city,
                uf,
            }
        
            const insertedIds = await trx('points').insert(point)
        
            const point_ID = insertedIds[0]
        
            const pointItems = items.map((items_id: number) => {
                return {
                    items_id,
                    points_id: point_ID,
                }
            })
        
            await trx('point_items').insert(pointItems)

            await trx.commit()
        
            return response.json({
                id: point_ID,
                ...point,
            })

        } catch (err) {

            return response.status(400).json({message: 'Error on creating a new Point'})

        }
    }

    public async show(request: Request, response: Response){
        const { id } = request.params

        try {
            
            const point = await knex('points').where('id', id).first()

            if(!point) {
                return response.status(400).json({message: 'Point not found'})
            }

            const items = await knex('items')
                .join('point_items', 'items.id', '=', 'point_items.items_id')
                .where('point_items.points_id', id)
                .select('items.title')

            return response.json({point, items})

        } catch (err) {

            return response.status(400).json({message: 'Failure on found'})

        }
    }

    public async index(request: Request, response: Response) {
        const {city, uf, items} = request.query

        try {

            const parsedItems = String(items)
                .split(',')
                .map(item => Number(item.trim()))

            const points = await knex('points')
                .join('point_items','points.id', '=', 'point_items.points_id')
                .whereIn('point_items.items_id', parsedItems)
                .where('city', String(city))
                .where('uf', String(uf))
                .distinct()
                .select('points.*')

            return response.json(points)

        } catch (err) {

            return response.status(400).json({message: 'Failure on show a Point'})
        }
    }
}

export default new PointsController()
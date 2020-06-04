import { Request, Response } from 'express';

import knex from '../database/connection';
import PointRepository from '../repositories/PointRepository';

class PointController {

    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;
        
        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('item_point', 'points.id', '=', 'item_point.point_id')
            .whereIn('item_point.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        return response.json(points);
    }

    async show(request: Request, response: Response) {
        const {id} = request.params;
        const point = await knex('points').where('id', id).first();
        if (!point) {
            return response.status(400).json({ message: 'Point not found'});
        }
        const items = await knex('items')
            .join('item_point', 'items.id', '=', 'item_point.item_id')
            .where('item_point.point_id', id)
            .select('items.title');

        return response.json({
            ...point,
            items
        });
    }

    async store(request: Request, response: Response) {
        const pointRepository = new PointRepository();
        pointRepository.store(request.body);
        return response.json({ success: true });
    }
}

export default PointController;

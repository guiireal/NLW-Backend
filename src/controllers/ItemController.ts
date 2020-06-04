import { Request, Response } from 'express';

import knex from '../database/connection';
import IItem from '../interfaces/IITem';

class ItemController {
    async index(request: Request, response: Response) {
        const items = await knex('items').select('*');
        const serializedItems = items.map((item: IItem) => {
            return {
                ...items, 
                image_url: `https://blog.guiabolso.com.br/wp-content/uploads/2018/02/mercado-1-1024x681.jpg`
            }
        });
        return response.json(items);
    }
}

export default ItemController;
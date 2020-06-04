import knex from '../database/connection';

import IPoint from '../interfaces/IPoint';

class PointRepository {
    async store(point: IPoint) {
        const {items, ...pointInsert} = point;
        const trx = await knex.transaction();
        const [point_id] = await trx('points').insert({
            ...pointInsert,
            image: 'https://blog.guiabolso.com.br/wp-content/uploads/2018/02/mercado-1-1024x681.jpg',
        });
        const pointItems = items.map((item_id: Number) => {
            return {
                item_id,
                point_id
            }
        })
        await trx('item_point').insert(pointItems);
        await trx.commit();
    }
}

export default PointRepository;
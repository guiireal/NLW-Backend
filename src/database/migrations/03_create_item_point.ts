import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('item_point', table => {
        table.increments('id').primary();

        table.integer('item_id')
            .references('id').inTable('items')
            .notNullable();

        table.integer('point_id')
            .references('id').inTable('points')
            .notNullable().notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('items');
}
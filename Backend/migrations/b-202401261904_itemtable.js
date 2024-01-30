/**
 * Creates the 'products' table in the database.
 *
 * @param { import("knex").Knex } knex - Knex instance for database interaction.
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
    await knex.schema.createTable('products', (tbl) => {
        tbl.increments('productId').primary();
        tbl.integer('ownerId').unsigned().references('userId').inTable('users').onDelete('CASCADE');
        tbl.string('productName', 255).notNullable();
        tbl.text('productDescription').notNullable();
        tbl.integer('stockQuantity').unsigned().notNullable();
    });
};

/**
 * Drops the 'products' table from the database.
 *
 * @param { import("knex").Knex } knex - Knex instance for database interaction.
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('products');
};

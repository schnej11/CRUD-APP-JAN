/**
 * Migrate up function to create the 'users' table.
 *
 * @param { import("knex").Knex } knex - The Knex connection object.
 * @return { Promise<void> }
 */
exports.up = async (knex) => {
    await knex.schema.createTable('users', (tbl) => {
        tbl.increments();
        tbl.string('firstName', 255).notNullable();
        tbl.string('lastName', 255).notNullable();
        tbl.string('username', 255).notNullable().unique();
        tbl.string('password', 255).notNullable();
        tbl.boolean('isManager').defaultTo(false);
    });
};

/**
 * Migrate down function to drop the 'users' table.
 *
 * @param { import("knex").Knex } knex - The Knex connection object.
 * @return { Promise<void> }
 */
exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('users');
};

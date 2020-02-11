
exports.up = async (knex) => {
  await knex.schema.createTableIfNotExists('helper_user', (table) => {
     table.increments();
     table.string('email').notNullable().unique();
     table.string('password').notNullable();
     table.boolean('is_admin').defaultTo(false);
     table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('helper_user');
};

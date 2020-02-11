
exports.up = async (knex) => {
  await knex.schema.createTableIfNotExists('movies', (table) => {
      table.increments();
      table.string('title');
      table.string('genre');
      table.string('image');
      table.string('StartTime');
      table.string('Summary');
      table.timestamps(true, true);
  });

  await knex.schema.createTableIfNotExists('movie_scripts', (table) => {
      table.increments();
      table.integer('movie_id');
      table.foreign('movie_id').references('id').inTable('movies');
      table.integer('begin_at').notNullable();
      table.integer('end_at').notNullable();
      table.string('script');
      table.timestamps(true, true);
  });

  await knex.schema.createTableIfNotExists('teacher', (table) => {
      table.increments();
      table.string('name');
      table.date('adm');
      table.boolean('special');
  })
};

exports.down = async (knex) => {
    await knex.schema.dropTableIfExists("movie_scripts");
    await knex.schema.dropTableIfExists("movies");
    await knex.schema.dropTableIfExists("teacher");
};

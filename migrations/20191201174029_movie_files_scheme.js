
exports.up = async (knex) => {

  await knex.schema.createTableIfNotExists('movie_files' , (table) =>{
    table.increments();
    table.integer('movie_id');
    table.foreign('movie_id').references('id').inTable('movies');
    table.string('movie_name')
    table.string('movie_files_address').notNullable();
    table.timestamps(true, true);

  })

};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('movie_files');
};

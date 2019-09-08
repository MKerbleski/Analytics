exports.up = function(knex, Promise) {
  return knex.schema.createTable('portfolio', function(tbl){
      tbl.increments();
      tbl.json('data')
      tbl.timestamp('ts').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
};

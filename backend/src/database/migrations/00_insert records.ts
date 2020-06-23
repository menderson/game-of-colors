import Knex from 'knex'; //importa o tipo da variavel/biblioteca K maiusculo

export async function up(knex: Knex) { //função do typeScript, indica q knex é do tipo Knex;
   return knex.schema.createTable ('scores', table => {//ganhamos acesso a inteligencia do editor e ctrl+espaço mostra as funções disponiveis
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('score').nullable();
    table.integer('day').nullable();
    table.integer('month').nullable();
    table.integer('year').nullable();
    table.integer('hour').nullable();
    table.integer('minute').nullable();
   });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('scores');
    
}
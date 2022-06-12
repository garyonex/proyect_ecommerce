import knex from 'knex';

export default class Api {
    constructor(options, table) {
        this.knex = knex(options);
        this.table = table;
    }
    async findAll() {
        try {
            const todos = await this.knex.from(this.table).select('*');
            return todos;
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }
    async findById(id) {
        try {
            const elemento = await this.knex
                .from(this.table)
                .select('*')
                .where('id', id);
            return elemento;
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }

    async create(obj) {
        try {
            const nuevoElemento = await this.knex(this.table).insert(obj);
            return nuevoElemento;
        } catch (error) {
            throw new Error(`aqui el error: ${error}`);
        }
    }
    async deleteById(id) {
        try {
            const eliminadoElemento = await this.knex
                .from(this.table)
                .where('id', id)
                .del();
            return eliminadoElemento;
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }
    async deleteAll() {
        try {
            const eliminadoElemento = await this.knex.from(this.table).del();
            return eliminadoElemento;
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }
}

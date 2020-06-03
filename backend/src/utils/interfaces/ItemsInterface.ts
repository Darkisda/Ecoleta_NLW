import Knex from 'knex'

export default interface ItemsInterface extends Knex{
    id: Number,
    title: String,
    image: String
}
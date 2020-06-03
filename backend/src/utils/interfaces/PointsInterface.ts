import Knex from 'knex'

export default interface PointsInterface extends Knex {
    id: Number,
    image: String,
    name: String,
    email: String,
    whatsapp: String,
    city: String,
    uf: String,
    latitude: Number,
    longitude: Number,
}
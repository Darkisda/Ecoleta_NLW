import Knex from 'knex'

export default interface ConnectionInterface extends Knex{
    client: String,
    connection : {
        filename: String
    }
}

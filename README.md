# Analytics

HEROKU COMMANDS 

    heroku logs --tail -a sticky-backend
    heroku run knex migrate:latest -a sticky-backend
    heroku run knex seed:run -a yourappname
    knex migrate:rollback
    knex migrate:latest
    knex migrate:make 
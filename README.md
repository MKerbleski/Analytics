# Analytics

HEROKU COMMANDS 

    heroku logs --tail -a analytics-mjk
    heroku run knex migrate:latest -a analytics-mjk
    heroku run knex seed:run -a analytics-mjk
    knex migrate:rollback
    knex migrate:latest
    knex migrate:make 
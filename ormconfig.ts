const path = process.env.NODE_ENV === 'dev' ? 'src' : 'dist';

module.exports = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  entities: [`./${path}/modules/**/infra/typeorm/entities/*{.ts, .js}`],
  migrations: [`./${path}/shared/infra/typeorm/migrations/*{.ts, .js}`],
  cli: {
    migrationsDir: `./${path}/shared/infra/typeorm/migrations`,
  },
};

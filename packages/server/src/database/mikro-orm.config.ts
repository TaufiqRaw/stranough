import { Options, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { Migrator } from "@mikro-orm/migrations";
import dotenv from 'dotenv';
import * as Constants from "../constants";
import { GuitarModelCleanup } from "../entities/subscribers/guitar-model-cleanup";
dotenv.config({
  path : Constants.envPath
});

const config : Options = {
    driver : PostgreSqlDriver,
    timezone: '+07:00',
    dbName : process.env.DB_NAME || 'backend',
    port : parseInt(process.env.DB_PORT || '5432'),
    user : process.env.DB_USER || 'postgres',
    password : process.env.DB_PASS || 'postgres',
    host : process.env.DB_HOST || 'localhost',
    entities: ['dist/entities/*'],
    entitiesTs: ['src/entities/*'],
    extensions : [Migrator],
    // subscribers : [new GuitarBodyUpdateCleanup(), new GuitarModelUpdateCleanup(), new GuitarModelDeleteCleanup()],
    // subscribers : [new GuitarModelCleanup()],
    metadataProvider: TsMorphMetadataProvider,
    migrations: {
      path: 'dist/database/migrations',
      pathTs: 'src/database/migrations',
    },
    seeder:{
      path: 'dist/database/seeders',
      pathTs: 'src/database/seeders'
    }
};

export default config;
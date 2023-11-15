import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "micro_auth",
    synchronize: true,
    logging: false,
    entities: ["entity/*ts"],
    migrations: [],
    subscribers: [],
})
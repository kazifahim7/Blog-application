import { Server } from 'http';


import mongoose from 'mongoose';
import config from './app/config';
import app from './app';

let server: Server;

async function main() {
    try {
        const connect = await mongoose.connect(config.database_url as string);
        if (connect) {
            console.log('success');
        }
        server = app.listen(config.port, () => {
            console.log(`Example app listening on port ${config.port}`);
        });
    } catch (error) {
        console.log(error);
    }
}
main();

process.on("unhandledRejection", () => {
    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }
    process.exit(1)
})

process.on("uncaughtException", () => {
    process.exit(1)
})

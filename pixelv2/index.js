import Fastify from "fastify";
import fastifyStatic from "fastify-static";
import path from "path";
import { fileURLToPath } from "url";

const dirname = path.dirname(fileURLToPath(import.meta.url));


const fastify = Fastify({
    logger: true
})

fastify.register(fastifyStatic, {
    root: path.join(dirname, "public")
})

fastify.listen({
    port: process.env.PORT || 3000
}, (err, adress) =>{
    if(err) {
        console.log("Error starting server", err)
        return;
    }
    console.log("Server started")
})
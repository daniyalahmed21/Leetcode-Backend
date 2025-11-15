import Fastify from "fastify";
import App from "./src/app.js";
import fastifyEnv from "@fastify/env";
import schema from "./src/config/server-config.js";

const fastify = Fastify({ logger: true });

const start = async () => {
  try {
    await fastify.register(fastifyEnv, {
      confKey: "config",
      schema: schema,
      dotenv: true,
    });

    await fastify.register(App);
    await fastify.ready();
    console.log(fastify.printRoutes());

    const port = fastify.config.PORT || 3000;
    await fastify.listen({ port });

    fastify.log.info(`Server listening on port ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

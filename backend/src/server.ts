import Fastify from "fastify";
import cors from "@fastify/cors";

import "./db/database";
import { appRoutes } from "./routes/apps";

const app = Fastify({
  logger: true,
});

async function start() {
  try {
    await app.register(cors, {
      origin: process.env.CLIENT_URL ?? "http://localhost:5173",
    });

    await app.register(appRoutes, {
      prefix: "/api/apps",
    });

    app.get("/health", async () => {
      return {
        status: "ok",
      };
    });

    const port = Number(process.env.PORT ?? 3000);

    await app.listen({
      port,
      host: "0.0.0.0",
    });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

start();
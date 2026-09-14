import type { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";

import { db } from "../db/database";
import {
  createAppSchema,
  updateAppSchema,
} from "../schemas/app";

interface AppParams {
  id: string;
}

export async function appRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    return db
      .prepare(`
        SELECT
          id,
          name,
          url,
          icon,
          position
        FROM apps
        ORDER BY position ASC, created_at ASC
      `)
      .all();
  });

  app.post("/", async (request, reply) => {
    const result = createAppSchema.safeParse(request.body);

    if (!result.success) {
      return reply.status(400).send({
        message: "Dados inválidos.",
        errors: result.error.flatten(),
      });
    }

    const id = randomUUID();

    const lastPosition = db
      .prepare(`
        SELECT COALESCE(MAX(position), -1) as position
        FROM apps
      `)
      .get() as { position: number };

    const position = lastPosition.position + 1;

    const icon = result.data.icon || null;

    db.prepare(`
      INSERT INTO apps (
        id,
        name,
        url,
        icon,
        position
      )
      VALUES (?, ?, ?, ?, ?)
    `).run(
      id,
      result.data.name,
      result.data.url,
      icon,
      position,
    );

    const createdApp = db
      .prepare(`
        SELECT
          id,
          name,
          url,
          icon,
          position
        FROM apps
        WHERE id = ?
      `)
      .get(id);

    return reply.status(201).send(createdApp);
  });

  app.put<{ Params: AppParams }>(
    "/:id",
    async (request, reply) => {
      const result = updateAppSchema.safeParse(request.body);

      if (!result.success) {
        return reply.status(400).send({
          message: "Dados inválidos.",
          errors: result.error.flatten(),
        });
      }

      const currentApp = db
        .prepare(`
          SELECT *
          FROM apps
          WHERE id = ?
        `)
        .get(request.params.id) as
        | {
            id: string;
            name: string;
            url: string;
            icon: string | null;
          }
        | undefined;

      if (!currentApp) {
        return reply.status(404).send({
          message: "Aplicativo não encontrado.",
        });
      }

      const name = result.data.name ?? currentApp.name;
      const url = result.data.url ?? currentApp.url;

      const icon =
        result.data.icon !== undefined
          ? result.data.icon || null
          : currentApp.icon;

      db.prepare(`
        UPDATE apps
        SET
          name = ?,
          url = ?,
          icon = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(
        name,
        url,
        icon,
        request.params.id,
      );

      const updatedApp = db
        .prepare(`
          SELECT
            id,
            name,
            url,
            icon,
            position
          FROM apps
          WHERE id = ?
        `)
        .get(request.params.id);

      return updatedApp;
    },
  );

  app.delete<{ Params: AppParams }>(
    "/:id",
    async (request, reply) => {
      const result = db
        .prepare(`
          DELETE FROM apps
          WHERE id = ?
        `)
        .run(request.params.id);

      if (result.changes === 0) {
        return reply.status(404).send({
          message: "Aplicativo não encontrado.",
        });
      }

      return reply.status(204).send();
    },
  );
}
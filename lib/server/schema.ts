import { z } from "@hono/zod-openapi"
import openAPIJSON from "@specs/openapi.json"

export type paths = keyof (typeof openAPIJSON)["paths"];

export const requestBodySchemaList = {
  "/html2pdf/export": z.object({
    html: z.string().min(1),
  }),
} satisfies Record<paths, unknown>

export const errorResponseSchemaList = {
  "/html2pdf/export": z
    .object({
      message: z.string().min(1),
    })
    .openapi({
      example: {
        message: "HTML property is invalid.",
      },
    }),
} satisfies Record<paths, unknown>

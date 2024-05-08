import { createRoute } from "@hono/zod-openapi"
import { errorResponseSchemaList, paths, requestBodySchemaList } from "./schema"

export const HTML2PDFRoute = createRoute({
  path: "/html2pdf/export" as paths,
  method: "post",
  description: "HTMLをPDFに変換したデータを返す",
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: requestBodySchemaList["/html2pdf/export"],
        },
      },
    },
  },
  responses: {
    200: {
      description: "HTMLをPDFに変換したデータを返す",
      content: {
        "application/pdf": {
          schema: {
            type: "string",
            format: "binary",
          },
        },
      },
    },
    400: {
      description: "HTMLプロパティの値が不正な時に返す",
      content: {
        "application/json": {
          schema: errorResponseSchemaList["/html2pdf/export"],
        },
      },
    },
  },
})

import { OpenAPIHono } from "@hono/zod-openapi"
import openAPIJSON from "@specs/openapi.json"
import { swaggerUI } from "@hono/swagger-ui"
import { HTML2PDFRoute } from "./route"

const app = new OpenAPIHono()

app
  .openapi(
    HTML2PDFRoute,
    // @ts-ignore バイナリを型安全で返す方法が分からないので一旦ignore
    (c) => {
      const { html } = c.req.valid("json")
      return c.body("hoge", 200, {
        "content-type": "application/pdf",
      })
    },
    (result, c) => {
      if (!result.success) {
        return c.json(
          {
            code: 400,
            message: "html property is invalid.",
          },
          400
        )
      }
    }
  )
  .doc("/doc", openAPIJSON)

app.get(
  "/ui",
  swaggerUI({
    url: "/doc",
  })
)

export default app

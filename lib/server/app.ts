import { OpenAPIHono } from "@hono/zod-openapi"
import openAPIJSON from "@specs/openapi.json"
import { swaggerUI } from "@hono/swagger-ui"
import { HTML2PDFRoute } from "./route"
import { Env } from "./type"
import { browserMiddleware } from "./middleware/browser"

const app = new OpenAPIHono<Env>()

app.use(browserMiddleware)

app
  .openapi(
    HTML2PDFRoute,
    // @ts-ignore バイナリを型安全で返す方法が分からないので一旦ignore
    async (c) => {
      const { html, option } = c.req.valid("json")
      const { browser } = c.var
      const page = await browser.newPage()
      await page.setContent(html)
      // 21cm * 29.7cm
      const pdfBuffer = await page.pdf({
        printBackground: true,
        scale: option?.scale,
      })
      return c.body(pdfBuffer, 200, {
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

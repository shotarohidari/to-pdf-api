import { createMiddleware } from "hono/factory"
import chromium from "@sparticuz/chromium"
import playwright from "playwright"

type Env = {
  Variables: {
    browser: playwright.Browser
  }
}

export const browserMiddleware = createMiddleware<Env>(async (c, next) => {
  const executablePath = await chromium.executablePath()
  const browser = await playwright.chromium.launch({
    args: chromium.args,
    executablePath,
  })
  c.set("browser",browser);
  await next()
})

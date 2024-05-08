import { createMiddleware } from "hono/factory"
import chromium from "@sparticuz/chromium"
import playwright from "playwright"
import { Env } from "../type"

export const browserMiddleware = createMiddleware<Env>(async (c, next) => {
  // https://github.com/Sparticuz/chromium/issues/63#issuecomment-1485133075
  const executablePath = process.env.AWS_EXECUTION_ENV
    ? await chromium.executablePath()
    : playwright.chromium.executablePath()
  const browser = await playwright.chromium.launch({
    args: chromium.args,
    executablePath,
  })
  c.set("browser", browser)
  await next()
})

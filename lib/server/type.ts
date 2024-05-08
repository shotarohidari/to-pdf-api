import playwright from "playwright"

export type Env = {
  Variables: {
    browser: playwright.Browser
  }
}

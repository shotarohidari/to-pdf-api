import { serve } from "@hono/node-server"
import app from "./app"


const port = 9876
serve(
  {
    port,
    fetch: app.fetch,
  },
  () => {
    console.log(`http://localhost:${port} is running.`)
  }
);

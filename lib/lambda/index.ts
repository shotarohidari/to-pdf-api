import { handle } from "hono/aws-lambda";
import app from "../server/app";

export const handler = handle(app);
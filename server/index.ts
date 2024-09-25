import { Hono } from "hono"
import { cors } from "hono/cors"
import { serveStatic } from "hono/bun"

const app = new Hono()

app.use("*", serveStatic({ root: "../frontend/dist" }))
app.use("*", serveStatic({ root: "../frontend/dist/index.html" }))

app.use('*', cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true,
}))

const api = app.basePath('/api/')
console.log("Hono API listening")

api.get("/", (c) => {
  return c.json({
    message: [  "hello from hono" ],
  });
});


api.post('/echo', async (c) => {
  const body = await c.req.json()
  const reversedMessage = body.message.split('').reverse().join('');
  return c.json({ message: reversedMessage });
})


export type Api = typeof api

export default app

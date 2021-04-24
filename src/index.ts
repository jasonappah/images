import express from "express";
const fetch = require("node-fetch");

const app = express();
const port = process.env.PORT || 3333;
const src = process.env.SRC_URL;

const ts = () => new Date().toLocaleString();
const logger = (msg: string, func: any) => func(ts(), msg);
const log = (msg: string) => logger(msg, console.log);
const err = (msg: string) => logger(msg, console.error);

try {
  app.get("/", async (req: express.Request, res: express.Response) => {
    res.json({
      yo: "hi",
      socials: {
        web: "https://jasonaa.me",
        twitter: "https://jasonaa.me/t",
        github: "https://jasonaa.me/g",
      },
      src: "https://jasonaa.me/g/images",
    });
  });

  app.get("*", async (req: express.Request, res: express.Response) => {
    const url = src + req.originalUrl;
    log(`Proxying ${url}...`);
    const dl = await fetch(url);
    res.end(Buffer.from(await dl.arrayBuffer()));
  });

  app.listen(port, () => {
    log(`⚡ Proxying all requests from http://localhost:${port} to ${src}`);
  });
} catch (e) {
  err(e);
}

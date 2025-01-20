import express from "express";
import fs from "fs/promises";

const app = express();

app.get("/", async (req, res) => {
    const buf = await fs.readFile("index.html");
    const html = buf.toString();

    res.send(html);
})

app.get("/about", async (req, res) => {
    const buf = await fs.readFile('about.html');
    const html = buf.toString();

    res.send(html);
})

app.get('/kids', async (req, res) => {
  const buf = await fs.readFile('kids.html');
  const html = buf.toString();

  res.send(html);
});

app.use("/static", express.static("./static"));
app.use('/data', express.static('./public/data'));
app.use('/img', express.static('./public/img'));

app.listen(5080);
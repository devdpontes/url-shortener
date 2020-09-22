import { fileURLToPath } from "url";
import path, { dirname } from "path";
import express from "express";
import bodyParser from "body-parser";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync.js";
import { nanoid } from "nanoid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = low(new FileSync("db.json"));
const isDbCreated = db.has("urls").value();

if (!isDbCreated) {
  db.defaults({ urls: {} }).write();
}

const app = express();
const port = 8000;
const router = express.Router();

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded
app.use(router);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

function handleUrlPost(req, res) {
  const url = req.body.url;
  const id = `u${nanoid(10)}`;
  db.set(`urls.${id}`, url).write();
  res.render("submitted", { shortUrl: `http://localhost:${port}/${id}` });
}

function handleUrlGet(req, res) {
  const { slug } = req.params;
  const savedUrl = db.get(`urls.${slug}`).value();

  if (savedUrl) {
    res.redirect(savedUrl);
  } else {
    res.render("404");
  }
}

function serveIndex(req, res) {
  res.render("index");
}

router.post("/short", handleUrlPost);
router.get("/:slug", handleUrlGet);
router.get("/", serveIndex);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));

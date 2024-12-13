// Definisi Library yang digunakan
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const flash = require("req-flash");
const app = express();

// Definisi lokasi file router (Pindahkan ke sini)
const loginRoutes = require("./src/routes/router-login");
const registerRoutes = require("./src/routes/router-register");
const contactRoutes = require("./src/routes/router-contact");
const appRoutes = require("./src/routes/router-app");
const todoRoutes = require("./src/routes/router-todo");

// Menyajikan folder public sebagai file statis
app.use(express.static(path.join(__dirname, 'src', 'public')));

// Konfigurasi library session
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "t@1k0ch3ng",
    name: "secretName",
    cookie: {
      sameSite: true,
      maxAge: 60000,
    },
  })
);

// Konfigurasi dan gunakan library
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());

// Set header cache
app.use(function (req, res, next) {
  res.setHeader(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  res.setHeader("Pragma", "no-cache");
  next();
});

// Setting folder views
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

// Gunakan routes yang telah didefinisikan
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);
app.use("/contact", contactRoutes);
app.use("/", appRoutes);
app.use("/todo", todoRoutes);

// Halaman utama dengan pengecekan sesi
app.get("/", (req, res) => {
  if (req.session && req.session.username) {
    res.render("index", { username: req.session.username }); // Ganti dengan data sesuai kebutuhan
  } else {
    res.redirect("/login");  // Jika tidak ada sesi username, arahkan ke halaman login
  }
});

// Gunakan port server
app.listen(5050, () => {
  console.log("Server Berjalan di Port : " + 5050);
});

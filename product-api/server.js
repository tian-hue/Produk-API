const express = require("express");
const helmet = require("helmet"); // Tambahkan ini
const app = express();
const productRoutes = require("./routes/product.routes");
const sequelize = require("./config/database");
require("dotenv").config();

app.use(express.json());
// Gunakan helmet dengan konfigurasi CSP
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'none'"],
      imgSrc: ["'self'"], // Izinkan gambar dari server itu sendiri
    },
  })
);
app.use("/api/products", productRoutes);

sequelize.sync({ force: true }).then(() => {
  console.log("Database terhubung & tabel siap.");
  app.listen(process.env.PORT, () => {
    console.log(`Server berjalan di http://localhost:${process.env.PORT}`);
  });
}).catch(err => {
  console.error("Gagal menyinkronkan database:", err);
});
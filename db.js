const mysql = require("mysql2");

const connection = mysql.createConnection({
  host:     process.env.DB_HOST     || "localhost",
  user:     process.env.DB_USER     || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME     || "inventario_electronico",
});

connection.connect((err) => {
  if (err) {
    console.error("❌ Error de conexión a MySQL:", err);
    process.exit(1);
  }
  console.log("✅ Conectado a:", process.env.DB_NAME || "inventario_electronico");
});

module.exports = connection;
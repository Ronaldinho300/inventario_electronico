const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // XAMPP por defecto
  database: "inventario_electronico", // 👈 AQUÍ está la clave
});

connection.connect((err) => {
  if (err) {
    console.error("Error de conexión:", err);
    return;
  }
  console.log("Conectado a la base de datos inventario_electronico");
});

module.exports = connection;
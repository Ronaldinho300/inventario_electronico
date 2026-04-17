const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",              // XAMPP por defecto no tiene contraseña
  database: "inventario_electronico",
});

connection.connect((err) => {
  if (err) {
    console.error("Error de conexión a MySQL:", err);
    process.exit(1);         // Detener el servidor si no hay BD
  }
  console.log("✅ Conectado a la base de datos inventario_electronico");
});

module.exports = connection;
const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "inventario_electronico",
});

// 👉 CREAR producto
app.post("/productos", (req, res) => {
  const { nombre, precio, stock } = req.body;
  db.query(
    "INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)",
    [nombre, precio, stock],
    (err, result) => {
      if (err) throw err;
      res.send("Producto agregado");
    }
  );
});

// 👉 LEER productos
app.get("/productos", (req, res) => {
  db.query("SELECT * FROM productos", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// 👉 ACTUALIZAR
app.put("/productos/:id", (req, res) => {
  const { nombre, precio, stock } = req.body;
  const { id } = req.params;

  db.query(
    "UPDATE productos SET nombre=?, precio=?, stock=? WHERE id=?",
    [nombre, precio, stock, id],
    (err) => {
      if (err) throw err;
      res.send("Producto actualizado");
    }
  );
});

// 👉 ELIMINAR
app.delete("/productos/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM productos WHERE id=?", [id], (err) => {
    if (err) throw err;
    res.send("Producto eliminado");
  });
});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
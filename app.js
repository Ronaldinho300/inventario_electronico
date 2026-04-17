const express = require("express");
const path = require("path");
const db = require("./db");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// 👉 Ruta base — sirve index.html desde /public
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ──────────────────────────────────────────────────────────
// CRUD PRODUCTOS
// ──────────────────────────────────────────────────────────

// 👉 CREAR producto
app.post("/productos", (req, res) => {
  const { nombre, descripcion, precio, stock } = req.body;

  if (!nombre || precio === undefined || stock === undefined) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const sql =
    "INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)";

  db.query(sql, [nombre, descripcion || null, precio, stock], (err, result) => {
    if (err) {
      console.error("Error al insertar:", err);
      return res.status(500).json({ error: "Error al insertar producto" });
    }
    res.status(201).json({ mensaje: "Producto agregado", id: result.insertId });
  });
});

// 👉 LEER todos los productos
app.get("/productos", (req, res) => {
  db.query("SELECT * FROM productos ORDER BY id DESC", (err, result) => {
    if (err) {
      console.error("Error al obtener:", err);
      return res.status(500).json({ error: "Error al obtener productos" });
    }
    res.json(result);
  });
});

// 👉 LEER un producto por ID
app.get("/productos/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM productos WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error en consulta:", err);
      return res.status(500).json({ error: "Error en la consulta" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(result[0]);
  });
});

// 👉 ACTUALIZAR producto
app.put("/productos/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, stock } = req.body;

  if (!nombre || precio === undefined || stock === undefined) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const sql =
    "UPDATE productos SET nombre=?, descripcion=?, precio=?, stock=? WHERE id=?";

  db.query(sql, [nombre, descripcion || null, precio, stock, id], (err, result) => {
    if (err) {
      console.error("Error al actualizar:", err);
      return res.status(500).json({ error: "Error al actualizar" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json({ mensaje: "Producto actualizado" });
  });
});

// 👉 ELIMINAR producto
app.delete("/productos/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM productos WHERE id=?", [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar:", err);
      return res.status(500).json({ error: "Error al eliminar" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json({ mensaje: "Producto eliminado" });
  });
});

// 🚀 Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
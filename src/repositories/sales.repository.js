import pool from "../db.js";

export async function findAllSales() {
  const [rows] = await pool.query(`
    SELECT id, name, price, delivery, price + delivery AS total
    FROM sales
    ORDER BY id ASC
  `);

  return rows;
}

export async function findSaleById(id) {
  const [rows] = await pool.query(
    `
      SELECT id, name, price, delivery, price + delivery AS total
      FROM sales
      WHERE id = ?
    `,
    [id],
  );

  return rows[0] ?? null;
}

export async function insertSale({ name, price, delivery }) {
  const [result] = await pool.query(
    `
      INSERT INTO sales (name, price, delivery)
      VALUES (?, ?, ?)
    `,
    [name, price, delivery],
  );

  return await findSaleById(result.insertId);
}

export async function updateSaleById(id, { name, price, delivery }) {
  const [result] = await pool.query(
    `
      UPDATE sales
      SET name = ?, price = ?, delivery = ?
      WHERE id = ?
    `,
    [name, price, delivery, id],
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return await findSaleById(id);
}

export async function deleteSaleById(id) {
  const [result] = await pool.query(
    `
      DELETE FROM sales
      WHERE id = ?
    `,
    [id],
  );

  return result.affectedRows > 0;
}

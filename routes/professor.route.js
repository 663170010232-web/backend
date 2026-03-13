import { Router } from "express";
import pool from "../config/pg.js";
const pRouter = Router();

pRouter.get("/get-all-professors", async (req, res) => {
  try {
    const query = `SELECT * FROM professors ORDER BY id ASC`;
    const result = await pool.query(query);

    res.status(200).json({
      message: "ดึงข้อมูลอาจารย์สำเร็จ",
      total: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "เกิดข้อผิดพลาดในการดึงข้อมูลอาจารย์",
    });
  }
});

// Get professor by ID
pRouter.get("/get-professor/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = `SELECT * FROM professors WHERE id = $1`;
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "ไม่พบข้อมูลอาจารย์",
      });
    }

    res.status(200).json({
      message: "ดึงข้อมูลอาจารย์สำเร็จ",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "เกิดข้อผิดพลาดในการดึงข้อมูลอาจารย์",
    });
  }
});

pRouter.post("/create-professor", async (req, res) => {
  try {
    const { fullname, tel, username, password } = req.body;

    const query = `
      INSERT INTO professors (fullname, tel, username, password)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const result = await pool.query(query, [fullname, tel, username, password]);

    res.status(200).json({
      message: "เพิ่มข้อมูลอาจารย์สำเร็จ",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "เกิดข้อผิดพลาดในการเพิ่มข้อมูลอาจารย์",
    });
  }
});

// Update professor
pRouter.put("/update-professor/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, tel, username, password } = req.body;

    const query = `
      UPDATE professors 
      SET fullname = $1, tel = $2, username = $3, password = $4
      WHERE id = $5
      RETURNING *
    `;

    const result = await pool.query(query, [
      fullname,
      tel,
      username,
      password,
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "ไม่พบข้อมูลอาจารย์",
      });
    }

    res.status(200).json({
      message: "แก้ไขข้อมูลอาจารย์สำเร็จ",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "เกิดข้อผิดพลาดในการแก้ไขข้อมูลอาจารย์",
    });
  }
});

// Delete professor
pRouter.delete("/delete-professor/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = `DELETE FROM professors WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "ไม่พบข้อมูลอาจารย์",
      });
    }

    res.status(200).json({
      message: "ลบข้อมูลอาจารย์สำเร็จ",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "เกิดข้อผิดพลาดในการลบข้อมูลอาจารย์",
    });
  }
});

export default pRouter;

import { Router } from "express";
import pool from "../config/pg.js";
const dbRouter = Router();

dbRouter.get("/get-dashboard-stats", async (req, res) => {
  try {
    // Count students
    const studentsCount = await pool.query(
      `SELECT COUNT(*) as total FROM students`,
    );

    // Count professors
    const professorsCount = await pool.query(
      `SELECT COUNT(*) as total FROM professors`,
    );

    // Count courses
    const coursesCount = await pool.query(
      `SELECT COUNT(*) as total FROM courses`,
    );

    res.status(200).json({
      message: "ดึงข้อมูลสถิติสำเร็จ",
      data: {
        totalStudents: parseInt(studentsCount.rows[0].total),
        totalProfessors: parseInt(professorsCount.rows[0].total),
        totalCourses: parseInt(coursesCount.rows[0].total),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "เกิดข้อผิดพลาดในการดึงข้อมูลสถิติ",
    });
  }
});

export default dbRouter;

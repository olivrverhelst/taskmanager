import express from 'express'
import sqlite3 from 'sqlite3'
import cors from 'cors'
import { open } from 'sqlite'

const app = express()
app.use(cors())
app.use(express.json())

// Start app only after DB is ready
const startServer = async () => {
  const db = await open({
    filename: './mydatabase.db',
    driver: sqlite3.Database,
  })

  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      due_date TEXT,
      duration_value INTEGER,
      duration_unit TEXT,
      completed BOOLEAN DEFAULT 0,
      completed_at TEXT
    )
  `)

  app.get('/', (req, res) => {
    res.send('Backend is running!')
  })

  // GET tasks
  app.get('/tasks', async (req, res) => {
    const tasks = await db.all('SELECT * FROM tasks')
    res.json(tasks)
  })

  // POST task
  app.post('/tasks', async (req, res) => {
    console.log('Incoming task:', req.body)
    const { name, description, due_date, duration_value, duration_unit } = req.body
    const result = await db.run(
      `INSERT INTO tasks (name, description, due_date, duration_value, duration_unit)
       VALUES (?, ?, ?, ?, ?)`,
      [name, description, due_date, duration_value, duration_unit]
    )
    res.json({ id: result.lastID })
  })

  // PUT task completion
  app.put('/tasks/:id/complete', async (req, res) => {
    const { id } = req.params
    const completed_at = new Date().toISOString()
    await db.run(
      'UPDATE tasks SET completed = 1, completed_at = ? WHERE id = ?',
      [completed_at, id]
    )
    res.json({ success: true })
  })

  // Start server after all is ready
  app.listen(3000, () => console.log('✅ Server running on http://localhost:3000'))
}

startServer().catch(err => {
  console.error('❌ Failed to start server:', err)
})

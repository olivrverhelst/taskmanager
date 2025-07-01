import express from 'express'
import sqlite3 from 'sqlite3'
import cors from 'cors'
import { open } from 'sqlite'
import bcrypt from 'bcrypt'

const app = express()
app.use(cors())
app.use(express.json())

const startServer = async () => {
  const db = await open({
    filename: './mydatabase.db',
    driver: sqlite3.Database,
  })

  // Create tasks table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      name TEXT NOT NULL,
      description TEXT,
      due_date TEXT,
      duration_value INTEGER,
      duration_unit TEXT,
      completed BOOLEAN DEFAULT 0,
      difficulty INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `)

  // Create users table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      nickname TEXT NOT NULL,
      petname TEXT NOT NULL,
      password_hash TEXT NOT NULL
    )
  `)

  // Health check
  app.get('/', (req, res) => {
    res.send('Backend is running!')
  })

  // Task endpoints
  app.get('/tasks', async (req, res) => {
    const { user_id } = req.query
    if (!user_id) {
      return res.status(400).json({ error: 'Missing user_id' })
    }
    const tasks = await db.all('SELECT * FROM tasks WHERE user_id = ?', [user_id])
    res.json(tasks)
})

  app.post('/tasks', async (req, res) => {
    const { user_id, name, description, due_date, duration_value, duration_unit, difficulty } = req.body
    if (!user_id || !name) {
      return res.status(400).json({ error: 'Missing user_id or task name' })
    }
    const result = await db.run(
      `INSERT INTO tasks (user_id, name, description, due_date, duration_value, duration_unit, difficulty)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_id, name, description, due_date, duration_value, duration_unit, difficulty]
    )
    res.json({ id: result.lastID })
})

  app.put('/tasks/:id/complete', async (req, res) => {
    const { id } = req.params
    await db.run('UPDATE tasks SET completed = 1 WHERE id = ?', [id])

    res.json({ success: true })
  })

  // User registration endpoint
  app.post('/register', async (req, res) => {
  try {
    const { email, nickname, petname, password } = req.body

    if (!email || !nickname || !password) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Check for existing user
    const existingUser = await db.get('SELECT * FROM users WHERE email = ?', email)
    if (existingUser) {
      return res.status(409).json({ error: 'Email already in use' })
    }

    // Hash password (await this!)
    const password_hash = await bcrypt.hash(password, 10)

    // Insert user with hashed password
    const result = await db.run(
      'INSERT INTO users (email, nickname, petname, password_hash) VALUES (?, ?, ?, ?)',
      [email, nickname, petname, password_hash]
    )

    res.json({ 
  id: result.lastID, 
  email, 
  nickname, 
  petname 
})

  } catch (err) {
    console.error('Registration error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})
  app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Find user by email
    const user = await db.get('SELECT * FROM users WHERE email = ?', email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare passwords
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Login successful — return user info (exclude password_hash)
    const { id, nickname, petname } = user;
    res.json({ id, email, nickname, petname });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
  // Start the server
  app.listen(3000, () => console.log('✅ Server running on http://localhost:3000'))
}

startServer().catch(err => {
  console.error('❌ Failed to start server:', err)
})

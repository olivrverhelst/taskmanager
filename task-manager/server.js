import express from 'express'
import sqlite3 from 'sqlite3'
import cors from 'cors'
import { open } from 'sqlite'
import bcrypt from 'bcrypt'

const app = express()
app.use(cors())
app.use(express.json())

// Shared db variable
let db

// XP needed to level up formula
function xpForNextLevel(level) {
  return 100 + (level - 1) * 20
}

// Routes here use `db`

app.get('/', (req, res) => {
  res.send('Backend is running!')
})

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
  try {
    const task = await db.get('SELECT difficulty, user_id, completed FROM tasks WHERE id = ?', [id])
    if (!task) return res.status(404).json({ error: 'Task not found' })
    if (task.completed === 1) return res.status(400).json({ error: 'Task already completed' })

    await db.run('UPDATE tasks SET completed = 1 WHERE id = ?', [id])

    const xpGained = 10 * task.difficulty

    const user = await db.get('SELECT pet_xp, pet_level FROM users WHERE id = ?', [task.user_id])
    if (!user) return res.status(404).json({ error: 'User not found' })

    let newXP = user.pet_xp + xpGained
    let newLevel = user.pet_level

    while (newXP >= xpForNextLevel(newLevel)) {
      newXP -= xpForNextLevel(newLevel)
      newLevel++
    }

    await db.run('UPDATE users SET pet_xp = ?, pet_level = ? WHERE id = ?', [newXP, newLevel, task.user_id])

    res.json({ 
      success: true, 
      xp_gained: xpGained, 
      pet_xp: newXP, 
      pet_level: newLevel 
    })
  } catch (err) {
    console.error('Error completing task:', err)
    res.status(500).json({ error: 'Failed to complete task' })
  }
})

app.get('/pet/:userId', async (req, res) => {
  const userId = req.params.userId
  try {
    const user = await db.get('SELECT pet_xp, pet_level FROM users WHERE id = ?', [userId])
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json(user)
  } catch (err) {
    console.error('Error fetching pet info:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.post('/register', async (req, res) => {
  try {
    const { email, nickname, petname, password } = req.body

    if (!email || !nickname || !password) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email])
    if (existingUser) {
      return res.status(409).json({ error: 'Email already in use' })
    }

    const password_hash = await bcrypt.hash(password, 10)

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
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }

    const user = await db.get('SELECT * FROM users WHERE email = ?', [email])
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' })
    }

    const validPassword = await bcrypt.compare(password, user.password_hash)
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email or password' })
    }

    const { id, nickname, petname } = user
    res.json({ id, email, nickname, petname })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.put('/users/:id', async (req, res) => {
  const { id } = req.params
  const { nickname, petname, email, password } = req.body

  if (!nickname || !petname || !email) {
    return res.status(400).json({ error: 'Nickname, petname, and email are required' })
  }

  try {
    const existingEmailUser = await db.get(
      'SELECT * FROM users WHERE email = ? AND id != ?',
      [email, id]
    )
    if (existingEmailUser) {
      return res.status(409).json({ error: 'Email already in use by another user' })
    }

    let password_hash
    if (password && password.trim() !== '') {
      password_hash = await bcrypt.hash(password, 10)
    }

    if (password_hash) {
      await db.run(
        'UPDATE users SET nickname = ?, petname = ?, email = ?, password_hash = ? WHERE id = ?',
        [nickname, petname, email, password_hash, id]
      )
    } else {
      await db.run(
        'UPDATE users SET nickname = ?, petname = ?, email = ? WHERE id = ?',
        [nickname, petname, email, id]
      )
    }

    const updatedUser = await db.get(
      'SELECT id, email, nickname, petname FROM users WHERE id = ?',
      [id]
    )

    res.json(updatedUser)

  } catch (err) {
    console.error('Error updating user:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.get('/users/:id', async (req, res) => {
  const { id } = req.params
  try {
    const user = await db.get(
      'SELECT id, email, nickname, petname FROM users WHERE id = ?',
      [id]
    )
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(user)
  } catch (err) {
    console.error('Error fetching user:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

const startServer = async () => {
  db = await open({
    filename: './mydatabase.db',
    driver: sqlite3.Database,
  })

  // Create tables if they don't exist
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

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      nickname TEXT NOT NULL,
      petname TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      pet_xp INTEGER DEFAULT 0,
      pet_level INTEGER DEFAULT 1
    )
  `)

  app.listen(3000, () => {
    console.log('✅ Server running on http://localhost:3000')
  })
}

startServer().catch(err => {
  console.error('❌ Failed to start server:', err)
})

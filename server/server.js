const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

app.use(express.json());

// In-memory storage for users (replace with a database in a real application)
const users = [
  { id: 1, username: 'john', password: 'password123' },
  { id: 2, username: 'jane', password: 'password456' },
];

// Register endpoint
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: users.length + 1, username, password: hashedPassword };
  users.push(user);
  res.send({ message: 'User created successfully' });
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(401).send({ message: 'Invalid username or password' });
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).send({ message: 'Invalid username or password' });
  const token = jwt.sign({ userId: user.id }, 'secretkey', { expiresIn: '1h' });
  res.send({ token });
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});
const express = require('express');
const app = express();
const todoRoutes = require('./routes/todoRoutes');
require('dotenv').config();

app.use(express.json());
app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
    res.send('Todo API is running');
  });
  



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

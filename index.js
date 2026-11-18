const express = require('express');
const app = express();

app.use(express.json());

// Rotas existentes
const userRoute = require('./routes/userRoutes');
app.use(userRoute);

// Novas rotas de Tarefas com cálculo de progresso
const taskRoutes = require('./routes/taskRoutes');
app.use(taskRoutes);

app.get('/', (req, res) => {
  res.send('API a funcionar com sucesso!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API modularizada rodando na porta ${PORT}`);
});
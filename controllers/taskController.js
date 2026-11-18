// Base de dados simulada em memória (ou substitui por persistência local/SQLite se preferires)
let tasks = [
  { id: 1, title: 'Configurar ambiente na nuvem', completed: true },
  { id: 2, title: 'Criar rotas da API', completed: false }
];

// 1. Listar tarefas e calcular o progresso
exports.getTasks = (req, res) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  res.json({
    progress: `${progress}%`,
    completedTasks: completed,
    totalTasks: total,
    tasks
  });
};

// 2. Criar nova tarefa (Create)
exports.createTask = (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'O título da tarefa é obrigatório.' });
  }

  const newTask = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    completed: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

// 3. Atualizar tarefa / Marcar como concluída (Update)
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const task = tasks.find(t => t.id == id);

  if (!task) {
    return res.status(404).json({ error: 'Tarefa não encontrada.' });
  }

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
};

// 4. Apagar tarefa (Delete)
exports.deleteTask = (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id == id);

  if (index === -1) {
    return res.status(404).json({ error: 'Tarefa não encontrada.' });
  }

  const deleted = tasks.splice(index, 1);
  res.json({ message: 'Tarefa removida com sucesso', deleted });
};
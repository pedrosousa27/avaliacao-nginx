// Base de dados em memória para exemplo
let usuarios = [
  { id: 1, nome: 'Ana Silva', email: 'ana@email.com' },
  { id: 2, nome: 'Carlos Souza', email: 'carlos@email.com' }
];

// Listar todos (200 OK)
const listarUsuarios = (req, res) => {
  return res.status(200).json(usuarios);
};

// Buscar por ID (200 OK / 404 Not Found)
const buscarUsuarioPorId = (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado.' });
  }

  return res.status(200).json(usuario);
};

// Criar novo usuário (201 Created / 400 Bad Request)
const criarUsuario = (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ erro: 'Nome e email são obrigatórios.' });
  }

  const novoUsuario = {
    id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
    nome,
    email
  };

  usuarios.push(novoUsuario);
  return res.status(201).json(novoUsuario);
};

// Atualizar totalmente (PUT) (200 OK / 400 / 404)
const atualizarTotalmenteUsuario = (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, email } = req.body;

  const index = usuarios.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Usuário não encontrado.' });
  }

  if (!nome || !email) {
    return res.status(400).json({ erro: 'Para atualização total, nome e email são obrigatórios.' });
  }

  usuarios[index] = { id, nome, email };
  return res.status(200).json(usuarios[index]);
};

// Atualizar parcialmente (PATCH) (200 OK / 404)
const atualizarParcialmenteUsuario = (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, email } = req.body;

  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado.' });
  }

  if (nome) usuario.nome = nome;
  if (email) usuario.email = email;

  return res.status(200).json(usuario);
};

// Deletar usuário (200 OK ou 204 No Content / 404)
const deletarUsuario = (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Usuário não encontrado para exclusão.' });
  }

  const usuarioRemovido = usuarios.splice(index, 1);
  return res.status(200).json({ mensagem: 'Usuário removido com sucesso.', usuario: usuarioRemovido[0] });
};

module.exports = {
  listarUsuarios,
  buscarUsuarioPorId,
  criarUsuario,
  atualizarTotalmenteUsuario,
  atualizarParcialmenteUsuario,
  deletarUsuario
};
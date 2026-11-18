const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Definindo as rotas e associando aos métodos do Controller
router.get('/usuarios', userController.listarUsuarios);
router.get('/usuarios/:id', userController.buscarUsuarioPorId);
router.post('/usuarios', userController.criarUsuario);
router.put('/usuarios/:id', userController.atualizarTotalmenteUsuario);
router.patch('/usuarios/:id', userController.atualizarParcialmenteUsuario);
router.delete('/usuarios/:id', userController.deletarUsuario);

module.exports = router;
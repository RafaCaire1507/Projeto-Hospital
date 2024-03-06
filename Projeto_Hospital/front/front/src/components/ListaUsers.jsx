import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit } from "react-icons/fa";
import "./Lista.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [usuarioEditado, setUsuarioEditado] = useState({
    NomePaciente: '',
    NumeroCarteiraPlano: '',
    IdPlanoDeSaude: '',
    IdEspecialidade: ''
  });

  const loadUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8800/');
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [users]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  const handleEdit = (user) => {
    setUsuarioEditado(user);
    setModalAberto(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.put(`http://localhost:8800/${usuarioEditado.id}`,{
          NomePaciente: usuarioEditado.NomePaciente,
          NumeroCarteiraPlano: usuarioEditado.NumeroCarteiraPlano,
          IdPlanoDeSaude: usuarioEditado.IdPlanoDeSaude,
          IdEspecialidade: usuarioEditado.IdEspecialidade
      });
      console.log('Dados do usuário atualizados:', usuarioEditado);
      setModalAberto(false);
    } catch (error) {
      console.error('Erro ao editar usuário:', error.message);
    }
  };

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <ul className="user-list">
        {users.map(user => (
          <li key={user.id} className="user-item">
            <div className="user-details">
              <h2>{user.NomePaciente}</h2>
              <p>{user.NumeroCarteiraPlano} - {user.NomePlanoDeSaude} - {user.NomeEspecialidade}</p>
            </div>
            <div className="user-actions">
              <button onClick={() => handleEdit(user)}>Editar</button>
              <button onClick={() => handleDelete(user.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>

      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Editar Usuário</h2>
              <span className="modal-close" onClick={() => setModalAberto(false)}>&times;</span>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div>
                <label htmlFor="NomePaciente">Nome do Paciente:</label>
                <input 
                  type="text" 
                  id="NomePaciente" 
                  value={usuarioEditado.NomePaciente} 
                  onChange={(e) => setUsuarioEditado({...usuarioEditado, NomePaciente: e.target.value})} 
                />
              </div>
              <div>
                <label htmlFor="NumeroCarteiraPlano">Número da Carteira do Plano:</label>
                <input 
                  type="text" 
                  id="NumeroCarteiraPlano" 
                  value={usuarioEditado.NumeroCarteiraPlano} 
                  onChange={(e) => setUsuarioEditado({...usuarioEditado, NumeroCarteiraPlano: e.target.value})} 
                />
              </div>
              <div>
                <label htmlFor="IdPlanoDeSaude">Planos de Saúde:</label>
                <select name="select" value={usuarioEditado.IdPlanoDeSaude} onChange={(e) => setUsuarioEditado({...usuarioEditado, IdPlanoDeSaude: e.target.value})}>
                  <option value="1">Unimed</option>
                  <option value="2">Sus</option>
                  <option value="3">Amil</option>
                  <option value="4">Bradesco Saúde</option>
                  <option value="5">Golden Cross</option>
                  <option value="6">Notredame Intermédica</option>
                </select> 
              </div>
              <div>
                <label htmlFor="IdEspecialidade">Especialidades:</label>
                <select name="select" value={usuarioEditado.IdEspecialidade} onChange={(e) => setUsuarioEditado({...usuarioEditado, IdEspecialidade: e.target.value})}>
                  <option value="1">Cardiologia</option>
                  <option value="2">Dermatologia</option>
                  <option value="3">Ginecologia</option>
                  <option value="4">Ortopedia</option>
                  <option value="5">Anestesiologia</option>
                  <option value="6">Pediatria</option>
                </select> 
              </div>
              <button type="submit">Salvar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;

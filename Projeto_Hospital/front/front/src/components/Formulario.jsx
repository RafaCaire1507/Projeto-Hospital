import React, { useState } from 'react';
import "./forms.css";


function FormularioFichaPaciente() {  
  const [NomePaciente, setNomePaciente] = useState('');
  const [NumeroCarteiraPlano, setNumeroCarteiraPlano] = useState('');
  const [IdPlanoDeSaude, setIdPlanoDeSaude] = useState('');
  const [IdEspecialidade, setIdEspecialidade] = useState('');
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8800', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          NomePaciente,
          NumeroCarteiraPlano,
          IdPlanoDeSaude,
          IdEspecialidade,
          
        })
      });
      if (!response.ok) {
        throw new Error('Erro ao adicionar usuário');
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div>
        <label htmlFor="NomePaciente">Nome do Paciente:</label>
        <input 
          type="text" 
          id="NomePaciente" 
          value={NomePaciente} 
          onChange={(e) => setNomePaciente(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="NumeroCarteiraPlano">Número da Carteira do Plano:</label>
        <input 
          type="select" 
          id="NumeroCarteiraPlano" 
          value={NumeroCarteiraPlano} 
          onChange={(e) => setNumeroCarteiraPlano(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="IdPlanoDeSaude">Planos de Saúde:</label>
        
          <select name="select" value={IdPlanoDeSaude} onChange={(e) => setIdPlanoDeSaude(e.target.value)}>
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
        
          <select name="select" value={IdEspecialidade} onChange={(e) => setIdEspecialidade(e.target.value)}>
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
    
  );
}
export default FormularioFichaPaciente;



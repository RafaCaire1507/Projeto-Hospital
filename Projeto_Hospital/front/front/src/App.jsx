import React from 'react';
import FormularioFichaPaciente from './components/Formulario';
import UserList from './components/ListaUsers';


function App() {
  return (
    <div className="App">
      <h1>Cadastro de Pacientes</h1>
      <FormularioFichaPaciente /> 
      <UserList />
    </div>
  );
}

export default App;

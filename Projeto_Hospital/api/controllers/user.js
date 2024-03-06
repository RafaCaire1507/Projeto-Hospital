import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT FichaPaciente.*, PlanosDeSaude.nome AS NomePlanoDeSaude, Especialidades.nome AS NomeEspecialidade FROM FichaPaciente JOIN PlanosDeSaude ON FichaPaciente.IdPlanoDeSaude = PlanosDeSaude.id JOIN Especialidades ON FichaPaciente.IdEspecialidade = Especialidades.id; "
  
  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};
  
export const addUser = (req, res) => {
    const q = "insert into fichapaciente (id, NomePaciente, NumeroCarteiraPlano, IdPlanoDeSaude, IdEspecialidade) values (default, ?)";
  
    const values = [
      req.body.NomePaciente,
      req.body.NumeroCarteiraPlano,
      req.body.IdPlanoDeSaude,
      req.body.IdEspecialidade,
    ];


  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário criado com sucesso.");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE fichapaciente SET `NomePaciente` = ?, `NumeroCarteiraPlano` = ?, `IdPlanoDeSaude` = ?, `IdEspecialidade` = ? WHERE `id` = ?";

  const values = [
    req.body.NomePaciente,
      req.body.NumeroCarteiraPlano,
      req.body.IdPlanoDeSaude,
      req.body.IdEspecialidade,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário atualizado com sucesso.");
  });
};
export const deleteUser = (req, res) => {
  const q = "DELETE FROM FichaPaciente WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário deletado com sucesso.");
  });
}; 


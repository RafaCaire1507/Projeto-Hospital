create database Hospital;

use Hospital;

create table Especialidades (
id int primary key auto_increment not null,
nome varchar (80) not null
);

create table PlanosDeSaude(
id int primary key auto_increment not null,
nome varchar (80) not null
);

create table FichaPaciente(
id int primary key auto_increment not null,
NomePaciente varchar (80) not null,
NumeroCarteiraPlano int not null,
IdPlanoDeSaude int,
IdEspecialidade int,
foreign key (IdPlanoDeSaude) references PlanosDeSaude(id),
foreign key (IdEspecialidade) references Especialidades(id)
);

insert into PlanosDeSaude (id, nome) values
(default, "Unimed"),
(default, "Sus"),
(default, "Amil"),
(default, "Bradesco Saúde"),
(default, "Golden Cross"),
(default, "Notredame Intermédica");

insert into especialidades (id, nome) values
(default, "Cardiologia"),
(default, "Dermatologia"),
(default, "Ginecologia"),
(default, "Ortopedia"),
(default, "Anestesiologia"),
(default, "Pediatria");

DELIMITER //

CREATE TRIGGER validar_duplicidade_ficha
BEFORE INSERT ON FichaPaciente
FOR EACH ROW
BEGIN
    DECLARE contador INT;

    SELECT COUNT(*) INTO contador
    FROM FichaPaciente
    WHERE NomePaciente = NEW.NomePaciente
    AND IdPlanoDeSaude = NEW.IdPlanoDeSaude
    AND IdEspecialidade = NEW.IdEspecialidade;

    IF contador > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Esta especialidade já foi utilizada para esse plano.';
    END IF;
END;
//

CREATE TRIGGER validar_duplicidade_ficha_update
BEFORE UPDATE ON FichaPaciente
FOR EACH ROW
BEGIN
    DECLARE contador INT;

    SELECT COUNT(*) INTO contador
    FROM FichaPaciente
    WHERE NomePaciente = NEW.NomePaciente
    AND IdPlanoDeSaude = NEW.IdPlanoDeSaude
    AND IdEspecialidade = NEW.IdEspecialidade;

    IF contador > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Esta especialidade já foi utilizada para esse plano.';
    END IF;
END;
//

DELIMITER ;


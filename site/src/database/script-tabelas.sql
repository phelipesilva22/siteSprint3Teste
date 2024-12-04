create database enviro;
use enviro;

show tables;
-- Criação da tabela Endereço
CREATE TABLE endereco (
    idEndereco INT AUTO_INCREMENT PRIMARY KEY,
    cep CHAR(9),
    cidade VARCHAR(45),
    bairro VARCHAR(45),
    numero INT,
    logradouro VARCHAR(100)
);

-- Criação da tabela Fábrica
CREATE TABLE fabrica (
    idFabrica INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45),
    qtdeCabine INT,
    fkEndereco INT,
    codAtivacao CHAR(5),
    FOREIGN KEY (fkEndereco) REFERENCES endereco(idEndereco)
);
insert into fabrica values 
	(default,"FabricaTeste", 4,null,'abcde');

-- Criação da tabela Cabine
CREATE TABLE cabine (
    idCabine INT AUTO_INCREMENT PRIMARY KEY,
    qtdeAlerta VARCHAR(45),
    fkFabrica INT,
    fkEmpresaFabrica INT,
    FOREIGN KEY (fkFabrica) REFERENCES fabrica(idFabrica)
);

-- Criação da tabela Sensor
CREATE TABLE sensor (
    idSensor INT AUTO_INCREMENT PRIMARY KEY,
    tipoSensor VARCHAR(45),
    dtInstalacao DATE,
    fkCabine INT,
    FOREIGN KEY (fkCabine) REFERENCES cabine(idCabine)
);

-- Criação da tabela Registros
CREATE TABLE registros (
    idRegistro INT AUTO_INCREMENT PRIMARY KEY,
    nvMedicao VARCHAR(20),
    nvAlerta VARCHAR(20),
    dtRegistro DATETIME,
    fkSensor INT,
    FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor)
);

-- Criação da tabela Funcionário
CREATE TABLE funcionario (
    idFuncionario INT AUTO_INCREMENT PRIMARY KEY,
    fkFabrica INT,
    nome VARCHAR(45),
    email VARCHAR(100),
    senha VARCHAR(25),
    FOREIGN KEY (fkFabrica) REFERENCES fabrica(idFabrica)
);

-- Criação da tabela Funcionário Supervisor
CREATE TABLE funcionarioSupervisor (
    fkFuncionario INT,
    fkFabrica INT,
    fkSupervisor INT,
    PRIMARY KEY (fkFuncionario, fkSupervisor),
    FOREIGN KEY (fkFuncionario) REFERENCES funcionario(idFuncionario),
    FOREIGN KEY (fkFabrica) REFERENCES fabrica(idFabrica),
    FOREIGN KEY (fkSupervisor) REFERENCES funcionario(idFuncionario)
);






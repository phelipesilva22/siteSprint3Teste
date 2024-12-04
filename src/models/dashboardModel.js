var database = require("../database/config")

function cadastrarInfoFabrica(nome,qtdCabines,codAtivacao) {
    console.log("ACESSEI O DASHBOARD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome,qtdCabines,codAtivacao);
    
    var instrucaoSql = `
        INSERT INTO Fabrica (nome,qtdCabine,codAtivacao) VALUES ('${nome}', '${qtdCabines}', '${codAtivacao}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarInfoEndereco(cep,cidade,bairro,numero,logradouro,nomeFabrica) {
    console.log("ACESSEI O DASHBOARD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", cep,cidade,bairro,numero,logradouro);
    
    var instrucaoSql = `
        INSERT INTO Endereco (cep,cidade,bairro,numero,logradouro,fkFabrica) VALUES ('${cep}', '${cidade}', '${bairro}', '${numero}', '${logradouro}', '${nomeFabrica}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function calcularMediaDia() {
    console.log("Tô na funcao de media dia");
    
    var instrucaoSql = `
        SELECT 
            TRUNCATE(AVG(nvMedicao), 0) AS media
        FROM
            Registros
        WHERE
            DATE(dtRegistro) = CURDATE();
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function calcularMediaSemana() {
    console.log("Tô na funcao de media semana");
    
    var instrucaoSql = `
        SELECT 
            TRUNCATE(AVG(nvMedicao), 0) AS media
        FROM
            Registros
        WHERE
            DATE(dtRegistro) BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE();
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function captarCOV() {
    console.log("Tô captando COV");
    
    var instrucaoSql = `
        SELECT 
        TRUNCATE(nvMedicao, 0)  nivelCOV,
        TIME(dtRegistro) horaRegistro,
        zonaPerigo,
        zonaAviso
    FROM
        Registros
    ORDER BY dtRegistro desc limit 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
module.exports = {
    cadastrarInfoFabrica,
    cadastrarInfoEndereco,
    calcularMediaDia,
    calcularMediaSemana,
    captarCOV
};
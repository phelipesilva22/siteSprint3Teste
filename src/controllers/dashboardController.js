var dashboardModel = require("../models/dashboardModel");

function cadastrarInfoFabrica(req, res) {
    var nome = req.body.nomeServer;
    var qtdCabines = req.body.qtdCabinesServer;
    var codAtivacao = req.body.codAtivacaoServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (qtdCabines == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (codAtivacao == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {

        dashboardModel.cadastrarInfoFabrica(nome,qtdCabines,codAtivacao)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarInfoEndereco(req, res) {
    var cep = req.body.cepServer;
    var cidade = req.body.cidadeServer;
    var bairro = req.body.bairroServer;
    var numero = req.body.numeroServer;
    var logradouro = req.body.logradouroServer;
    var nomeFabrica = req.body.nomeFabricaVincularServer;

    if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (cidade == undefined) {
        res.status(400).send("Sua cidade está undefined!");
    } else if (bairro == undefined) {
        res.status(400).send("Seu bairro está undefined!");
    } else if (numero == undefined) {
        res.status(400).send("Seu numero a vincular está undefined!");
    } else if (logradouro == undefined) {
        res.status(400).send("Seu logradouro a vincular está undefined!");
    } else if (nomeFabrica == undefined) {
        res.status(400).send("Sua Fabrica a vincular está undefined!");
    } else {

        dashboardModel.cadastrarInfoEndereco(cep,cidade,bairro,numero,logradouro,nomeFabrica)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function calcularMediaDia(req, res) {

        dashboardModel.calcularMediaDia()
            .then(
                function (resultado) {
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); 
                    res.json(resultado);
                    }
            );
    }

function calcularMediaSemana(req, res) {

    dashboardModel.calcularMediaSemana()
        .then(
            function (resultado) {
                console.log(`Resultados: ${JSON.stringify(resultado)}`); 
                res.json(resultado);
                }
        );
}

function captarCOV(req, res) {

    dashboardModel.captarCOV()
        .then(
            function (resultado) {  
                console.log(`Resultados: ${JSON.stringify(resultado)}`); 
                res.json(resultado);
                }
        );
}
module.exports = {
    cadastrarInfoFabrica,
    cadastrarInfoEndereco,
    calcularMediaDia,
    calcularMediaSemana,
    captarCOV
}
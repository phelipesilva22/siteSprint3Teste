// importa os bibliotecas necessários
const serialport = require('serialport');
const mysql = require('mysql2');
/* const dotenv = require("dotenv"); */

// Troque para o seu ambiente atual
/* const ambiente_processo = 'desenvolvimento';
const caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
dotenv.config({ path: caminho_env }); */

const SERIAL_BAUD_RATE = 9600;
// habilita ou desabilita a inserção de dados no banco de dados
const HABILITAR_OPERACAO_INSERIR = true; 
const valoresSensorAnalogico = []

const serial = async (
    valoresSensorAnalogico
) => {

    // conexão com o banco de dados MySQL
    let poolBancoDados = mysql.createPool(
        {
            host: '10.18.35.203',
            user: 'aluno',
            password: 'Sptech#2024',
            database: 'enviro',
            port: 3307
        }
    ).promise();

    // lista as portas seriais disponíveis e procura pelo Arduino
    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }

    // configura a porta serial com o baud rate especificado
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );

    // evento quando a porta serial é aberta
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });

    // processa os dados recebidos do Arduino
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        console.log(data);
        const valores = data.split(';');
        const sensorAnalogico = parseFloat(valores);

        // armazena os valores dos sensores nos arrays correspondentes
        valoresSensorAnalogico.push(sensorAnalogico);

        // insere os dados no banco de dados (se habilitado)
        if (HABILITAR_OPERACAO_INSERIR) {

            // este insert irá inserir os dados na tabela "medida"
            await poolBancoDados.execute(
                'INSERT INTO Registros (nvMedicao, fkSensor, dtRegistro) VALUES (?,?, NOW())', 
                [sensorAnalogico, 1]
            );
            console.log("valores inseridos no banco: ", sensorAnalogico);

        }

    });

    // evento para lidar com erros na comunicação serial
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}

serial(valoresSensorAnalogico);









/* var mySqlConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};

const serial = async () => {
    let poolBancoDados = mysql.createPool(mySqlConfig).promise();

    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }

    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );

    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });

    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        console.log(data);
        const valores = data.split(';');

        // Adicione ou remova para o seu caso
        const sensor1 = parseFloat(valores[0]);

        await poolBancoDados.execute(
            'INSERT INTO registros (nvMedicao) VALUES (?)',
            [sensor1]
        );
        console.log("valores inseridos no banco: ", sensor1);
    });

    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
} */

// Inicia os processos de leitura e insert
/* serial(); */








/* // função para comunicação serial


// função para criar e configurar o servidor web
const servidor = (
    valoresSensorAnalogico
) => {
    const app = express();

    // configurações de requisição e resposta
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });

    // inicia o servidor na porta especificada
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });

    // define os endpoints da API para cada tipo de sensor
    app.get('/sensores/analogico', (_, response) => {
        return response.json(valoresSensorAnalogico);
    });
}

// função principal assíncrona para iniciar a comunicação serial e o servidor web
(async () => {
    // arrays para armazenar os valores dos sensores
    const valoresSensorAnalogico = [];

    // inicia a comunicação serial
    await serial(
        valoresSensorAnalogico
    );

    // inicia o servidor web
    servidor(
        valoresSensorAnalogico
    );
})(); */


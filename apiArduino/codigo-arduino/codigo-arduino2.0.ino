const int PINO_SENSOR_MQ2 = A0; //Porta analógica de entrada de dados

//Variaveis para arredondamento onde a parte máxima é 1000 e a mínima 100
const int VALOR_MINIMO = 100; 
const int VALOR_MAXIMO = 1000; 

void setup() {
  Serial.begin(9600); //Inicializar o monitor serial
}

void loop() { //Rodar o código em looping para coleta de dados constante
  int valorSensor = analogRead(PINO_SENSOR_MQ2);  //Variavel da leitura dos dados recebidos pelo sensor

  float concentracaoCOVgm3 = (valorSensor * 92.14) / 22.414; //Convertendo ppm em g/m³. 
                                                                //utilizando o calculo (ppm x Massa molar) / 22,414
                                                                //Massa molar utilizado foi a do tolueno, um dos COVs mais relevantes que podem ser captados pelo sensor
                                                                //22,414 = Volume molar de um gás em condições normais de temperatura e pressão(em litros/mol)

  float massaTotalDeCOVg = concentracaoCOVgm3 * 79.20; //Este valor representa a quantidade de COV (g) presente no ar monitorado pelo sensor 
                                                   //79.20 = média de metro cúbico de uma cabine de pintura automotiva (fonte:tecnibras.com)                                                                                                           

  float concentracaoCOVgm2 = massaTotalDeCOVg / (30 * 10); //Calcúlo da emissão de COV em g/m²
                                                           //30 = média de m² de uma carroceria de um automovel leve
                                                           //10 = quantidade de carros no dia

  Serial.println(concentracaoCOVgm2);

  delay(1000);  //Atraso de 1 segundo antes de executar o código novamente
}
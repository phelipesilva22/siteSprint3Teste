function calcularMonitoramentoCOV() {
    const volumeTintasMes = Number(document.getElementById('input_tinta').value);
    const COV = 0.42;                                                    // Estimando uma emissão de 0.42 g/m² de COV da tinta
    const volumePrimerMes = Number(document.getElementById('input_primer').value);
    const qtdCarroceriasMes = Number(document.getElementById('input_num_carroceria').value);
    const areaCarroceria = Number(document.getElementById('input_area_carroceria').value);                                             
    const solventeTinta = (1 / 3) * volumeTintasMes * 0.825        // Diluição de tinta que costuma ser 3:1
    const solventePrimer = (1 / 5) * volumePrimerMes * 0.825       // Diluição de primer que costuma ser 5:1
    var limiteEmissoesCOV = 0


    if (!volumeTintasMes || !volumePrimerMes || !qtdCarroceriasMes || !areaCarroceria) {
        alert("Por favor, preencha todos os campos.");
    } else {
        if (tipo_de_veiculo.value == 'carro')
            limiteEmissoesCOV = 45;
        else if (tipo_de_veiculo.value == 'caminhao')
            limiteEmissoesCOV = 70;
        else 
            limiteEmissoesCOV = 150;
        

        /*
        Cálculo de emissão de VOC
        VE = 1000 * [(VC1 * COV1) + (VC2 * COV2) + Solv1 + Solv2 - (RSA + RSB)] / [(B1 * S1) + (B2 * S2)]
        */
        const VE = 1000 * [(volumeTintasMes * COV) + (volumePrimerMes * COV) + solventeTinta + solventePrimer] / (qtdCarroceriasMes * areaCarroceria);
        div_simulador.innerHTML = `<div id="resultados">`
        const simulador = document.getElementById('simulador');
        const resultados = document.getElementById('resultados');

        if (simulador) {
            simulador.classList.add('hidden');  // Oculta a primeira tela
        }

        resultados.innerHTML = `     
        <div>
                <p><center><h1>RESULTADO !!!</h1></center></p><br>
                <p>Aviso: A emissão de COV é <span class="texto-azul2"><strong>${VE.toFixed(2)} g/m²</strong></span>,
                <span class="texto-vermelho2">ignorando métodos de controle de COVs!</span></p>
        </div>`;

        if (VE > limiteEmissoesCOV)
            resultados.innerHTML += `
        <p>As emissões de COV estão acima do limite de <span class="texto-vermelho"><strong>${limiteEmissoesCOV.toFixed(2)} g/m²</strong>.</span> 
        <span class="texto-vermelho">Você poderá ser multado!</span>
        </p>
        <p><span class="texto-vermelho">Atenção!</span> 
        Emitir mais COV do que o permitido pela lei pode resultar em consequências graves, como:</p>
        <ul>
            <li><span class="texto-vermelho2"><strong>Multas severas</strong></span> e até o 
            <span class="texto-vermelho2"><strong>fechamento temporário</strong></span> de suas operações.</li>
            <li>Comprometimento da <span class="texto-vermelho2"><strong>saúde de funcionários</strong></span>, com possíveis complicações respiratórias devido à exposição contínua.</li>
            <li>Impactos negativos ao meio ambiente, como a <span class="texto-vermelho2"><strong>poluição atmosférica</strong></span> e efeitos nocivos para a comunidade ao redor.</li>
        </ul>
        <p class="msg"><span class="texto-azul2">Quer evitar esses riscos e monitorar eficientemente sua fábrica?</span></p>
        <div class="opcao">
            <a href="index.html">Clique aqui e conheça a EnviroSense</a>
        </div>`;
        else
            resultados.innerHTML += `
            <p>As emissões de COV estão dentro do limite legal de <span class="texto-verde"><strong>${limiteEmissoesCOV.toFixed(2)} g/m²</strong>.</span> <span class="texto-verde">Parabéns!</span></p>
            <p>Manter suas emissões de COV dentro dos limites traz benefícios importantes:</p>
            <ul>
                <li>Você está <span class="texto-verde2"><strong>protegido contra multas e sanções</strong></span> por parte dos órgãos ambientais.</li>
                <li>Mostra responsabilidade com o <span class="texto-verde2"><strong>meio ambiente</strong></span>, ajudando a reduzir a poluição e melhorando sua imagem no mercado.</li>
                <li>Garante um <span class="texto-verde2"><strong>ambiente de trabalho seguro</strong></span>, minimizando o risco de problemas de saúde para seus funcionários.</li>
            </ul>
            <p class="msg"><span class="texto-azul2">Quer monitorar eficientemente sua fábrica e garantir que tudo continue dentro dos conformes?</span></p>
            <div class="opcao">
                <a href="index.html">Clique aqui e conheça a EnviroSense</a>
            </div>`;
    }
} 



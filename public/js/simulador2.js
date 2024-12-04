document.addEventListener("DOMContentLoaded", () => {
    const steps = document.querySelectorAll(".step");
    const timelineSteps = document.querySelectorAll(".timeline-step");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    var currentStep = 0;

    // Atualiza a exibição do passo atual
    function updateStep() {
        steps.forEach((step, index) => {
            step.classList.toggle("active", index === currentStep);
        });

        timelineSteps.forEach((timelineStep, index) => {
            timelineStep.classList.toggle("completed", index <= currentStep);
        });

        prevBtn.classList.toggle("hidden", currentStep === 0);
        nextBtn.textContent = currentStep === steps.length - 1 ? "Finalizar" : "Próximo";
    }

    // Avança para a próxima etapa ou calcula o resultado
    nextBtn.addEventListener("click", () => {
        if (currentStep < steps.length - 1) {
            currentStep++;
            updateStep();
        } else {
            calcularResultado();
        }
    });

    // Volta para a etapa anterior
    prevBtn.addEventListener("click", () => {
        if (currentStep > 0) {
            currentStep--;
            updateStep();
        }
    });

    // Lógica do cálculo
    function calcularResultado() {
        const tinta = Number(document.getElementById("input_tinta").value);
        const primer = Number(document.getElementById("input_primer").value);
        const area = Number(document.getElementById("input_area_carroceria").value);
        const quantidade = Number(document.getElementById("input_num_carroceria").value);
        const tipo = document.getElementById("tipo_de_veiculo").value;

        if (!tinta || !primer || !area || !quantidade || !tipo) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const limites = { carro: 45, caminhao: 70, onibus: 150 };
        const limite = limites[tipo];
        const VE = 1000 * (tinta + primer) / (quantidade * area);

        const resultadoDiv = document.getElementById("resultado");
        resultadoDiv.innerHTML = `
            <p>Emissões de COV: <strong>${VE.toFixed(2)} g/m²</strong></p>
            <p>Limite permitido: <strong>${limite} g/m²</strong></p>
            <p>${VE <= limite ? "Parabéns! Está dentro do limite." : "Cuidado! Está acima do limite."}</p>
        `;

        updateStep();
    }

    // Inicializa a interface
    updateStep();
});
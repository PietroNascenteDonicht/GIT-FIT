document.addEventListener("DOMContentLoaded", () => {

    const lista = document.querySelector(".lista-aulas"); // onde as aulas aparecem
    const titulo = document.querySelector(".titulo-dia");  // título do dia

   
    const mapaDias = {
        "Dom": "dom",
        "Seg": "seg",
        "Ter": "ter",
        "Qua": "qua",
        "Qui": "qui",
        "Sex": "sex",
        "Sáb": "sab"
    };

   
    let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    let estadoAulas = JSON.parse(localStorage.getItem("estadoAulas")) || {};
    let diaSemanaAtual = localStorage.getItem("diaSelecionado") || "seg";

  
    const aulasPorDia = {
        dom: [
            { hora: "07:00", nome: "Boxe", professor: "Eduardo Leal", duracao: 45, vagas: "13 / 15" },
            { hora: "08:00", nome: "Hitt", professor: "Everton Fernandes", duracao: 60, vagas: "3 / 15" },
        ],
        seg: [
            { hora: "07:00", nome: "Funcional", professor: "Pablo Werlang", duracao: 45, vagas: "3 / 15" },
            { hora: "09:00", nome: "Spinning", professor: "Glederson Santos", duracao: 60, vagas: "8 / 20" },
            { hora: "11:00", nome: "Yoga", professor: "Sandro Barros", duracao: 60, vagas: "12 / 15" },
        ],
        ter: [
            { hora: "07:00", nome: "Pilates", professor: "Louize Leitzke", duracao: 45, vagas: "7 / 15" },
            { hora: "08:00", nome: "Funcional", professor: "Vinicus Guimarães", duracao: 45, vagas: "8 / 15" },
            { hora: "16:00", nome: "Yoga", professor: "Sérgio Fujii", duracao: 60, vagas: "10 / 15" },
        ],
        qua: [
            { hora: "07:00", nome: "Funcional", professor: "Pablo Werlang", duracao: 45, vagas: "6 / 15" },
            { hora: "15:00", nome: "Hitt", professor: "Rafael Padilha", duracao: 60, vagas: "18 / 25" },
        ],
        qui: [
            { hora: "07:00", nome: "Boxe", professor: "Diego Lima", duracao: 60, vagas: "5 / 15" },
            { hora: "14:00", nome: "Funcional", professor: "Vinicus Guimarães", duracao: 45, vagas: "8 / 15" },
        ],
        sex: [
            { hora: "07:00", nome: "Funcional", professor: "Vinicus Guimarães", duracao: 45, vagas: "10 / 15" },
            { hora: "10:00", nome: "Pilates", professor: "Maria Joana", duracao: 45, vagas: "12 / 15" },
        ],
        sab: [
            { hora: "07:00", nome: "Funcional", professor: "Louize Leitzke", duracao: 45, vagas: "7 / 15" },
            { hora: "09:00", nome: "Funcional", professor: "Sérgio Fujii", duracao: 45, vagas: "20 / 25" },
            { hora: "11:00", nome: "Hitt", professor: "Vanius Zapalowski", duracao: 45, vagas: "21 / 25" },
        ]
    };

    function renderAulas(dia) {

        const aulas = aulasPorDia[dia] || [];

    
        titulo.textContent = `📅 Aulas do dia ${dia}`;

   
        lista.innerHTML = "";

        aulas.forEach(aula => {

    
            const id = `${diaSemanaAtual}-${aula.nome}-${aula.hora}`;

        
            const match = aula.vagas.match(/(\d+)\s*\/\s*(\d+)/);
            const base = match ? parseInt(match[1]) : 0; 
            const total = match ? parseInt(match[2]) : 0; 

            // pega estado salvo ou usa base
            let atuais = estadoAulas[id]?.atuais ?? base;

            // verifica se já foi reservado
            const reservado = reservas.includes(id);

            lista.innerHTML += `
                <div class="aula-card ${reservado ? "reservada" : ""}"
                     data-id="${id}"
                     data-vagas-atuais="${atuais}"
                     data-vagas-totais="${total}">

                    <div class="horario">
                        <h3>${aula.hora}</h3>
                        <span>${aula.duracao} min</span>
                    </div>

                    <div class="info">
                        <h4>${aula.nome}</h4>
                        <p>${aula.professor}</p>

                        <div class="meta">
                            <span>⏱ ${aula.duracao} min</span>
                            <span>👥 ${atuais} vagas / ${total}</span>
                        </div>
                    </div>

                    <button class="btn-reservar ${reservado ? "cancelar" : ""}">
                        ${reservado ? "✖ Cancelar" : "Reservar"}
                    </button>

                </div>
            `;
        });
    }

  
    function salvar() {
        localStorage.setItem("reservas", JSON.stringify(reservas));
        localStorage.setItem("estadoAulas", JSON.stringify(estadoAulas));
        localStorage.setItem("diaSelecionado", diaSemanaAtual);
    }

   
    lista.addEventListener("click", (e) => {

        const btn = e.target.closest(".btn-reservar");
        if (!btn) return;

        const card = btn.closest(".aula-card");
        const id = card.dataset.id;

        let atuais = Number(card.dataset.vagasAtuais);
        const total = Number(card.dataset.vagasTotais);

        const reservado = reservas.includes(id);


        if (reservado) {
            reservas = reservas.filter(r => r !== id);
            atuais++;
        } else {
            
            reservas.push(id);
            if (atuais > 0) atuais--;
        }

    
        estadoAulas[id] = { atuais };

    
        salvar();
        renderAulas(diaSemanaAtual);
        marcarDiasAtivos();
    });

   
    function marcarDiasAtivos() {
        document.querySelectorAll(".dia").forEach(dia => {
            const nome = dia.querySelector("span").textContent.trim();
            dia.classList.toggle("ativo", mapaDias[nome] === diaSemanaAtual);
        });
    }

    document.querySelectorAll(".dia").forEach(dia => {

        dia.addEventListener("click", () => {

            document.querySelector(".dia.ativo")?.classList.remove("ativo");
            dia.classList.add("ativo");

            const nome = dia.querySelector("span").textContent.trim();
            const novoDia = mapaDias[nome];

            if (!novoDia) return;

            diaSemanaAtual = novoDia;

            salvar();
            renderAulas(diaSemanaAtual);
        });
    });

    renderAulas(diaSemanaAtual);
    marcarDiasAtivos();

});
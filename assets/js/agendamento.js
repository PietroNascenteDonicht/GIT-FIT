window.addEventListener("templatePronto", () => {


    // guarda os nomes das chaves usadas no localstorege
        const usuario = "usuario_padrao";
        const LS_RESERVAS = `reservas_${usuario}`;
        const LS_ESTADO = `estadoAulas_${usuario}`;
        const LS_SEMANA = `semana_${usuario}`;


    
        const lista = document.querySelector(".lista-aulas");
        const tituloDia = document.querySelector(".titulo-dia");
        const semanaTitulo = document.querySelector(".semana-titulo");
        const btnPrev = document.querySelectorAll(".nav-btn")[0];
        const btnNext = document.querySelectorAll(".nav-btn")[1];
        const diasHTML = document.querySelectorAll(".dia");

        const mapaDias = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];

      
        let semanaOffset = Number(localStorage.getItem(LS_SEMANA)) || 0; // recupera a semana que o usuario estava.
        let reservas = JSON.parse(localStorage.getItem(LS_RESERVAS)) || [];
        let estadoAulas = JSON.parse(localStorage.getItem(LS_ESTADO)) || {};
        let diaSelecionadoIndex = 1; // começa na segunda

        
        const aulas = [
            { dia: "dom", hora: "07:00", nome: "Boxe", professor: "Eduardo Leal", duracao: 45, vagas: 15 },
            { dia: "dom", hora: "08:00", nome: "Hitt", professor: "Everton Fernandes", duracao: 60, vagas: 15 },

            { dia: "seg", hora: "07:00", nome: "Funcional", professor: "Pablo Werlang", duracao: 45, vagas: 15 },
            { dia: "seg", hora: "09:00", nome: "Spinning", professor: "Glederson Santos", duracao: 60, vagas: 20 },
            { dia: "seg", hora: "11:00", nome: "Yoga", professor: "Sandro Barros", duracao: 60, vagas: 15 },

            { dia: "ter", hora: "07:00", nome: "Pilates", professor: "Louize Leitzke", duracao: 45, vagas: 15 },
            { dia: "ter", hora: "08:00", nome: "Funcional", professor: "Vinicius Guimarães", duracao: 45, vagas: 15 },

            { dia: "qua", hora: "15:00", nome: "Hitt", professor: "Rafael Padilha", duracao: 60, vagas: 25 },

            { dia: "qui", hora: "07:00", nome: "Boxe", professor: "Diego Lima", duracao: 60, vagas: 15 },

            { dia: "sex", hora: "07:00", nome: "Funcional", professor: "Vinicius Guimarães", duracao: 45, vagas: 15 },

            { dia: "sab", hora: "09:00", nome: "Funcional", professor: "Sérgio Fujii", duracao: 45, vagas: 25 }
        ];

      // calcula qual função monstrar
        function getSemana(offset = 0) {
            const hoje = new Date();
            hoje.setDate(hoje.getDate() + offset * 7); // avança ou volta semanas

            const inicio = new Date(hoje);
            inicio.setDate(hoje.getDate() - hoje.getDay()); // descobre o domingo

            const fim = new Date(inicio);
            fim.setDate(inicio.getDate() + 6);

            return { inicio, fim };
        }

        function formatarData(data) { 
            return data.toISOString().split("T")[0];
        }

        
        function atualizarCalendario() {
            const { inicio, fim } = getSemana(semanaOffset);

            semanaTitulo.textContent =
                `${inicio.toLocaleDateString("")} – ${fim.toLocaleDateString("")}`;

            diasHTML.forEach((diaEl, index) => {
                const data = new Date(inicio);
                data.setDate(inicio.getDate() + index);

                diaEl.querySelector(".numDia").textContent = data.getDate();
                diaEl.dataset.data = formatarData(data);
                diaEl.classList.toggle("ativo", index === diaSelecionadoIndex);
            });

            renderAulas();
        }

        
        function renderAulas() {
            lista.innerHTML = "";

            const diaKey = mapaDias[diaSelecionadoIndex];
            const dataSelecionada = diasHTML[diaSelecionadoIndex].dataset.data;

            tituloDia.textContent = `📅 Aulas do dia ${dataSelecionada}`;

            const aulasDoDia = aulas.filter(a => a.dia === diaKey);

            aulasDoDia.forEach(aula => {
                const id = `${dataSelecionada}-${aula.nome}-${aula.hora}`;
                const reservada = reservas.includes(id); //verifica

                let vagasAtuais = estadoAulas[id]?.vagas ?? aula.vagas;
                if (reservada) vagasAtuais--; // calcula vaga

                lista.innerHTML += `
                <div class="aula-card ${reservada ? "reservada" : ""}" data-id="${id}">
                    <div class="horario">
                        <h3>${aula.hora}</h3>
                        <span>${aula.duracao} min</span>
                    </div>

                    <div class="info">
                        <h4>${aula.nome}</h4>
                        <p>${aula.professor}</p>
                        <span>👥 ${vagasAtuais} / ${aula.vagas}</span>
                    </div>

                    <button class="btn-reservar ${reservada ? "cancelar" : ""}">
                        ${reservada ? "✖ Cancelar" : "Reservar"}
                    </button>
                </div>
            `;
            });
        }

       
        lista.addEventListener("click", e => {
            const btn = e.target.closest(".btn-reservar");
            if (!btn) return;

            const card = btn.closest(".aula-card");
            const id = card.dataset.id;

            if (reservas.includes(id)) {
                reservas = reservas.filter(r => r !== id);
            } else {
                reservas.push(id);
            }

            estadoAulas[id] = estadoAulas[id] || { vagas: aulas[0].vagas };

            salvar();
            renderAulas();
        });

       
        diasHTML.forEach((dia, index) => {
            dia.addEventListener("click", () => {
                diaSelecionadoIndex = index;
                atualizarCalendario();
            });
        });

        
        btnPrev.addEventListener("click", () => {
            semanaOffset--;
            salvar();
            atualizarCalendario();
        });

        btnNext.addEventListener("click", () => {
            const { fim } = getSemana(semanaOffset + 1);
            if (fim.getMonth() === 11) return; // para em dezembro
            semanaOffset++;
            salvar();
            atualizarCalendario();
        });

      
        function salvar() {
            localStorage.setItem(LS_RESERVAS, JSON.stringify(reservas));
            localStorage.setItem(LS_ESTADO, JSON.stringify(estadoAulas));
            localStorage.setItem(LS_SEMANA, semanaOffset);
        }

        atualizarCalendario();
    });
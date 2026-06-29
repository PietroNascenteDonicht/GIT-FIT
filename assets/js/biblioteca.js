import { createTreino, getTreinos } from "/assets/js/treinos.js";

if (!getTreinos()) {
    createTreino({
        title: 'Hipertrofia Total - superiores',
        dificuldade: 'Intermediario',
        objetivo: 'hipertrofia',
        desc: 'Treino focado em volume muscular para membros superiores com exercícios compostos e isolados.',
        time: 60,
        kcal: 420,
        exercicios: [
            {
                name: 'Supino reto',
                reps: 10,
                series: 4,
                descanso: 90,
                desc: 'Peito'
            },
            {
                name: 'Remada curvada',
                reps: 10,
                series: 4,
                descanso: 90,
                desc: 'Costas'
            },
            {
                name: 'Desenvolvimento militar',
                reps: 12,
                series: 3,
                descanso: 60,
                desc: 'Ombros'
            },
            {
                name: 'Puxada frontal',
                reps: 12,
                series: 3,
                descanso: 60,
                desc: 'Costas'
            }
        ],
        musculos: ['peito', 'costas', 'ombro'],
    });

    createTreino({
        title: 'Hipertrofia Total - inferiores',
        dificuldade: 'Intermediario',
        objetivo: 'hipertrofia',
        desc: 'Treino focado em quadríceps, posteriores e glúteos com alto volume de trabalho.',
        time: 75,
        kcal: 550,
        exercicios: [
            {
                name: 'Agachamento livre',
                reps: 8,
                series: 4,
                descanso: 120,
                desc: 'Quadríceps'
            },
            {
                name: 'Leg Press',
                reps: 12,
                series: 4,
                descanso: 90,
                desc: 'Quadríceps'
            },
            {
                name: 'Mesa flexora',
                reps: 12,
                series: 3,
                descanso: 60,
                desc: 'Posterior'
            },
            {
                name: 'Elevação pélvica',
                reps: 12,
                series: 3,
                descanso: 60,
                desc: 'Glúteos'
            }
        ],
        musculos: ['quadriceps', 'posterior', 'gluteo'],
    });

    createTreino({
        title: 'Força Máxima - pernas',
        dificuldade: 'Avancado',
        objetivo: 'forca',
        desc: 'Treino voltado para desenvolvimento de força em exercícios básicos.',
        time: 70,
        kcal: 500,
        exercicios: [
            {
                name: 'Agachamento livre',
                reps: 5,
                series: 5,
                descanso: 180,
                desc: 'Força'
            },
            {
                name: 'Levantamento terra',
                reps: 5,
                series: 5,
                descanso: 180,
                desc: 'Força'
            },
            {
                name: 'Leg Press',
                reps: 6,
                series: 4,
                descanso: 120,
                desc: 'Força'
            }
        ],
        musculos: ['quadriceps', 'posterior', 'gluteo'],
    });
}


function exibirTreinos(nivel = '', objetivo = ''){
    const lista = document.getElementById('lista-treinos')
    if (!lista) return;

    lista.innerHTML = '';
    
    let treinos = getTreinos()

    if(objetivo !== ''){
        treinos = treinos.filter(t => t.objetivo === objetivo)
    }

    if(nivel !== ''){
        console.log(nivel)
        treinos = treinos.filter(t => t.dificuldade === nivel)
        console.log(treinos)
    }

    treinos.forEach((treino, i) => {
        lista.innerHTML += `
            <div class="card-treino">
                <span class="label-list">
                    <p>${treino.dificuldade}</p>
                    <p>${treino.objetivo}</p>
                </span>
                <h2>${treino.title}</h2>
                <p>${treino.desc}</p>
                <span>
                    <i><img src="/assets/img/relogio.svg" alt="" class="pequeno-icon">${treino.time} min</i>
                    <i><img src="/assets/img/fogo.svg" alt="" class="pequeno-icon">${treino.kcal} kcal</i>
                    <i><img src="/assets/img/exercicio.svg" alt="" class="pequeno-icon">${treino.exercicios.length} ex.</i>
                </span>
                <a href="/views/treinos/detalhe.html?${i}">Ver treino completo -></a>
            </div>
        `
    });
}

window.addEventListener('templatePronto', (ev) => {
    const lista = document.getElementById('lista-treinos')

    const filtrosObjetivo = document.querySelectorAll('.filtros input[name="objetivo"]');
    const filtroNivel = document.querySelectorAll('.filtros input[name="nivel"]')

    const atualizarTreinos = () => {
        let nivel = '';
        let objetivo = '';

        // Captura o nível selecionado
        const nivelSelecionado = document.querySelector('.filtros input[name="nivel"]:checked');
        if(nivelSelecionado && nivelSelecionado.value !== 'todos') {
            nivel = nivelSelecionado.value.charAt(0).toUpperCase() + nivelSelecionado.value.slice(1);
        }

        // Captura o objetivo selecionado
        const objetivoSelecionado = document.querySelector('.filtros input[name="objetivo"]:checked');
        if(objetivoSelecionado && objetivoSelecionado.value !== 'todos') {
            objetivo = objetivoSelecionado.value;
        }

        exibirTreinos(nivel, objetivo);
    }

    filtrosObjetivo.forEach(fObj => {
        fObj.addEventListener('change', () => {
            atualizarTreinos();
        })
    })

    filtroNivel.forEach(fN => {
        fN.addEventListener('change', () => {
            atualizarTreinos();
        })
    })

    atualizarTreinos();
});
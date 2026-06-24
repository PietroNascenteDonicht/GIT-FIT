import { getTreinos } from "/assets/js/treinos.js"

window.addEventListener('templatePronto', () => {
    const treinos = getTreinos();
    const query = window.location.search.slice(1);
    const treino = treinos?.[Number(query)];

    if (!treino) {
        document.querySelector('#detalhe-titulo').textContent = 'Treino não encontrado';
        document.querySelector('#descricao-detalhe').textContent = 'Verifique o link ou retorne para a lista de treinos.';
        document.querySelector('#min').textContent = '-';
        document.querySelector('#kcal').textContent = '-';
        document.querySelector('#exec').textContent = '0';
        document.getElementById('exercicios-lista').innerHTML = '<h2>Nenhum treino disponível</h2>';
        return;
    }

    document.querySelector('#detalhe-titulo').textContent = treino.title;
    document.querySelector('#descricao-detalhe').textContent = treino.desc;
    document.querySelector('#min').textContent = treino.time + ' min';
    document.querySelector('#kcal').textContent = treino.kcal + ' Kcal';
    document.querySelector('#exec').textContent = treino.exercicios.length + ' Exercicios';

    const execLista = document.getElementById('exercicios-lista');
    execLista.innerHTML = '';

    if (!treino.exercicios || treino.exercicios.length === 0) {
        execLista.innerHTML = '<h2>Nenhum exercício encontrado</h2>';
        return;
    }

    treino.exercicios.forEach((exec, i) => {
        const card = document.createElement('article');
        card.className = 'exercicio-card';

        let series = '';

        for(let i = 1; i < exec.series; i++){
            series += `
                <div class="detalhes-item"><span><input placeholder="KG"></span><strong>${exec.reps}</strong></div>
            `
        }

        card.innerHTML = `
            <div class="exercicio-card-top">
                <span class="ex-num">${i + 1}</span>
                <strong>${exec.nome}</strong>
                <img class="toggle-icon" src="/assets/img/down-arrow.svg" alt="Abrir detalhes">
            </div>
            <div class="exercicio-card-details">
                <p>${exec.series} séries de ${exec.reps} repetições • descanso ${exec.descanso}s</p>
                <div class="detalhes-list">
                    ${series}
                </div>
            </div>
        `
        ;

        card.addEventListener('click', (ev) => {
            if(ev.target.closest('input')){ return }
            card.classList.toggle('is-open')
        })
        execLista.appendChild(card);

        setTimeout(() => card.classList.add('show'), i * 80);
    });
});
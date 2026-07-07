import { getUsuarioLogado } from "/assets/js/usuarioLocalstorage.js"

let usuario = getUsuarioLogado()

export function createTreino({title, dificuldade, objetivo, desc, time, kcal, exercicios, musculos}){
    const treino = {
        title: title,
        dificuldade: dificuldade,
        objetivo: objetivo,
        desc: desc,
        time: time,
        kcal: kcal, 
        exercicios: exercicios,
        musculos: musculos,
    }

    let treinos = JSON.parse(localStorage.getItem('treinos')) || []

    treinos.push(treino)

    localStorage.setItem('treinos', JSON.stringify(treinos))
}

/**
 * pega os treinos, se params existir busca conforme
 * @param {Array} params - [objetivo, nivel]
 * @returns {Array} array de treinos (obj)
 */
export function getTreinos(params = ''){
    let treinos = JSON.parse(localStorage.getItem('treinos'))

    if(params !== ''){
        treinos.filter(t => t.labels[0] === params[0])
    }
    
    return treinos
}

export function addExercise(idTreino, exercicio){
    let treinos = JSON.parse(localStorage.getItem('treinos'))
    treinos[idTreino].exercicios.push(exercicio)
}


export function getExercicios(idTreino){
    let treinos = JSON.parse(localStorage.getItem('treinos'))
    return treinos[idTreino].exercicios;
}

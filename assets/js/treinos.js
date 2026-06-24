export function createTreino({title, labels, desc, time, kcal, exercicios, musculos}){
    const treino = {
        title: title,
        labels: labels,
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

export function getTreinos(){
    return JSON.parse(localStorage.getItem('treinos'))
}

export function addExercise(idTreino, exercicio){
    let treinos = JSON.parse(localStorage.getItem('treinos'))
    treinos[idTreino].exercicios.push(exercicio)
}


export function getExercicios(idTreino){
    let treinos = JSON.parse(localStorage.getItem('treinos'))
    return treinos[idTreino].exercicios;
}

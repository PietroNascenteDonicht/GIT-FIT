let usuarios = JSON.parse(localStorage.getItem('usuarios'))
let planos = JSON.parse(localStorage.getItem('planos'))
let treinos = JSON.parse(localStorage.getItem('treinos'))
let receita = 0;

console.log(planos)

window.addEventListener('templatePronto', () => {
    let cards = document.querySelectorAll('.cards .card .card-value');
    cards[0].textContent = usuarios.length

    usuarios.forEach(u => {
        planos.forEach(p => {
            if(p.name === u.plano){
                receita += p.preco
                return;
            }
        })
    });

    cards[1].textContent = 'R$ ' + receita

    cards[3].textContent = treinos.length
})
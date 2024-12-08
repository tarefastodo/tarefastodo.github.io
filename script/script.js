if(!localStorage.getItem('user')) {
    localStorage.setItem('user', JSON.stringify({tarefas:[]}))
}

console.log(localStorage.getItem('user'))

function adicionarTarefa() {

    let tituloValor = document.getElementById('titulo_tarefa').value
    let descricaoValor = document.getElementById('descricao').value
    let dataValor = document.getElementById('data').value
    let prioridadeValor = document.getElementById('prioridade').value

    let resposta = document.getElementById('resposta_addTask')

    if(!tituloValor || !descricaoValor || !dataValor || !prioridadeValor) {
        resposta.style.color = 'red';
        resposta.style.display = 'block';
        resposta.innerText = 'Preencha todos os campos!';
        return
    }

    let nova_tarefa = {titulo:tituloValor, descricao:descricaoValor, data:dataValor, prioridade:prioridadeValor}

    let tarefas = JSON.parse(localStorage.getItem('user')).tarefas
    tarefas.push(nova_tarefa)

    localStorage.setItem('user', JSON.stringify({tarefas:tarefas}))

    resposta.innerText = 'Tarefa Adicionada com Sucesso!';
    resposta.style.color = 'green';
    resposta.style.display = 'block';

    setTimeout(() => {location.href = 'index.html'}, 2500)

}

document.getElementById('botao').addEventListener('click', adicionarTarefa)

function listarTarefas() {
    const tarefasDiv = document.getElementById('tarefas');
    tarefasDiv.innerHTML = ''; // Limpa a lista antes de adicionar as tarefas

    const tarefas = JSON.parse(localStorage.getItem('user')).tarefas;

    if (tarefas.length === 0) {
        tarefasDiv.innerHTML = '<p>Nenhuma tarefa adicionada ainda.</p>';
        return;
    }

    tarefas.forEach((tarefa, index) => {
        const tarefaDiv = document.createElement('div');
        tarefaDiv.classList.add('tarefa');

        let prioridadeClasse = '';
        if (tarefa.prioridade === 'Alta') prioridadeClasse = 'prioridade-alta';
        else if (tarefa.prioridade === 'Média') prioridadeClasse = 'prioridade-media';
        else if (tarefa.prioridade === 'Baixa') prioridadeClasse = 'prioridade-baixa';

        tarefaDiv.innerHTML = `
            <h4>${tarefa.titulo} <span class="${prioridadeClasse}">(${tarefa.prioridade})</span></h4>
            <p>${tarefa.descricao}</p>
            <p><strong>Data:</strong> ${tarefa.data.slice(8, 10)}/${tarefa.data.slice(5, 7)}/${tarefa.data.slice(0, 4)}</p>
            <button class="remover-tarefa" data-index="${index}">Remover</button>
        `;

        tarefasDiv.appendChild(tarefaDiv);
    });

    // Adiciona eventos para os botões de remoção
    const removerBotoes = document.querySelectorAll('.remover-tarefa');
    removerBotoes.forEach(botao => {
        botao.addEventListener('click', removerTarefa);
    });
}

document.addEventListener('DOMContentLoaded', listarTarefas);

function removerTarefa(event) {
    const index = event.target.getAttribute('data-index');
    let tarefas = JSON.parse(localStorage.getItem('user')).tarefas;

    tarefas.splice(index, 1); // Remove a tarefa pelo índice
    localStorage.setItem('user', JSON.stringify({tarefas:tarefas}));

    listarTarefas(); // Atualiza a lista de tarefas
}


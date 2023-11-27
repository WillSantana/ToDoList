// Seleciona os elementos do DOM
const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-tasks');

// Array para armazenar as tarefas
let minhaListaDeItens = [];

// Função para adicionar uma nova tarefa à lista
function adicionarNovaTarefa() {
  // Adiciona um novo objeto representando a tarefa à lista
  minhaListaDeItens.push({
    tarefa: input.value,
    concluida: false,
  });

  // Limpa o campo de entrada após adicionar a tarefa
  input.value = '';

  // Atualiza a exibição das tarefas na interface
  mostrarTarefas();
}

// Função para exibir as tarefas na interface
function mostrarTarefas() {
  let novaLi = '';

  minhaListaDeItens.forEach((item, posicao) => {
    const emEdicao = minhaListaDeItens[posicao].editando; // Defina emEdicao dentro do loop

    if (emEdicao) {
      // Se estiver em edição, mostra um campo de entrada para editar a tarefa
      novaLi += `
      
        <li class="task ${item.concluida ? 'done' : ''}">
        <div classe = "inputcontainer">
          <input type="text" value="${item.tarefa}" id="editInput${posicao}" />
        </div>
        <div classe = "imgcontainer">
          <img src="./img/aceitar.png" alt="aceitar" onclick="salvarEdicao(${posicao})">          
          <img src="./img/cancelado.png" alt="cancelado" onclick="cancelarEdicao(${posicao})"> 
        </div>
        </li>
      `;
    } else {
      // Se não estiver em edição, mostra a tarefa normalmente com o botão de editar
      novaLi += `
        <li class="task ${item.concluida ? 'done' : ''}">
        <div classe = "inputcontainer">
          <img src="./img/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
        </div>
          <p>${item.tarefa}</p>
          <div classe = "imgcontainer">  
          <img src="./img/trash.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
          <img src="./img/editar.png" alt="botao-editar" onclick="iniciarEdicao(${posicao})">
          </div>
        </li>
      `;
    }
  });

  listaCompleta.innerHTML = novaLi;

  localStorage.setItem('lista', JSON.stringify(minhaListaDeItens));
}

// Função para marcar ou desmarcar uma tarefa como concluída
function concluirTarefa(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;

  // Atualiza a exibição das tarefas na interface
  mostrarTarefas();
}
// Função para iniciar a edição de uma tarefa
function iniciarEdicao(posicao) {
  // Marca todos os itens como não editando
  minhaListaDeItens.forEach(item => {
    item.editando = false;
  });

  // Marca o item atual como editando
  minhaListaDeItens[posicao].editando = true;

  // Atualiza a exibição das tarefas na interface
  mostrarTarefas();
}

// Função para salvar a edição de uma tarefa
function salvarEdicao(posicao) {
  const novoTexto = document.getElementById(`editInput${posicao}`).value;

  if (novoTexto.trim() !== '') {
    minhaListaDeItens[posicao].tarefa = novoTexto;
    minhaListaDeItens[posicao].editando = false;
    // Atualiza a exibição das tarefas na interface
    mostrarTarefas();
  } else {
    alert('Digite um valor válido para a tarefa.');
  }
}

// Função para cancelar a edição de uma tarefa
function cancelarEdicao(posicao) {
  minhaListaDeItens[posicao].editando = false;
  // Atualiza a exibição das tarefas na interface
  mostrarTarefas();
}


// Função para excluir uma tarefa da lista
function deletarItem(posicao) {
  // Remove a tarefa na posição especificada do array
  minhaListaDeItens.splice(posicao, 1);

  // Atualiza a exibição das tarefas na interface
  mostrarTarefas();
}

// Função para carregar as tarefas do armazenamento local ao carregar a página
function recarregarTarefas() {
  const tarefasDoLocalStorage = localStorage.getItem('lista');

  // Verifica se há tarefas armazenadas localmente
  if (tarefasDoLocalStorage) {
    // Converte o JSON armazenado localmente de volta para um array
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
  }

  // Atualiza a exibição das tarefas na interface
  mostrarTarefas();
}

// Carrega as tarefas ao recarregar a página
recarregarTarefas();

// Adiciona um ouvinte de evento para o botão de adicionar tarefa
button.addEventListener('click', adicionarNovaTarefa);

let listaTarefas = []

renderizar()

function cadastrarTarefa(e){
    e.preventDefault()

    // 1. Coletar Dados
    const titulo = document.getElementById("titulo").value

    // Verifica se titulo está vazio
    if (!titulo){
        alert("Dados faltantes")
        return
    }
    
    // 2. Estruturar os dados (compilar/montar)
    const novaTarefa = {
        "titulo": titulo,
        "estado": "pendente"
    }

    // 3. Armazenar os dados 
    listaTarefas.push(novaTarefa)
    salvarDados()

    alert("Tarefa Cadastrada com Sucesso!")

    renderizar()
    
    document.getElementById("form-cadastro").reset()
    
}

// Construir uma função chamada renderizarTarefas
// 1. Ler a lista de tarefas
// 2. Criar um novo li para cada tarefa
// 3. Adicionar os li criados em um elemento(ul) chamado lista de tarefas

function renderizar(){

    listaTarefas = carregarDados()
    // Lembrar de zerar o elemento que segura os cards
    document.getElementById("lista-tarefas").innerHTML = ""

    // Usamos a arrow function () => {}
    listaTarefas.forEach((tarefa, indice) => {
        const cardTarefa = document.createElement("li")
        
        cardTarefa.innerHTML = `${tarefa["titulo"]} - ${tarefa["estado"]}`

        const botaoCompletar = document.createElement("button")
        botaoCompletar.onclick = () => {
            tarefa["estado"] = "completo"
            salvarDados()
            renderizar() 
        }
        botaoCompletar.textContent = "COMPLETAR"
        botaoCompletar.classList.add("botao-completar")
        cardTarefa.appendChild(botaoCompletar)

        const botaoCancelar = document.createElement("button")
        botaoCancelar.onclick = () => {
            tarefa["estado"] = "cancelada"
            salvarDados()
            renderizar()
        }
        botaoCancelar.textContent = "CANCELAR"
        botaoCancelar.classList.add("botao-cancelar")
        cardTarefa.appendChild(botaoCancelar)

        const botaoRemover = document.createElement("button")
        botaoRemover.onclick = () => {
            listaTarefas.splice(indice, 1)
            salvarDados()
            renderizar()
        }
    
        botaoRemover.textContent = "Remover"
        cardTarefa.appendChild(botaoRemover)

        
        // if (tarefa["estado"] == "pendente"){
        //     cardTarefa.classList.add("tarefa-pendente")
        // }
        cardTarefa.classList.add(`tarefa-${tarefa["estado"]}`)

        

        document.getElementById("lista-tarefas").appendChild(cardTarefa)
    })
}

function salvarDados(){

    localStorage.setItem("tarefas", JSON.stringify(listaTarefas))

}

function carregarDados(){

    const tarefasLocalStorage = JSON.parse(localStorage.getItem("tarefas"))

    if (!tarefasLocalStorage){
        return []
    }

    return tarefasLocalStorage
    
}
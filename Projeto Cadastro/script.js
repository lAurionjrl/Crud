let listaProdutos = []

renderizar()

function cadastrarProduto(e) {
    e.preventDefault()

    // 1. Coletar Dados
    const nome = document.getElementById("nome").value
    const preco = document.getElementById("preco").value
    const quantidade = document.getElementById("quantidade").value

    // Verifica se os campos estão vazios
    if (!nome || !preco) {
        alert("Dados faltantes")
        return
    }

    // 2. Estruturar os dados
    const novoProduto = {
        "nome": nome,
        "preco": preco,
        "quantidade": quantidade
    }

    // 3. Armazenar os dados 
    listaProdutos.push(novoProduto)
    salvarDados()

    alert("Produto Cadastrado com Sucesso!")

    renderizar()

    document.getElementById("form-produto").reset()
}

function renderizar() {
    listaProdutos = carregarDados()
    document.getElementById("lista-produtos").innerHTML = ""

    listaProdutos.forEach((produto, indice) => {
        const cardProduto = document.createElement("li")

        // Exibe Nome e Preço
        const infoProduto = document.createElement("span")
        infoProduto.textContent = `${produto.nome} - R$ ${produto.preco} - (Qtd: ${produto.quantidade ? produto.quantidade : "não informado"})`
        cardProduto.appendChild(infoProduto)

        // Criar contêiner para alinhar os dois botões
        const acoesDiv = document.createElement("div")
        acoesDiv.className = "acoes-produto"

        // Botão Editar
        const botaoEditar = document.createElement("button")
        botaoEditar.textContent = "Editar"
        botaoEditar.className = "btn-editar"
        botaoEditar.onclick = () => {
            document.getElementById("nome").value = produto.nome
            document.getElementById("preco").value = produto.preco
            document.getElementById("quantidade").value = produto.quantidade
            listaProdutos.splice(indice, 1)
            salvarDados()
            renderizar()
        }
        acoesDiv.appendChild(botaoEditar)

        // Botão Remover
        const botaoRemover = document.createElement("button")
        botaoRemover.textContent = "Remover"
        botaoRemover.className = "btn-remover"
        botaoRemover.onclick = () => {
            listaProdutos.splice(indice, 1)
            salvarDados()
            renderizar()
        }
        acoesDiv.appendChild(botaoRemover)

        cardProduto.appendChild(acoesDiv)
        document.getElementById("lista-produtos").appendChild(cardProduto)
    })
}

function salvarDados() {
    localStorage.setItem("produtos", JSON.stringify(listaProdutos))
}

function carregarDados() {
    const produtosLocalStorage = JSON.parse(localStorage.getItem("produtos"))

    if (!produtosLocalStorage) {
        return []
    }

    return produtosLocalStorage
}
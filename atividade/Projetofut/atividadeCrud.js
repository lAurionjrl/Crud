// O pacote @inquirer/prompts permite fazer perguntas ao usuário no terminal.
// `input` lê textos; `number` lê valores numéricos.
import { input, number } from "@inquirer/prompts"

// Exibe todos os filmes cadastrados, percorrendo o array do início ao fim.
function verCatalogo() {
    console.log("CATÁLOGO DE FILMES")
    for (let i = 0; i < filmes.length; i++) {
        // O índice `i` indica a posição atual no array; guardamos o objeto
        // em uma variável para deixar mais simples acessar seus dados.
        let filmeAtual = filmes[i]
        // `join` transforma o array de sessões em um texto separado por " - ".
        console.log(`${filmeAtual.id} | ${filmeAtual.titulo} | ${filmeAtual.duracao} min | ${filmeAtual.classificacao} | ${filmeAtual.sessoes.join(" - ")}`)
    }
}

async function escolherFilme() {
    let idFilme = await number({ message: "DIGITE O ID DO FILME DESEJADO:" })

    // Esta versão comentada mostra como procurar o filme com um laço manual:
    // começa sem resultado e percorre o array até encontrar o ID.
    // let filmeSelecionado = undefined

    // for (let i = 0; i < filmes.length; i++){
    //     if(idFilme === filmes[i].id){
    //         filmeSelecionado = filmes[i]
    //     }
    // }

    // `find` percorre o array e retorna o primeiro filme que atende à condição.
    // Se nenhum ID corresponder, o resultado será `undefined`.
    let filmeSelecionado = filmes.find((filme) => filme.id === idFilme)

    // Um valor `undefined` é falsy, então este teste identifica ID não encontrado.
    if (!filmeSelecionado) {
        console.warn("ID DIGITADO NÃO CORRESPONDE A UM FILME!")
    } else {
        // Como o filme foi encontrado, podemos exibir os campos do objeto.
        console.log(`
            FICHA DO FILME

            ID: ${filmeSelecionado.id}
            Titulo: ${filmeSelecionado.titulo}
            Classificação: ${filmeSelecionado.classificacao}
            Duracao: ${filmeSelecionado.duracao}
            Sessoes: ${filmeSelecionado.sessoes.join(" - ")}    
                `)
    }

    return filmeSelecionado
}


// Cada filme é um objeto com os mesmos campos. O array reúne todos os filmes.
let filmes = [
    {
        id: 1,
        titulo: "Star Wars 1: Ameaça Fantasma",
        duracao: 120,
        classificacao: "13+",
        sessoes: ["13:30", "15:30", "18:00"]
    },
    {
        id: 2,
        titulo: "Star Wars 2: Ataque dos Clones",
        duracao: 142,
        classificacao: "13+",
        sessoes: ["14:00", "17:00", "20:30"]
    },
    {
        id: 3,
        titulo: "Star Wars 3: A Vingança dos Sith",
        duracao: 140,
        classificacao: "14+",
        sessoes: ["12:45", "16:15", "19:45", "22:00"]
    }
]

// O próximo filme recebe um ID novo. Começamos em 4 porque os IDs de 1 a 3
// já estão sendo usados pelos filmes cadastrados inicialmente.
let idAtual = 4

// Mantém o sistema em execução até que a opção de saída encerre o laço.
while (true) {
    // O menu é mostrado novamente a cada volta do laço.
    console.log(`===== CINEMA FILMES ANIMAIS =====
        1 - Cadastrar filme
        2 - Ver todos os filmes
        3 - Ver um filme
        4 - Editar filme
        5 - Remover filme
        0 - Sair`)

    // A opção é lida como texto; por isso as comparações abaixo usam strings.
    let op = await input({ message: "DIGITE A OPÇÃO DESEJADA: " })

    // CREATE: solicita os dados, monta um objeto e o adiciona ao array.
    if (op === "1") {
        console.log("CADASTRO DE FILMES")

        // Cada resposta fica armazenada em uma variável para montar o novo filme.
        let titulo = await input({ message: "Digite o título do filme:" })
        let duracao = await number({ message: "Digite a duração do filme em minutos:" })
        let classificacao = await input({ message: "Digite a classificação do filme:" })
        // Separa o texto digitado em um array usando o hífen como delimitador.
        let sessoes = await input({ message: "Digite os horários da sessão, separados por '-':" })

        // Agrupa os dados relacionados em um único objeto.
        let novoFilme = {
            id: idAtual,
            titulo: titulo,
            duracao: duracao,
            classificacao: classificacao,
            sessoes: sessoes.split("-")
        }

        // `push` inclui o novo objeto no final do array de filmes.
        filmes.push(novoFilme)
        console.log("FILME CADASTRADO COM SUCESSO")
        // Incrementa o contador para que o próximo cadastro tenha outro ID.
        idAtual++

    } else if (op === "2") {
        // READ (lista): percorre e imprime todos os filmes cadastrados.
        console.log("CATÁLOGO DE FILMES")
        for (let i = 0; i < filmes.length; i++) {
            let filmeAtual = filmes[i]
            console.log(`${filmeAtual.id} | ${filmeAtual.titulo} | ${filmeAtual.duracao} min | ${filmeAtual.classificacao} | ${filmeAtual.sessoes.join(" - ")}`)
        } // IMPLEMENTADO NA FUNÇÃO verCatalogo()

    } else if (op === "3") {

        // READ (detalhe): mostra o catálogo para ajudar a escolher um ID.
        verCatalogo()
        let idFilme = await number({ message: "DIGITE O ID DO FILME DESEJADO:" })

        // Esta versão comentada mostra como procurar o filme com um laço manual:
        // começa sem resultado e percorre o array até encontrar o ID.
        // let filmeSelecionado = undefined

        // for (let i = 0; i < filmes.length; i++){
        //     if(idFilme === filmes[i].id){
        //         filmeSelecionado = filmes[i]
        //     }
        // }

        // `find` percorre o array e retorna o primeiro filme que atende à condição.
        // Se nenhum ID corresponder, o resultado será `undefined`.
        let filmeSelecionado = filmes.find((filme) => filme.id === idFilme)

        // Um valor `undefined` é falsy, então este teste identifica ID não encontrado.
        if (!filmeSelecionado) {
            console.warn("ID DIGITADO NÃO CORRESPONDE A UM FILME!")
        } else {
            // Como o filme foi encontrado, podemos exibir os campos do objeto.
            console.log(`
            FICHA DO FILME

            ID: ${filmeSelecionado.id}
            Titulo: ${filmeSelecionado.titulo}
            Classificação: ${filmeSelecionado.classificacao}
            Duracao: ${filmeSelecionado.duracao}
            Sessoes: ${filmeSelecionado.sessoes.join(" - ")}    
                `)
        }


    } else if (op === "4") {
        // UPDATE: esta opção está reservada para implementar a edição de filmes.
        verCatalogo()
        let filmeSelecionado = await escolherFilme()


        if (filmeSelecionado) {
            let titulo = await input({ message: "Titulo: ", default: filmeSelecionado.titulo })

            let duracao = await number({ message: "Duração: ", default: filmeSelecionado.duracao })

            let classificacao = await input({ message: "Classificação: ", default: filmeSelecionado.classificacao })

            let sessoes = await input({message: "Sessões: ", default:filmeSelecionado.sessoes.join("-"), prefill:"tab"})

            filmeSelecionado.titulo = titulo
            filmeSelecionado.duracao = duracao
            filmeSelecionado.classificacao = classificacao
            filmeSelecionado.sessoes = sessoes.split("-")

            console.log("FILME ATUALIZADO COM SUCESSO")
        }


    } else if (op === "5") {

        verCatalogo()

        let filmeSelecionado = await escolherFilme()

        //filmes = filmes.filter((filme) => filme !== filmeSelecionado )

        if (filmeSelecionado) {
            let posicaoFilme = filmes.indexOf(filmeSelecionado)

            // for (let i = 0; i< filmes.length ; i++){
            //     if (filmes[i].id === filmeSelecionado.id){
            //         posicaoFilme = i
            //         break
            //     }
            // }

            if (posicaoFilme === -1) {
                console.log("FILME NÃO FOI ENCONTRADO")
            } else {
                filmes.splice(posicaoFilme, 1)
                console.log("FILME REMOVIDO COM SUCESSO!", filmeSelecionado)
            }

        }

    } else if (op === "0") {
        // `break` interrompe o while e encerra o sistema.
        console.log("SAINDO DO SISTEMA DE FILMES")
        break
    } else {
        // Qualquer texto diferente das opções disponíveis é inválido.
        console.warn("DIGITE UMA OPÇÃO VÁLIDA")
    }

    // Pausa antes de mostrar o menu novamente; também permite ao usuário ler a saída.
    await input({ message: "TECLE ENTER PARA CONTINUAR" })
}
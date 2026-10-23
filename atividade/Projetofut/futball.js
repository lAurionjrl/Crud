import { input, number } from "@inquirer/prompts"

let jogadores = [
    { id: 1, nome: "Gabigol", idade: 27, gols: 150, posicao: "Atacante" },
    { id: 2, nome: "Arrascaeta", idade: 29, gols: 60, posicao: "Meia" },
    { id: 3, nome: "David Luiz", idade: 36, gols: 10, posicao: "Zagueiro" }
]

let idAtual = 4

function verListaJogadores() {
    console.log("--- LISTA DE JOGADORES ---")
    for (let i = 0; i < jogadores.length; i++) {
        let j = jogadores[i]
        console.log(`${j.id} | ${j.nome} | ${j.idade} anos | ${j.gols} gols | ${j.posicao}`)
    }
}

while (true) {
    console.log(`===== CAMPEONATO DE FUTEBOL - JOGADORES =====
        1 - Cadastrar jogador
        2 - Ver todos os jogadores
        3 - Ver um jogador
        4 - Editar jogador
        5 - Remover jogador
        0 - Sair`)

    let op = await input({ message: "DIGITE A OPÇÃO DESEJADA: " })

    if (op === "1") {
        console.log("CADASTRO DE JOGADOR")

        let nome = await input({ message: "Digite o nome do jogador:" })
        let idade = await number({ message: "Digite a idade do jogador:" })
        let gols = await number({ message: "Digite o número de gols:" })
        let posicao = await input({ message: "Digite a posição do jogador:" })

        let novoJogador = {
            id: idAtual,
            nome: nome,
            idade: idade,
            gols: gols,
            posicao: posicao
        }

        jogadores.push(novoJogador)
        console.log("JOGADOR CADASTRADO COM SUCESSO")
        idAtual++

    } else if (op === "2") {
        if (jogadores.length === 0) {
            console.log("Nenhum jogador cadastrado.")
        } else {
            verListaJogadores()
            console.log(`Total de jogadores: ${jogadores.length}`)
        }

    } else if (op === "3") {
        if (jogadores.length === 0) {
            console.log("Nenhum jogador cadastrado.")
        } else {
            verListaJogadores()
            let idBuscado = await number({ message: "DIGITE O ID DO JOGADOR DESEJADO:" })

            let jogadorSelecionado = jogadores.find((j) => j.id === idBuscado)

            if (!jogadorSelecionado) {
                console.warn("ID DIGITADO NÃO CORRESPONDE A UM JOGADOR!")
            } else {
                console.log(`
                FICHA DO JOGADOR

                ID: ${jogadorSelecionado.id}
                Nome: ${jogadorSelecionado.nome}
                Idade: ${jogadorSelecionado.idade}
                Gols: ${jogadorSelecionado.gols}
                Posição: ${jogadorSelecionado.posicao}
                `)
            }
        }

    } else if (op === "4") {
        if (jogadores.length === 0) {
            console.log("Nenhum jogador cadastrado.")
        } else {
            verListaJogadores()
            let idBuscado = await number({ message: "DIGITE O ID DO JOGADOR PARA EDITAR:" })
            
            let posicao = -1
            for (let i = 0; i < jogadores.length; i++) {
                if (jogadores[i].id === idBuscado) {
                    posicao = i
                    break
                }
            }

            if (posicao === -1) {
                console.warn("JOGADOR NÃO ENCONTRADO!")
            } else {
                let j = jogadores[posicao]
                console.log(`Editando jogador: ${j.nome}`)

                let novoNome = await input({ message: `Novo nome (${j.nome}):` })
                let novaIdade = await number({ message: `Nova idade (${j.idade}):` })
                let novosGols = await number({ message: `Novos gols (${j.gols}):` })
                let novaPosicao = await input({ message: `Nova posição (${j.posicao}):` })

                jogadores[posicao].nome = novoNome !== "" ? novoNome : j.nome
                jogadores[posicao].idade = novaIdade ? novaIdade : j.idade
                jogadores[posicao].gols = novosGols ? novosGols : j.gols
                jogadores[posicao].posicao = novaPosicao !== "" ? novaPosicao : j.posicao

                console.log("JOGADOR ATUALIZADO COM SUCESSO!")
            }
        }

    } else if (op === "5") {
        if (jogadores.length === 0) {
            console.log("Nenhum jogador cadastrado.")
        } else {
            verListaJogadores()
            let idBuscado = await number({ message: "DIGITE O ID DO JOGADOR PARA REMOVER:" })

            let posicao = -1
            for (let i = 0; i < jogadores.length; i++) {
                if (jogadores[i].id === idBuscado) {
                    posicao = i
                    break
                }
            }

            if (posicao === -1) {
                console.warn("JOGADOR NÃO ENCONTRADO!")
            } else {
                let j = jogadores[posicao]
                let confirma = await input({ message: `Deseja remover ${j.nome}? (s/n):` })

                if (confirma.toLowerCase() === "s") {
                    jogadores.splice(posicao, 1)
                    console.log("JOGADOR REMOVIDO COM SUCESSO!")
                } else {
                    console.log("REMOÇÃO CANCELADA.")
                }
            }
        }

    } else if (op === "0") {
        console.log("SAINDO DO SISTEMA DE FUTEBOL")
        break
    } else {
        console.warn("DIGITE UMA OPÇÃO VÁLIDA")
    }

    await input({ message: "TECLE ENTER PARA CONTINUAR" })
}
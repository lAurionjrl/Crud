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

async function escolherJogador() {
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

    return jogadorSelecionado
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
            await escolherJogador()
        }

    } else if (op === "4") {
        if (jogadores.length === 0) {
            console.log("Nenhum jogador cadastrado.")
        } else {
            verListaJogadores()
            let jogadorSelecionado = await escolherJogador()

            if (jogadorSelecionado) {
                let nome = await input({ message: "Nome: ", default: jogadorSelecionado.nome })
                let idade = await number({ message: "Idade: ", default: jogadorSelecionado.idade })
                let gols = await number({ message: "Gols: ", default: jogadorSelecionado.gols })
                let posicao = await input({ message: "Posição: ", default: jogadorSelecionado.posicao })

                jogadorSelecionado.nome = nome
                jogadorSelecionado.idade = idade
                jogadorSelecionado.gols = gols
                jogadorSelecionado.posicao = posicao

                console.log("JOGADOR ATUALIZADO COM SUCESSO!")
            }
        }

    } else if (op === "5") {
        if (jogadores.length === 0) {
            console.log("Nenhum jogador cadastrado.")
        } else {
            verListaJogadores()
            let jogadorSelecionado = await escolherJogador()

            if (jogadorSelecionado) {
                let posicaoJogador = jogadores.indexOf(jogadorSelecionado)

                if (posicaoJogador === -1) {
                    console.log("JOGADOR NÃO ENCONTRADO!")
                } else {
                    jogadores.splice(posicaoJogador, 1)
                    console.log("JOGADOR REMOVIDO COM SUCESSO!", jogadorSelecionado)
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
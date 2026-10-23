import { input, number } from "@inquirer/prompts"

let glossario = {

}

while (true) {
    console.log(`
    SEJA BEM VINDO AO GLOSSÁRIO XYZ SENAC

    Menu:

    1 - Cadastrar palavra
    2 - Buscar palavra
    3 - Lista todos
    4 - Remover palavra

    0 - Sair
    
    `)

    let op = await input({ message: "Digite o número da opção desejada:" })

    if (op === "1") {
        console.log("CADASTRO DE PALAVRA")

        let novaPalavra = await input({ message: "Digite uma nova palavra:" })
        let novoSignificado = await input({ message: "Digite o significado da nova palavra: " })

        if (glossario[novaPalavra]) {
            console.warn("PALAVRA JÁ CADASTRADA")
        } else {
            glossario[novaPalavra] = novoSignificado
        }

        console.log(glossario)



    } else if (op === "2") {
        console.log("BUSCAR PALAVRA")
        let palavraBuscada = await input({ message: "Digite a palavra desejada:" })

        if (palavraBuscada in glossario) {
            console.log(`${palavraBuscada} - ${glossario[palavraBuscada]}`)
        } else {
            console.log("PALAVRA BUSCADA NÃO FOI CADASTRADA")
        }

    } else if (op === "3") {
        console.log("LISTAR PALAVRAS")
        let contador = 0
        for (const palavra in glossario) {
            console.log(`${palavra} - ${glossario[palavra]}`)
            contador += 1
        }

        //let totalPalavras = Object.keys(glossario).length


        console.log(`TOTAL DE PALAVRAS CADASTRADAS ${contador}`)
        // Object.entries(glossario).forEach(([palavra, significado]) => {
        //     console.log(`${palavra} - ${significado}`)
        // })


    } else if (op === "4") {
        let palavraRemover = await input({message:"Digite a palavra a ser removida:"})

        if (palavraRemover in glossario) {
            delete glossario[palavraRemover]
        } else {
            console.log("PALAVRA A SER REMOVIDA NÃO FOI CADASTRADA")
        }

    } else if (op === "0") {
        console.log("SAINDO DO PROGRAMA")
        break
    } else {
        console.log("DIGITE UMA OPÇÃO VÁLIDA!")
    }

    await input({ message: "TECLE ENTER PARA CONTINUAR" })

}
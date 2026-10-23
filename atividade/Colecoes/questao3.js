import { input, number } from "@inquirer/prompts"

let nomes = []

console.log("BEM VINDO À LOTERIA DOS SONHOS")

while (true){
    let novoNome = await input({message:"Digite o nome do participante ('sair' para encerrar): "})

    if (!novoNome.trim()){
        console.error("NOME INVÁLIDO! DIGITE ALGO...")
        continue
    }

    if (novoNome.toUpperCase() === "SAIR"){
        console.warn("FINALIZANDO CADASTRO!")
        break
    }

    nomes.push(novoNome)
}

console.log("LISTA DE PARTICIPANTES\n")
for(let i = 0; i < nomes.length;i++){
    console.log(`${i+1}. ${nomes[i]}`)
}

console.log(`\nTotal de Participantes: ${nomes.length}`)

let sortearNumero = Math.floor(Math.random() * nomes.length)

console.log(`O vencedor foi: ${nomes[sortearNumero]}`)
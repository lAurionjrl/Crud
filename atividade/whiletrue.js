import { input, number } from "@inquirer/prompts"

while (true){
    console.log(`
        
        Menu:

        1. Emitir segunda via
        2. Consultar cadastro

        0. Sair
        `)
    
        let op = await input({message: "Escolha uma opção do menu: "})

        if (op == "1"){
            console.log("Você entrou no Segunda Via!")
        }else if (op == "2"){
            console.log("Você está cadastrado!")
        }else if (op == "0"){
            console.log("Você saiu do programa.")
            break
        }else {
            console.log("Você digitou uma opção inválida.")
        }

        await input({message:"TECLE ENTER PARA CONTINUAR"})
}
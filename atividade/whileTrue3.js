// 3. Faça um menu de atendimento simples com 4 opções e um comando de sair. Cada opção deve ter uma frase correspondente que é exibida quando o usuário escolhe aquela opção.

import { input, number } from "@inquirer/prompts"


while(true){
    console.log(`
        Seja bem vindo ao Sistema XYZ

        Menu de Opções:

        1. Cadastrar Item
        2. Remover Item
        3. Ver Itens
        4. Atualizar Item 
        
        0. SAIR
        `)

        let op = await input({message:"Digite o número da opção desejada: "})

        if (op == "1"){
            console.log("Você escolheu o CADASTRAR ITEM")

        } else if (op == "2"){
            console.log("Você escolheu o REMOVER ITEM")
        } else if (op == "3"){
            console.log("Você escolheu o VER ITENS")

        } else if (op == "4"){
            console.log("Você escolheu o ATUALIZAR ITEM")
        } else if (op == "0"){
            console.log("ENCERRANDO PROGRAMA...")
            break
        } else{
            console.log("VOCÊ DIGITOU UMA INFORMAÇÃO INVALIDA. TENTE NOVAMENTE.")
        }

        await input({message:"TECLE ENTER PARA CONTINUAR"})



        // switch (op) {
        //     case "1":
        //         console.log("Você escolheu o Cadastro de Item")
        //         break;
        //     case "2":
        //         console.log("Você escolheu o Remover Item")
        //         break;
        //     default:
        //         break;
        // }

}
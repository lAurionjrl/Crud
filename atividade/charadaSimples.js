// Crie um programa de charada. O programa deve exibir 
// uma charada para o usuário e perguntar um palpite. Se  o usuário
// acertar deve imprimir uma mensagem de sucesso, se erra deve imprimir uma
// mensagem de erro.

// 1.1 Melhore o programa para apresentar 3 opções de charada, o usuário deve escolher uma 
// das opções e só então tentar responder a charada


/* Charadas */
import { input, number, confirm, password, select, checkbox } from "@inquirer/prompts";


console.log("O que é, o que é, cai em pé e corre deitado:")

const palpite = await input({message:"Digite seu palpite:"})

if (palpite.toUpperCase().trim() == "CHUVA"){
    console.log("Você acertou!")
}else {
    console.log("Você errou!")
}
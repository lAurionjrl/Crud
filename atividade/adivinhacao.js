// 1. Crie uma variavel chamada número secreto que contenha um número entre 0 e 10. Peça
// para o usuário tentar acertar o número. Caso o usuário acerte imprima uma mensagem de
// vitória e quando errar imprima uma mensagem de derrota.

// 2. Melhore o jogo, quando o usuário errar imprima uma messagem informando se o palpite 
//  foi maior ou menor que o número secreto.

// 3. Permita ao jogador tentar 3 vezes antes de receber uma mensagem de derrota.

// 4. Ajuste o programa para utilizar um número aleatório como número secreto.

import { input, number, confirm, password, select, checkbox } from "@inquirer/prompts";

// const numeroSecreto = 7;
// const maxTentativas = 3;
// let acertou = false;


// for (let tentativa = 1; tentativa <= maxTentativas; tentativa++) {
//   const palpite = await number({
//     message: `Tentativa ${tentativa} de ${maxTentativas}. Qual é o seu palpite (0 a 10)?`
//   });

//   if (palpite === numeroSecreto) {
//     console.log("🎉 Parabéns! Você acertou o número secreto!");
//     acertou = true;
//     break; 
//   } else {
  
//     if (palpite > numeroSecreto) {
//       console.log("❌ Errou! O número secreto é MENOR.");
//     } else {
//       console.log("❌ Errou! O número secreto é MAIOR.");
//     }
//   }
// }

// if (!acertou) {
//   console.log(`💥 Você perdeu! O número secreto era ${numeroSecreto}.`);
// }



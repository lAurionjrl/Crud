import { input, number, confirm, password, select, checkbox } from "@inquirer/prompts";

// const nome= await input({message: "Qual é o seu nome?"});


// const idade = await number({
//     message:"Idade?",
//     min: 0,
//     max: 120,
//     required: true,

// })

// const cidade = await input ({ message:'Cidade?', default:'Fortaleza'});









// const nome = await input({ 
//   message: 'Qual é o seu nome?' 
// });

// const idade = await number({ 
//   message: 'Qual é a sua idade?', 
//   min: 0, 
//   max: 120, 
//   required: true 
// });

// console.log(`Olá, ${nome}! Ano que vem você terá ${idade + 1} anos.`);


// console.log('nome:', typeof nome);
// console.log('idade:', typeof idade);

// const aceita = await confirm({ message: 'Aceita os termos?'});
// const novidades = await confirm({ message: 'Receber novidades?', default: false});
// console.log(aceita, typeof aceita);

// const senha = await password({message: 'Senha?', mask: '*'});
// console.log(typeof senha );


// const cor = await select({
//     message: 'Cor favorita?',
//     choices: ['azul', 'verde', 'vermelho'],
// });

// console.log(cor, typeof cor);



// const parcelas = await select({
//     message: 'Parcelas?',
//     choices: [
//         {name: 'A vista', value: 1},
//         {name: '3x sem juros', value: 3},
//         {name: '12x sem juros', value: 12},

//     ]
// })

// console.log(parcelas, typeof parcelas);

// const extras = await select({
//     message: 'Extras?',
//     choices: [
//         {name: 'Embalagem', value: 'embalagens', checked: true },
//         {name: 'Cartão', value: 'cartao'},
//         {name: 'Entrega expressa', value: 'expressa'},

//     ]
// })

// console.log(extras);


// const tamanho = await select({
//     message: 'Escolha o tamanho do lanche',
//     choices:[
//         {name:'P', value: 15,},
//         {name:'M', value: 20},
//         {name:'G', value: 25}

//     ]

// });

// const adcionais = await checkbox({
//     massage: 'Escolha os adicionais',
//     choices:[
//         {name:'Bacon', value:'Bacon'},
//         {name:'Queijo extra', value:'Queijo extra'},
//         {name:'Ovo', value:'Ovo'}
//     ]
// });

// const confirme = await select({
//     message: 'É pra viagem ?'

// });

// console.log(tamanho, typeof tamanho);
// console.log(adicionais, typeof adicionais);
// console.log(confime, typeof confirme);




// const email = await input({
//   message: 'E-mail?',
//   validate: (valor) => valor.includes('@') || 'Digite um e-mail válido',
// });

// const par = await number({
//   message: 'Um número par?',
//   required: true,
//   validate: (n) => n % 2 === 0 || 'Só números pares',
// });


// const texto = await input({ message: 'Altura (m)? Ex.: 1,75' });
// const altura = Number(texto.replace(',', '.'));

// console.log(altura, typeof altura);  // 1.75 "number"







// const texto = await input({
// message: 'Qual é a sua altura EX:(1,75)?',
// validate: (h) => h.includes('.') || 'Use a virgula como ',
// });


// console.log(`Altura digitada: "${texto}" | typeof antes: ${typeof texto}`);

// const altura = Number(texto.replace(',','.'));
// console.log(`Altura convertida: ${altura} | typeof depois: ${typeof altura}`);


// const nome = await input({ message: 'Nome:', validate: (v) => !!v || 'Obrigatório' });
// const idade = await number({ message: 'Idade:', validate: (v) => (v>= 0 && v <= 120) || 'Entre 0 e 120' });
// const altura = await number({ message: 'Altura (m):' });
// const novidades = await confirm({ message: 'Deseja receber novidades?' });
// const plano = await select({ message: 'Plano:', choices: [{ name: 'Básico', value: 1 }, { name: 'Premium', value: 2 }] });
// const interesses = await checkbox({ message: 'Interesses:', choices: [{ name: 'Tech', value: 'tech' }, { name: 'Games', value: 'games' }] });
// const senha = await password({ message: 'Senha:' });


// console.table({
//   nome: { valor: nome, tipo: typeof nome },
//   idade: { valor: idade, tipo: typeof idade },
//   altura: { valor: altura, tipo: typeof altura },
//   novidades: { valor: novidades, tipo: typeof novidades },
//   plano: { valor: plano, tipo: typeof plano },
//   interesses: { valor: interesses.join(', '), tipo: typeof interesses },
//   senha: { valor: '*'.repeat(senha.length), tipo: typeof senha }
// });


// const a = await number({ message: 'Primeiro valor?' });
// const b = await number({ message: 'Segundo valor?' });

// console.log('Soma:', a + b);



// const idade = await number({ message: 'Qual a sua idade?' });
// const temIngresso = await confirm({ message: 'Você tem ingresso?' });
// const estaAcompanhado = await confirm({ message: 'Está acompanhado?' });


// const emaior = idade >= 18;
// const podeEntrar = temIngresso && (emaior || estaAcompanhado);

// console.log('Tem ingresso:', temIngresso);
// console.log('É maior de idade:', emaior);
// console.log('Está acompanhado:', estaAcompanhado);
// console.log('Pode entrar:', podeEntrar);

// console.log(podeEntrar ? 'Entrada liberada' : 'Entrada barrada');


// const nomeCompleto = await input({message: 'Digite seu nome completo'});

// const nomeSemEspacos = nomeCompleto.trim();

// console.log('Tamanho total (com espaços):', nomeCompleto.length);
// console.log('Em maiúsculas:', nomeCompleto.toUpperCase());
// console.log('Primeira letra:', nomeSemEspacos.charAt(0)); 
// console.log('Sem espaços nas pontas:', nomeSemEspacos);

// const dado = Math.floor(Math.random() * 6) + 1;
// console.log(`A, você tirou ${dado}!`);


// const numeroSorteado = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
// console.log('Número sorteado entre 10 e 20:', numeroSorteado);


// console.log (0.1 + 0.2)


// const produto = await input({message: 'Nome do produto'});
// const precoUnitario = await number({message: 'Preço unitário (R$):'});
// const quantidade = await number({message: 'Quantidade'});
// const temCupom = await confirm({message:'Possui cupom de desconto (10%)?'});

// const parcelas = await select({
//     message: 'Número de parcelas',
//     choices:[
//         {name: '1x (À vista)', value: 1},
//         {name: '2x (sem Juros)', value: 2},
//         {name: '3x (sem Juros)', value:3},
//     ]
// });

// const subtotal = precoUnitario * quantidade;
// const valorDesconto = temCupom ? subtotal * 0.10 : 0;
// const total = subtotal - valorDesconto;
// const valorParcela = total / parcelas;

// const formatoMoeda = (valor) =>
//     valor.toLocalString('pr-Br', {style: 'currency', currency: 'BRL'});

// const separador = '='.repeat(40);


// Configuração para formatação da moeda em Real (PT-BR)
// const brl = { style: 'currency', currency: 'BRL' };

// async function executarProjeto() {
//   // 1. Coleta do Cliente
//   const cliente = await input({ 
//     message: 'Nome do cliente:', 
//     required: true 
//   });

//   // Lista para armazenar os produtos adicionados
//   const listaProdutos = [];
//   let adicionarMais = true;

//   // Loop para coletar a lista de produtos e quantidades
//   while (adicionarMais) {
//     console.log(`\n--- Produto ${listaProdutos.length + 1} ---`);

//     const nome = await input({ 
//       message: 'Nome do produto:', 
//       required: true 
//     });

//     const preco = await number({ 
//       message: 'Preço unitário:', 
//       min: 0, 
//       step: 'any', 
//       required: true 
//     });

//     const quantidade = await number({ 
//       message: 'Quantidade:', 
//       min: 1, 
//       step: 1, 
//       required: true, 
//       default: 1 
//     });

//     const subtotalItem = preco * quantidade;

//     // Adiciona o produto na lista
//     listaProdutos.push({ nome, preco, quantidade, subtotalItem });

//     // Pergunta se deseja adicionar mais algum produto
//     adicionarMais = await confirm({ 
//       message: 'Deseja adicionar outro produto?', 
//       default: false 
//     });
//   }

//   // Coleta de Cupom e Parcelas
//   const temCupom = await confirm({ 
//     message: 'Possui cupom de desconto (10%)?', 
//     default: false 
//   });

//   const parcelas = await select({
//     message: 'Forma de pagamento / Parcelas:',
//     choices: [
//       { name: 'À vista (1x)', value: 1 },
//       { name: '2x sem juros', value: 2 },
//       { name: '3x sem juros', value: 3 },
//       { name: '4x sem juros', value: 4 },
//       { name: '5x sem juros', value: 5 },
//       { name: '6x sem juros', value: 6 }
//     ]
//   });

//   // 2. Cálculos
//   // Subtotal geral somando todos os itens da lista
//   const subtotalGeral = listaProdutos.reduce((acc, item) => acc + item.subtotalItem, 0);

//   // Aplicação do desconto com operador ternário (10% de desconto se temCupom for true)
//   const percentualDesconto = temCupom ? 0.10 : 0;
//   const valorDesconto = subtotalGeral * percentualDesconto;
//   const total = subtotalGeral - valorDesconto;
//   const valorParcela = total / parcelas;

//   // Função auxiliar para formatar valores em Reais (pt-BR)
//   const formatarMoeda = (valor) => valor.toLocaleString('pt-BR', brl);

//   // 3. Imprimir Recibo no Terminal
//   const LARGURA = 50; // Largura total do recibo

//   console.log('\n' + '='.repeat(LARGURA));
//   console.log('RECIBO DE COMPRA'.padStart((LARGURA + 16) / 2).padEnd(LARGURA));
//   console.log('='.repeat(LARGURA));

//   console.log(`Cliente: ${cliente}`);
//   console.log('-'.repeat(LARGURA));

//   // Exibição da lista de produtos
//   console.log('PRODUTOS:'.padEnd(LARGURA));
//   listaProdutos.forEach((item, index) => {
//     const infoQtdPreco = `${item.quantidade}x ${formatarMoeda(item.preco)}`;
//     const totalItemStr = formatarMoeda(item.subtotalItem);

//     // Linha 1 do produto: Nome do item e total do item alinhado à direita
//     const linhaNome = `${index + 1}. ${item.nome}`;
//     const espacos = LARGURA - linhaNome.length - totalItemStr.length;
//     console.log(linhaNome + ' '.repeat(espacos > 0 ? espacos : 1) + totalItemStr);

//     // Linha 2 do produto: detalhe da quantidade
//     console.log(`   (${infoQtdPreco})`);
//   });

//   console.log('-'.repeat(LARGURA));

//   // Resumo Financeiro
//   const rotuloSubtotal = 'Subtotal:';
//   console.log(rotuloSubtotal + formatarMoeda(subtotalGeral).padStart(LARGURA - rotuloSubtotal.length));

//   const rotuloDesconto = `Desconto (${temCupom ? '10%' : '0%'}):`;
//   console.log(rotuloDesconto + `- ${formatarMoeda(valorDesconto)}`.padStart(LARGURA - rotuloDesconto.length));

//   const rotuloTotal = 'TOTAL:';
//   console.log(rotuloTotal + formatarMoeda(total).padStart(LARGURA - rotuloTotal.length));

//   console.log('-'.repeat(LARGURA));

//   const rotuloParcela = `Pagamento em ${parcelas}x de:`;
//   console.log(rotuloParcela + formatarMoeda(valorParcela).padStart(LARGURA - rotuloParcela.length));

//   console.log('='.repeat(LARGURA) + '\n');
// }

// executarProjeto();




// Verificar se um produto deverá aplicar - se um desconto
//   < condição >: Produtos com valor maior que 100 reais.
//     < aplica - se >: 15 % de desconto
//   < caso_não >:
// <aplica-se>: 5% de desconto


//   */
//   let produto = 'Microcontrolador PSI'
//   let preco = 99

// if(preco > 100){
//     console.log(`Foi aplicado um desconto de R$ ${preco * 0.15}`)
// console.log(`Valor Final R$ ${preco * (1 - 0.15)}`)
// }else{
//     console.log(`Foi aplicado um desconto de R$ ${preco * 0.05}`)
// console.log(`Valor Final R$ ${preco * (1 - 0.05)}`)
// }

/* 
  O algoritmo deverá receber uma velocidade capturada.
    - se velocidade for > 120km 
      - aplicar multa de 0.25 cents para cada km ultrapassado
    - se velocidade for > 80 km
      - aplicar multa de 0.15 cents para cada km ultrapassado
    - se velocidade for > 60 km
      - aplicar multa de 0.05 cents para cada km ultrapassado
    se velocidade for <= 60km
      - não aplica-se multa


*/

// const velocidade = await number({
//   message: 'Velocidade KM/h:',
//   min: 0
// })

// if(velocidade > 120){
//   console.log(`Veiculo Multado! R$ ${(velocidade-120)*0.25.toFixed(2)}`)

// }else if(velocidade >80){
//   console.log(`Veiculo Multado! R$ ${(velocidade-80)*0.15.toFixed(2)}`)

// }else if(velocidade >60){
//    console.log(`Veiculo Multado! R$ ${(velocidade-60)*0.05.toFixed(2)}`)
// }else{
//   console.log(`Veiculo no limite da via!`)
// }



// Atividdade de hoje começa a partir daqui //

/* Exercício 1 */

// const resposta = await input({ 
//   message: "Digite o valor da compra:" 
// });

// const valorCompra = Number(resposta);

// if (valorCompra >= 150) {
//   console.log("Frete grátis!");
// } else {
//   const total = valorCompra + 12;
//   console.log(`Frete: R$ 12,00 — Total: R$ ${total.toFixed(2)}`);
// }

/* Exercício 2 */

// const resposta = await input({
//   message: "Qual sua Idade ? :"
// });

// const idade = Number(resposta);

// if (idade >= 16) {
//   console.log("Entrada liberada");
// } else {
//   console.log("Entrada não permitida para menores de 16 anos");
// }

/* Exercício 3 */

// const senha = await input({
//   message: "Digite o número da senha:"

// });

// if (senha % 2 === 0){
//   console.log("Dirija-se ao Caixa 1");
// }else {
//   console.log("Dirija-se ao Caixa 2");
// }

/* Exercício 4 */

// const estoque = await input({
//   message: "Quantidade de pães em estoque:"

// });

// if (estoque <= 0){
//   console.log("Atenção: Estoque zerado!");
// }else if(estoque < 20) {
//   console.log("Atenção: faça novos pedidos!");
// }else {
//   console.log("Estoque ok");
// }

/* Exercício 5 */


// const nota1 = await number({ message: "Digite a nota 1:" });
// const nota2 = await number({ message: "Digite a nota 2:" });

// if (nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10) {
//   console.log("Nota inválida");
// } else {
//   const media = (nota1 + nota2) / 2;
//   const mediaFormatada = media.toFixed(1);

//   if (media >= 7.0) {
//     console.log(`Média: ${mediaFormatada} - Aprovado`);
//   } else if (media >= 5.0) {
//     console.log(`Média: ${mediaFormatada} - Recuperação`);
//   } else {
//     console.log(`Média: ${mediaFormatada} - Reprovado`);
//   }
// }


/* Exercício 6 */

// const treinos = await number({
//   message: "Quantos treinos por semana?"
// });

// if (treinos < 1 || treinos > 7) {
//   console.log("Quantidade inválida");
// } else if (treinos <= 2) {
//   console.log("Plano Básico - R$ 79,90");
// } else if (treinos <= 4) {
//   console.log("Plano Intermediário - R$ 99,90");
// } else {
//   console.log("Plano Livre - R$ 129,90");
// }


/* Exercício 7 */


// const valorInput = await input({ message: "Digite o valor da compra:" });

// const valorCompra = Number(valorInput.replace(",", "."));

// const ehCadastrado = await confirm({ message: "É cadastrado no programa de fidelidade?" });
// const idade = await number({ message: "Digite sua idade:" });

// let percentualDesconto = 0;

// const regraFidelidade = ehCadastrado && valorCompra > 100;
// const regraIdade = idade > 60;

// if (regraFidelidade && regraIdade) {
//   percentualDesconto = 10;
// } else if (regraFidelidade) {
//   percentualDesconto = 10;
// } else if (regraIdade) {
//   percentualDesconto = 5;
// }

// const valorDesconto = (valorCompra * percentualDesconto) / 100;
// const valorFinal = valorCompra - valorDesconto;

// console.log(`Desconto aplicado: ${percentualDesconto}%`);
// console.log(`Valor final: R$ ${valorFinal.toFixed(2)}`);



/* Exercício 8 */

// const temAtraso = await confirm({
//   message: "Possui livros atrasados?"
// });
// const livrosEmMaos = await number({
//   message: "Quantidade de livros em mãos:"
// });
// const ehProfessor = await confirm({
//   message: "Possui cadastro de professor?"
// });

// const limiteLivros = ehProfessor ? 5 : 3;

// if (temAtraso) {
//   console.log("Empréstimo recusado: leitor possui livros em atraso.");
// } else if (livrosEmMaos >= limiteLivros) {
//   console.log(`Empréstimo recusado: limite de ${limiteLivros} livros atingido.`);
// } else {
//   console.log("Empréstimo autorizado");
// }


// /* Exercício 1 */

// const nota = await number({
//   message: "Digite a nota final do aluno (0 a 10):",
//   validade: (value) =>{
//     if (value === undefined || value < 0 || value > 10){
//       return "Por favor, digite uma nota válida entre 0 e 10.";
//     }
//     return true;
//   }
// });




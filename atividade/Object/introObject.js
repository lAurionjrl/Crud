let animal = {
    especie:"Cachorro",
    peso: 20,
    idade: 5,
    nome: "Rex",
    dono: "Marquinhos Silva"
}

console.log(`
    Ficha do Paciente:

    Nome: ${animal["nome"]}
    Espécie: ${animal["especie"]}
    Peso: ${animal["peso"]}
    Idade: ${animal["idade"]}

    Dono: ${animal["dono"]}
    
    `)

// Crie um dicionário de um funcionário com pelo menos 5 informações e imprima na tela de maneira formatada.



let funcionario ={
    nome: "Marcos Silva",
    cargo: "Gerente",
    salario: 5000,
    dataNascimento: "12/09/1992",
    CPF:"123.459.875-48"
}

console.log(`
    Ficha do Funcionario:

    Nome: ${funcionario["nome"]}
    Cargo: ${funcionario["cargo"]}
    Salário: ${funcionario["salario"].toLocaleString("pt-BR",
    {style:"currency", currency:"BRL"})}
    DataNascimento: ${funcionario["dataNascimento"]}
    CPF: ${funcionario["cpf"]}
`)


// Crie um dicionário que contenha 10 pokemons

let pokemons = {
    eletrico: "Picachu",
    fogo: "Charizard",
    agua: "Blastoise",
    grama: "Venusaur",
    voador: "Pidgeot",
    lutador: "Lucario",
    normal: "Snorlax",
    Fantasma: "Gengar",
    Pedra: "Onix",
    psíquico: "Mew"
}

console.log(`
    Lista dos Pokemons:

    Elétrico: ${pokemons[eletrico]}
    Fogo: ${pokemons[fogo]}
    Água: ${pokemons[agua]}
    Grama: ${pokemons[grama]}
    Voador: ${pokemons[voador]}
    Lutador: ${pokemons[lutador]}
    Normal: ${pokemons[normal]}
    Fantasma: ${pokemons[fantasma]}
    Pedra: ${pokemons[pedra]}
    Psíquico: ${pokemons[psiquico]}   
`)




import { input, number } from '@inquirer/prompts';

async function controleGastos() {
    // 1. Comece com um dicionário vazio
    const gastos = {};

    // 2. Pergunte quantas categorias de gasto serão registradas
    const quantidade = await number({ message: 'Quantas categorias?' });

    // 3. Para cada categoria, peça o nome e o valor
    for (let i = 0; i < quantidade; i++) {
        const categoria = await input({ message: 'Categoria:' });
        const valor = await number({ message: 'Valor:' });

        // Tratamento para somar caso a categoria já exista (desafio extra)
        if (gastos[categoria]) {
            gastos[categoria] += valor;
        } else {
            gastos[categoria] = valor;
        }
    }

    // Exibição do cabeçalho
    console.log('\n----- GASTOS DO MÊS -----');

    let total = 0;
    let maiorCategoria = '';
    let maiorValor = -Infinity;

    // 4 e 5. Percorra o dicionário com for...in, calcule o total e descubra o maior gasto
    for (const chave in gastos) {
        const valorAtual = gastos[chave];
        
        console.log(`${chave}: R$ ${valorAtual.toFixed(2)}`);
        
        total += valorAtual;

        // Verifica qual foi o maior gasto
        if (valorAtual > maiorValor) {
            maiorValor = valorAtual;
            maiorCategoria = chave;
        }
    }

    // Exibe os resultados finais
    console.log(`Total gasto: R$ ${total.toFixed(2)}`);
    console.log(`Maior gasto: ${maiorCategoria} (R$ ${maiorValor.toFixed(2)})`);
}

controleGastos();
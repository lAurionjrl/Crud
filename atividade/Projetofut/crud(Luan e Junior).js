import { select, input, confirm } from '@inquirer/prompts';


/*
  Fontes: MDN > JavaScript > Reference > Global_Objects > Array (find, filter, map, sort, push)
          MDN > JavaScript > Reference > Global_Objects > RegExp > test
*/

let times = [];
let jogadores = [];
let partidas = [];

let idTime = 1;
let idJogador = 1;
let idPartida = 1;

const posicoes = ['Goleiro', 'Zagueiro', 'Lateral', 'Volante', 'Meio-campista', 'Atacante'];

// pega o nome do time pelo id
function nomeDoTime(id) {
  const time = times.find((t) => t.id === id);
  if (time) {
    return time.nome;
  }
  return '(time removido)';
}

// mostra os times

async function escolherTime(mensagem, ignorarId) {
  const lista = times.filter((t) => t.id !== ignorarId);

  if (lista.length === 0) {
    console.log('Nenhum time disponível. Cadastre times primeiro.');
    return null;
  }

  return await select({
    message: mensagem,
    choices: lista.map((t) => ({ name: `#${t.id} - ${t.nome}`, value: t.id })),
  });
}

async function escolherJogador() {
  if (jogadores.length === 0) {
    console.log('Nenhum jogador cadastrado.');
    return null;
  }

  return await select({
    message: 'Escolha o jogador:',
    choices: jogadores.map((j) => ({
      name: `#${j.id} - ${j.nome} (${j.posicao}, ${nomeDoTime(j.timeId)})`,
      value: j.id,
    })),
  });
}

// só aceita número inteiro (0 ou mais)
function validarNumero(texto) {
  if (/^\d+$/.test(texto.trim())) {
    return true;
  }
  return 'Digite um número inteiro (0 ou mais).';
}

function validarTexto(texto) {
  if (texto.trim() !== '') {
    return true;
  }
  return 'Esse campo é obrigatório.';
}

//TIMES 

async function cadastrarTime() {
  const nome = await input({ message: 'Nome do time:', validate: validarTexto });
  const cidade = await input({ message: 'Cidade:', validate: validarTexto });

  times.push({ id: idTime, nome: nome.trim(), cidade: cidade.trim() });
  idTime++;

  console.log('Time cadastrado!');
}

function listarTimes() {
  if (times.length === 0) {
    console.log('Nenhum time cadastrado.');
    return;
  }
  console.table(times);
}

async function atualizarTime() {
  const id = await escolherTime('Qual time quer atualizar?');
  if (id === null) return;

  const time = times.find((t) => t.id === id);

  time.nome = (await input({ message: 'Novo nome:', default: time.nome, validate: validarTexto })).trim();
  time.cidade = (await input({ message: 'Nova cidade:', default: time.cidade, validate: validarTexto })).trim();

  console.log('Time atualizado!');
}

async function removerTime() {
  const id = await escolherTime('Qual time quer remover?');
  if (id === null) return;

  const certeza = await confirm({
    message: 'Isso apaga também os jogadores e as partidas desse time. Continuar?',
    default: false,
  });
  if (!certeza) return;

  times = times.filter((t) => t.id !== id);
  jogadores = jogadores.filter((j) => j.timeId !== id);
  partidas = partidas.filter((p) => p.mandanteId !== id && p.visitanteId !== id);

  console.log('Time removido!');
}

async function menuTimes() {
  const opcao = await select({
    message: 'TIMES',
    choices: [
      { name: 'Cadastrar', value: 'cadastrar' },
      { name: 'Listar', value: 'listar' },
      { name: 'Atualizar', value: 'atualizar' },
      { name: 'Remover', value: 'remover' },
      { name: 'Voltar', value: 'voltar' },
    ],
  });

  if (opcao === 'cadastrar') await cadastrarTime();
  if (opcao === 'listar') listarTimes();
  if (opcao === 'atualizar') await atualizarTime();
  if (opcao === 'remover') await removerTime();
}

//JOGADORES 
async function cadastrarJogador() {
  const timeId = await escolherTime('Time do jogador:');
  if (timeId === null) return;

  const nome = await input({ message: 'Nome do jogador:', validate: validarTexto });
  const posicao = await select({
    message: 'Posição:',
    choices: posicoes.map((p) => ({ name: p, value: p })),
  });

  jogadores.push({ id: idJogador, nome: nome.trim(), posicao: posicao, timeId: timeId });
  idJogador++;

  console.log('Jogador cadastrado!');
}

function listarJogadores() {
  if (jogadores.length === 0) {
    console.log('Nenhum jogador cadastrado.');
    return;
  }

  // map: transforma cada jogador numa linha da tabela, trocando timeId pelo nome do time
  const tabela = jogadores.map((j) => ({
    id: j.id,
    nome: j.nome,
    posicao: j.posicao,
    time: nomeDoTime(j.timeId),
  }));
  console.table(tabela);
}

async function atualizarJogador() {
  const id = await escolherJogador();
  if (id === null) return;

  const jogador = jogadores.find((j) => j.id === id);

  jogador.nome = (await input({ message: 'Novo nome:', default: jogador.nome, validate: validarTexto })).trim();
  jogador.posicao = await select({
    message: 'Nova posição:',
    default: jogador.posicao,
    choices: posicoes.map((p) => ({ name: p, value: p })),
  });

  const novoTime = await escolherTime('Novo time:');
  if (novoTime !== null) {
    jogador.timeId = novoTime;
  }

  console.log('Jogador atualizado!');
}

async function removerJogador() {
  const id = await escolherJogador();
  if (id === null) return;

  const certeza = await confirm({ message: 'Tem certeza?', default: false });
  if (!certeza) return;

  jogadores = jogadores.filter((j) => j.id !== id);
  console.log('Jogador removido!');
}

async function menuJogadores() {
  const opcao = await select({
    message: 'JOGADORES',
    choices: [
      { name: 'Cadastrar', value: 'cadastrar' },
      { name: 'Listar', value: 'listar' },
      { name: 'Atualizar', value: 'atualizar' },
      { name: 'Remover', value: 'remover' },
      { name: 'Voltar', value: 'voltar' },
    ],
  });

  if (opcao === 'cadastrar') await cadastrarJogador();
  if (opcao === 'listar') listarJogadores();
  if (opcao === 'atualizar') await atualizarJogador();
  if (opcao === 'remover') await removerJogador();
}

//PARTIDAS 

async function cadastrarPartida() {
  if (times.length < 2) {
    console.log('Cadastre pelo menos 2 times primeiro.');
    return;
  }

  const mandanteId = await escolherTime('Time mandante:');
  // o segundo parâmetro tira o mandante da lista, pra um time não jogar contra ele mesmo
  const visitanteId = await escolherTime('Time visitante:', mandanteId);

  const golsMandante = await input({ message: `Gols do ${nomeDoTime(mandanteId)}:`, validate: validarNumero });
  const golsVisitante = await input({ message: `Gols do ${nomeDoTime(visitanteId)}:`, validate: validarNumero });

  partidas.push({
    id: idPartida,
    mandanteId: mandanteId,
    visitanteId: visitanteId,
    golsMandante: Number(golsMandante),
    golsVisitante: Number(golsVisitante),
  });
  idPartida++;

  console.log('Partida registrada!');
}

function listarPartidas() {
  if (partidas.length === 0) {
    console.log('Nenhuma partida cadastrada.');
    return;
  }

  const tabela = partidas.map((p) => ({
    id: p.id,
    mandante: nomeDoTime(p.mandanteId),
    placar: `${p.golsMandante} x ${p.golsVisitante}`,
    visitante: nomeDoTime(p.visitanteId),
  }));
  console.table(tabela);
}

// TODO (Junior): atualizarPartida()
// - se não tiver partida, avisar e sair (igual no escolherJogador)
// - escolher a partida com select (name: "Time A 2 x 1 Time B", value: id da partida)
// - achar a partida com find
// - pedir os novos gols com input (usar validate: validarNumero e default: String(gols antigos))
// - trocar golsMandante e golsVisitante (lembrar do Number())


// TODO (Junior): removerPartida()
// - escolher a partida com select
// - confirm pra perguntar se tem certeza
// - tirar do array com filter (olhar o removerJogador())

async function menuPartidas() {
  const opcao = await select({
    message: 'PARTIDAS',
    choices: [
      { name: 'Cadastrar', value: 'cadastrar' },
      { name: 'Listar', value: 'listar' },
      { name: 'Atualizar placar', value: 'atualizar' },
      { name: 'Remover', value: 'remover' },
      { name: 'Voltar', value: 'voltar' },
    ],
  });

  if (opcao === 'cadastrar') await cadastrarPartida();
  if (opcao === 'listar') listarPartidas();
  // TODO (Junior): trocar as duas linhas abaixo pela chamada das funções que ele vai criar
  if (opcao === 'atualizar') console.log('Falta fazer: atualizarPartida()');
  if (opcao === 'remover') console.log('Falta fazer: removerPartida()');
}

//PONTUAÇÃO 

// TODO (Junior): mostrarPontuacao()
// - se não tiver time cadastrado, avisar e sair
// - criar uma tabela com um objeto por time: { time: nome, pontos: 0, jogos: 0, vitorias: 0, empates: 0, derrotas: 0, saldoGols: 0 }
//   (dica: times.map(...) cria isso rapidinho, guardar o id do time pra achar depois)
// - passar por todas as partidas (for...of) e pra cada uma:
//     achar a linha do mandante e a do visitante na tabela (find)
//     somar 1 em "jogos" nos dois
//     somar o saldo de gols (mandante: golsMandante - golsVisitante, visitante é o contrário)
//     se golsMandante > golsVisitante: mandante +1 vitória e +3 pontos, visitante +1 derrota
//     se for menor: o contrário
//     se for igual: os dois +1 empate e +1 ponto
// - ordenar com sort: do maior pra menor em pontos, e se empatar, pelo saldoGols
// - mostrar com console.table
// - depois, na função main() lá embaixo, chamar ela na opção 'pontuacao'

//MENU PRINCIPAL 

async function main() {
  console.log('=== CAMPEONATO DE FUTEBOL ===');

  let rodando = true;

  while (rodando) {
    const opcao = await select({
      message: 'Menu principal',
      choices: [
        { name: 'Times', value: 'times' },
        { name: 'Jogadores', value: 'jogadores' },
        { name: 'Partidas', value: 'partidas' },
        { name: 'Pontuação', value: 'pontuacao' },
        { name: 'Sair', value: 'sair' },
      ],
    });

    if (opcao === 'times') await menuTimes();
    if (opcao === 'jogadores') await menuJogadores();
    if (opcao === 'partidas') await menuPartidas();
    if (opcao === 'pontuacao') console.log('Falta fazer: mostrarPontuacao()');
    if (opcao === 'sair') rodando = false;
  }

  console.log('Até logo!');
}

main();

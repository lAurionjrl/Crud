import { input } from '@inquirer/prompts';

let times = [];
let jogadores = [];
let partidas = [];
let proximoId = { time: 1, jogador: 1, partida: 1 };

const POSICOES = ['Goleiro', 'Zagueiro', 'Lateral', 'Volante', 'Meio-campista', 'Atacante'];

const obrigatorio = (v) => v.trim() !== '' || 'Campo obrigatório.';
const golsAleatorios = () => Math.floor(Math.random() * 6);
const numeroEntre = (min, max) => (v) =>
  (/^\d+$/.test(v.trim()) && Number(v) >= min && Number(v) <= max) || `Digite um número entre ${min} e ${max}.`;

function buscar(lista, id) {
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].id === id) return lista[i];
  }
  return undefined;
}

function nomeTime(id) {
  const t = buscar(times, id);
  return t ? t.nome : '(removido)';
}

async function escolher(msg, opcoes) {
  console.log(`\n${msg}`);
  for (let i = 0; i < opcoes.length; i++) {
    console.log(`  ${i + 1} - ${opcoes[i].name}`);
  }
  const resposta = await input({ message: 'Digite o número da opção:', validate: numeroEntre(1, opcoes.length) });
  return opcoes[Number(resposta) - 1].value;
}

async function confirmar(msg) {
  const resposta = await escolher(msg, [
    { name: 'Sim', value: true },
    { name: 'Não', value: false },
  ]);
  return resposta;
}

async function escolherTime(msg, ignorarId) {
  const lista = times.filter((t) => t.id !== ignorarId);
  if (lista.length === 0) {
    console.log('\nNenhum time disponível.\n');
    return null;
  }
  const choices = [];
  for (const t of lista) {
    choices.push({ name: `#${t.id} - ${t.nome}`, value: t.id });
  }
  return escolher(msg, choices);
}

async function escolherPosicao(msg) {
  const choices = [];
  for (const p of POSICOES) {
    choices.push({ name: p, value: p });
  }
  return escolher(msg, choices);
}

async function escolherJogador() {
  if (jogadores.length === 0) {
    console.log('\nNenhum jogador cadastrado.\n');
    return null;
  }
  const choices = [];
  for (const j of jogadores) {
    choices.push({
      name: `#${j.id} - ${j.nome} (${j.posicao}, ${nomeTime(j.timeId)})`,
      value: j.id,
    });
  }
  return escolher('Escolha o jogador:', choices);
}

async function escolherPartida() {
  if (partidas.length === 0) {
    console.log('\nNenhuma partida cadastrada.\n');
    return null;
  }
  const choices = [];
  for (const p of partidas) {
    choices.push({
      name: `#${p.id} - ${nomeTime(p.mandanteId)} ${p.golsMandante} x ${p.golsVisitante} ${nomeTime(p.visitanteId)}`,
      value: p.id,
    });
  }
  return escolher('Escolha a partida:', choices);
}

const menuCrud = (titulo, nome) =>
  escolher(titulo, [
    { name: `Cadastrar ${nome}`, value: 'criar' },
    { name: `Listar ${nome}s`, value: 'listar' },
    { name: `Atualizar ${nome}`, value: 'atualizar' },
    { name: `Remover ${nome}`, value: 'remover' },
    { name: 'Voltar', value: 'voltar' },
  ]);

async function menuTimes() {
  const op = await menuCrud('TIMES', 'time');

  if (op === 'criar') {
    const nome = (await input({ message: 'Nome do time:', validate: obrigatorio })).trim();
    const cidade = (await input({ message: 'Cidade:', validate: obrigatorio })).trim();
    times.push({ id: proximoId.time++, nome, cidade });
    console.log('\nTime cadastrado!\n');
  }

  if (op === 'listar') {
    if (times.length === 0) console.log('\nNenhum time cadastrado.\n');
    else console.table(times);
  }

  if (op === 'atualizar') {
    const id = await escolherTime('Qual time atualizar?');
    if (id === null) return;
    const t = buscar(times, id);
    t.nome = (await input({ message: 'Novo nome:', default: t.nome, validate: obrigatorio })).trim();
    t.cidade = (await input({ message: 'Nova cidade:', default: t.cidade, validate: obrigatorio })).trim();
    console.log('\nTime atualizado!\n');
  }

  if (op === 'remover') {
    const id = await escolherTime('Qual time remover?');
    if (id === null) return;
    if (!(await confirmar('Remove também jogadores e partidas do time. Continuar?'))) return;
    times = times.filter((t) => t.id !== id);
    jogadores = jogadores.filter((j) => j.timeId !== id);
    partidas = partidas.filter((p) => p.mandanteId !== id && p.visitanteId !== id);
    console.log('\nTime removido!\n');
  }
}

async function menuJogadores() {
  const op = await menuCrud('JOGADORES', 'jogador');

  if (op === 'criar') {
    const timeId = await escolherTime('Time do jogador:');
    if (timeId === null) return;
    const nome = (await input({ message: 'Nome do jogador:', validate: obrigatorio })).trim();
    const posicao = await escolherPosicao('Posição:');
    jogadores.push({ id: proximoId.jogador++, nome, posicao, timeId });
    console.log('\nJogador cadastrado!\n');
  }

  if (op === 'listar') {
    if (jogadores.length === 0) console.log('\nNenhum jogador cadastrado.\n');
    else {
      const tabela = [];
      for (const j of jogadores) {
        tabela.push({ id: j.id, nome: j.nome, posicao: j.posicao, time: nomeTime(j.timeId) });
      }
      console.table(tabela);
    }
  }

  if (op === 'atualizar') {
    const id = await escolherJogador();
    if (id === null) return;
    const j = buscar(jogadores, id);
    j.nome = (await input({ message: 'Novo nome:', default: j.nome, validate: obrigatorio })).trim();
    j.posicao = await escolherPosicao('Nova posição:');

    const novoTime = await escolherTime('Novo time:');
    if (novoTime !== null) j.timeId = novoTime;
    console.log('\nJogador atualizado!\n');
  }

  if (op === 'remover') {
    const id = await escolherJogador();
    if (id === null) return;
    if (!(await confirmar('Confirma a remoção?'))) return;
    jogadores = jogadores.filter((j) => j.id !== id);
    console.log('\nJogador removido!\n');
  }
}

async function menuPartidas() {
  const op = await menuCrud('PARTIDAS', 'partida');

  if (op === 'criar') {
    if (times.length < 2) {
      console.log('\nCadastre pelo menos 2 times primeiro.\n');
      return;
    }
    const mandanteId = await escolherTime('Time mandante:');
    const visitanteId = await escolherTime('Time visitante:', mandanteId);
    const golsMandante = golsAleatorios();
    const golsVisitante = golsAleatorios();
    partidas.push({ id: proximoId.partida++, mandanteId, visitanteId, golsMandante, golsVisitante });
    console.log(
      `\nPartida registrada: ${nomeTime(mandanteId)} ${golsMandante} x ${golsVisitante} ${nomeTime(visitanteId)}\n`
    );
  }

  if (op === 'listar') {
    if (partidas.length === 0) console.log('\nNenhuma partida cadastrada.\n');
    else {
      const tabela = [];
      for (const p of partidas) {
        tabela.push({
          id: p.id,
          mandante: nomeTime(p.mandanteId),
          placar: `${p.golsMandante} x ${p.golsVisitante}`,
          visitante: nomeTime(p.visitanteId),
        });
      }
      console.table(tabela);
    }
  }

  if (op === 'atualizar') {
    const id = await escolherPartida();
    if (id === null) return;
    const p = buscar(partidas, id);
    p.golsMandante = golsAleatorios();
    p.golsVisitante = golsAleatorios();
    console.log(
      `\nPlacar atualizado: ${nomeTime(p.mandanteId)} ${p.golsMandante} x ${p.golsVisitante} ${nomeTime(p.visitanteId)}\n`
    );
  }

  if (op === 'remover') {
    const id = await escolherPartida();
    if (id === null) return;
    if (!(await confirmar('Confirma a remoção?'))) return;
    partidas = partidas.filter((p) => p.id !== id);
    console.log('\nPartida removida!\n');
  }
}

function mostrarPontuacao() {
  if (times.length === 0) {
    console.log('\nNenhum time cadastrado.\n');
    return;
  }

  const tabela = [];
  for (const t of times) {
    tabela.push({
      time: t.nome,
      pontos: 0,
      jogos: 0,
      vitorias: 0,
      empates: 0,
      derrotas: 0,
      saldoGols: 0,
      id: t.id,
    });
  }
  const linha = (id) => buscar(tabela, id);

  for (const p of partidas) {
    const m = linha(p.mandanteId);
    const v = linha(p.visitanteId);
    m.jogos++;
    v.jogos++;
    m.saldoGols += p.golsMandante - p.golsVisitante;
    v.saldoGols += p.golsVisitante - p.golsMandante;

    if (p.golsMandante > p.golsVisitante) {
      m.vitorias++;
      m.pontos += 3;
      v.derrotas++;
    } else if (p.golsMandante < p.golsVisitante) {
      v.vitorias++;
      v.pontos += 3;
      m.derrotas++;
    } else {
      m.empates++;
      v.empates++;
      m.pontos++;
      v.pontos++;
    }
  }

  tabela.sort((a, b) => b.pontos - a.pontos || b.saldoGols - a.saldoGols);

  const classificacao = [];
  for (let i = 0; i < tabela.length; i++) {
    const { id, ...resto } = tabela[i];
    classificacao.push({ posicao: i + 1, ...resto });
  }
  console.log('\n=== CLASSIFICAÇÃO ===');
  console.table(classificacao);
}

async function main() {
  console.log('\n⚽ CAMPEONATO DE FUTEBOL ⚽\n');

  while (true) {
    const opcao = await escolher('Menu principal', [
      { name: 'Times', value: 'times' },
      { name: 'Jogadores', value: 'jogadores' },
      { name: 'Partidas', value: 'partidas' },
      { name: 'Pontuação', value: 'pontuacao' },
      { name: 'Sair', value: 'sair' },
    ]);

    if (opcao === 'sair') break;
    if (opcao === 'times') await menuTimes();
    if (opcao === 'jogadores') await menuJogadores();
    if (opcao === 'partidas') await menuPartidas();
    if (opcao === 'pontuacao') mostrarPontuacao();
  }

  console.log('\nAté logo!\n');
}

main().catch((erro) => {
  if (erro?.name === 'ExitPromptError') console.log('\nPrograma encerrado.\n');
  else console.error(erro);
});1

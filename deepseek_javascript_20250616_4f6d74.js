let alimentos = [];
let caminhoes = [];
let pontuacao = 0;

function setup() {
  let canvas = createCanvas(800, 400);
  canvas.parent('sketch-holder');

  // Cria alimentos no campo
  for (let i = 0; i < 5; i++) {
    alimentos.push({
      x: random(100, 300),
      y: random(100, 300),
      tipo: ["🍎", "🌽", "🥕", "🍞", "🥛"][i],
      transportado: false
    });
  }

  // Cria caminhões
  for (let i = 0; i < 3; i++) {
    caminhoes.push({
      x: 350,
      y: 150 + i * 100,
      carga: null,
      velocidade: random(1, 3)
    });
  }
}

function draw() {
  background(240);

  // Desenha CAMPO (lado esquerdo)
  fill(34, 139, 34);
  rect(50, 50, 300, 300);
  fill(255);
  textSize(24);
  text("CAMPO", 160, 30);

  // Desenha CIDADE (lado direito)
  fill(169, 169, 169);
  rect(450, 50, 300, 300);
  fill(255);
  text("CIDADE", 560, 30);

  // Desenha alimentos no campo
  for (let alimento of alimentos) {
    if (!alimento.transportado) {
      textSize(30);
      text(alimento.tipo, alimento.x, alimento.y);
    }
  }

  // Desenha caminhões e movimentação
  for (let caminhao of caminhoes) {
    fill(255, 215, 0);
    rect(caminhao.x, caminhao.y, 60, 30);
    fill(0);
    textSize(20);
    text("🚛", caminhao.x + 15, caminhao.y + 20);

    // Se o caminhão está carregando algo
    if (caminhao.carga) {
      textSize(25);
      text(caminhao.carga.tipo, caminhao.x + 10, caminhao.y - 10);
    }

    // Movimentação automática
    if (caminhao.carga) {
      caminhao.x += caminhao.velocidade;
      if (caminhao.x > 700) {
        caminhao.carga.transportado = true;
        caminhao.carga = null;
        pontuacao++;
      }
    } else {
      caminhao.x -= caminhao.velocidade;
      if (caminhao.x < 100) caminhao.x = 100;
    }
  }

  // Mostra pontuação
  fill(0);
  textSize(20);
  text(`Alimentos entregues: ${pontuacao}/5`, 350, 380);

  // Mensagem de conclusão
  if (pontuacao >= 5) {
    fill(0, 100, 0);
    textSize(32);
    text("✅ Todos alimentos chegaram à cidade!", 200, 200);
  }
}

function mousePressed() {
  // Verifica se clicou em um alimento no campo
  for (let alimento of alimentos) {
    if (!alimento.transportado && dist(mouseX, mouseY, alimento.x, alimento.y) < 20) {
      // Verifica se há caminhão disponível
      for (let caminhao of caminhoes) {
        if (!caminhao.carga && caminhao.x < 200) {
          caminhao.carga = alimento;
          break;
        }
      }
    }
  }
}
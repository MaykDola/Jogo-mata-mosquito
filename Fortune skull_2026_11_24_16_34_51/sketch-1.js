let jogo;

function preload() {
  Mosquito.carregarImagem();   // método estático
  Jogo.carregarImagens();      // método estático
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cursor("assets/mata_mosquito.png", 30, 30);
  jogo = new Jogo();
}

function draw() {
  jogo.atualizar();
  jogo.desenhar();
}

function mousePressed() {
  jogo.clique(mouseX, mouseY);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  jogo.reposicionar();
}

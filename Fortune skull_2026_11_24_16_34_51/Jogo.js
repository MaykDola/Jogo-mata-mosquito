// Controla o estado do jogo (menu, jogando, vitória, derrota).
class Jogo {
  // Constantes ESTÁTICAS
  static VIDAS_INICIAIS = 3;
  static DURACAO_SEGUNDOS = 15;
  static #imagens = {};

  static carregarImagens() {
    const nomes = ["bg", "game", "game_over", "vitoria", "coracao_cheio", "coracao_vazio"];
    for (const n of nomes) {
      Jogo.#imagens[n] = loadImage(`assets/${n}.${n === "bg" ? "jpg" : "png"}`);
    }
  }

  #estado = "menu";
  #nivel = null;
  #mosquito = null;
  #vidas = 0;
  #abatidos = 0;
  #inicio = 0;
  #ultimoSpawn = 0;
  #botoes = [];

  constructor() {
    this.#montarBotoes();
  }

  // ---------- métodos PRIVADOS (#) ----------
  #montarBotoes() {
    if (this.#estado === "menu") {
      this.#botoes = Nivel.todos.map(n => new Botao(n.nome, () => this.iniciar(n)));
    } else {
      this.#botoes = [new Botao("Reiniciar", () => this.#irParaMenu())];
    }
    this.reposicionar();
  }

  #irParaMenu() {
    this.#estado = "menu";
    this.#mosquito = null;
    this.#montarBotoes();
  }

  #criarMosquito() {
    // POLIMORFISMO: a variável guarda "um Mosquito", seja normal ou rápido.
    this.#mosquito = random() < this.#nivel.chanceRapido
      ? new MosquitoRapido()
      : new Mosquito();
  }

  #perderVida() {
    this.#vidas--;
    if (this.#vidas <= 0) this.#terminar("derrota");
  }

  #terminar(estado) {
    this.#estado = estado;
    this.#mosquito = null;
    this.#montarBotoes();
  }

  #segundosRestantes() {
    return max(0, Jogo.DURACAO_SEGUNDOS - floor((millis() - this.#inicio) / 1000));
  }

  // ---------- métodos PÚBLICOS ----------
  iniciar(nivel) {
    this.#nivel = nivel;
    this.#estado = "jogando";
    this.#vidas = Jogo.VIDAS_INICIAIS;
    this.#abatidos = 0;
    this.#mosquito = null;
    this.#inicio = millis();
    this.#ultimoSpawn = millis();
    this.#botoes = [];
  }

  reposicionar() {
    const tam = this.#tamanhoImagem();
    let y = 20 + tam + 20;
    for (const b of this.#botoes) { b.posicionar(width / 2, y); y += 56; }
  }

  #tamanhoImagem() { return min(400, height * 0.45); }

  atualizar() {
    if (this.#estado !== "jogando") return;

    if (this.#segundosRestantes() <= 0) { this.#terminar("vitoria"); return; }

    if (millis() - this.#ultimoSpawn >= this.#nivel.intervalo) {
      if (this.#mosquito) this.#perderVida(); // o anterior escapou
      if (this.#estado !== "jogando") return;
      this.#criarMosquito();
      this.#ultimoSpawn = millis();
    }
    if (this.#mosquito) this.#mosquito.atualizar();
  }

  desenhar() {
    image(Jogo.#imagens.bg, 0, 0, width, height);
    if (this.#estado === "jogando") this.#desenharPartida();
    else this.#desenharTela();
  }

  #desenharTela() {
    const chave = { menu: "game", vitoria: "vitoria", derrota: "game_over" }[this.#estado];
    const t = this.#tamanhoImagem();
    imageMode(CORNER);
    image(Jogo.#imagens[chave], width / 2 - t / 2, 20, t, t);
    this.#botoes.forEach(b => b.desenhar());
  }

  #desenharPartida() {
    if (this.#mosquito) this.#mosquito.desenhar();

    // painel inferior esquerdo (HUD)
    push();
    noStroke(); fill(255, 255, 255, 180);
    rect(0, height - 60, 300, 60);
    imageMode(CORNER);
    for (let i = 0; i < Jogo.VIDAS_INICIAIS; i++) {
      const img = i < this.#vidas ? "coracao_cheio" : "coracao_vazio";
      image(Jogo.#imagens[img], 10 + i * 34, height - 45);
    }
    fill(0); textSize(18); textStyle(BOLD); textAlign(LEFT, CENTER);
    text(`Tempo: ${this.#segundosRestantes()}`, 120, height - 40);
    text(`Abatidos: ${this.#abatidos}`, 120, height - 18);
    pop();
  }

  clique(px, py) {
    if (this.#estado === "jogando") {
      if (this.#mosquito && this.#mosquito.foiClicado(px, py)) {
        this.#mosquito = null;
        this.#abatidos++;
      }
    } else {
      this.#botoes.some(b => b.clicar(px, py));
    }
  }
}

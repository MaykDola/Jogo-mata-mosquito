// HERANÇA: Mosquito herda x, y e os métodos de Entidade.
class Mosquito extends Entidade {
  // ATRIBUTOS ESTÁTICOS: pertencem à classe, não a cada objeto.
  static TAMANHOS = [50, 70, 90];     // público
  static imagem;                      // público (carregada no preload)
  static #totalCriados = 0;           // estático E privado

  // MÉTODOS ESTÁTICOS: chamados na classe: Mosquito.carregarImagem()
  static carregarImagem() {
    Mosquito.imagem = loadImage("assets/mosquito.png");
  }
  static get totalCriados() {
    return Mosquito.#totalCriados;
  }

  // Atributos privados de cada objeto
  #tamanho;
  #espelhado;

  constructor() {
    const tamanho = random(Mosquito.TAMANHOS);
    super(random(0, width - tamanho), random(0, height - tamanho));
    this.#tamanho = tamanho;
    this.#espelhado = random() < 0.5;
    Mosquito.#totalCriados++;
  }

  get tamanho() { return this.#tamanho; }

  // Método público: o clique acertou o mosquito?
  foiClicado(px, py) {
    return px >= this.x && px <= this.x + this.#tamanho &&
           py >= this.y && py <= this.y + this.#tamanho;
  }

  desenhar() {
    push();
    imageMode(CENTER);
    translate(this.x + this.#tamanho / 2, this.y + this.#tamanho / 2);
    if (this.#espelhado) scale(-1, 1);
    image(Mosquito.imagem, 0, 0, this.#tamanho, this.#tamanho);
    pop();
  }
}

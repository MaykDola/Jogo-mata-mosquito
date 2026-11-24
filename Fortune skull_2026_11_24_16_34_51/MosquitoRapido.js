// Herança em 2º nível: MosquitoRapido -> Mosquito -> Entidade.
class MosquitoRapido extends Mosquito {
  #vx;
  #vy;

  constructor() {
    super(); // chama o construtor de Mosquito
    this.#vx = random([-1, 1]) * random(3, 6);
    this.#vy = random([-1, 1]) * random(3, 6);
  }

  // SOBRESCRITA (override) + POLIMORFISMO: o Jogo chama atualizar()
  // em qualquer mosquito, e este tipo se move enquanto o normal fica parado.
  atualizar() {
    this.x += this.#vx;
    this.y += this.#vy;
    if (this.x < 0 || this.x > width - this.tamanho) this.#vx *= -1;
    if (this.y < 0 || this.y > height - this.tamanho) this.#vy *= -1;
  }

  desenhar() {
    push();
    tint(255, 110, 110); // fica avermelhado para o jogador reconhecer
    super.desenhar();    // reaproveita o desenho da classe pai
    pop();
  }
}

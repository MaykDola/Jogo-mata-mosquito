class Botao {
  #texto;
  #acao;
  constructor(texto, acao) {
    this.#texto = texto;
    this.#acao = acao;
    this.x = 0; this.y = 0; this.w = 220; this.h = 44;
  }
  posicionar(x, y) { this.x = x - this.w / 2; this.y = y; }
  #mouseEmCima() {
    return mouseX >= this.x && mouseX <= this.x + this.w &&
           mouseY >= this.y && mouseY <= this.y + this.h;
  }
  desenhar() {
    push();
    fill(this.#mouseEmCima() ? "#e04a4a" : "#c0392b");
    noStroke();
    rect(this.x, this.y, this.w, this.h, 8);
    fill(255); textAlign(CENTER, CENTER); textSize(20);
    text(this.#texto, this.x + this.w / 2, this.y + this.h / 2);
    pop();
  }
  clicar(px, py) {
    if (this.#mouseEmCima()) { this.#acao(); return true; }
    return false;
  }
}

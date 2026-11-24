// Cada nível é um objeto único e imutável, guardado em atributos ESTÁTICOS.
class Nivel {
  static NORMAL      = new Nivel("Normal", 1500, 0);
  static DIFICIL     = new Nivel("Difícil", 1000, 0.3);
  static CHUCK_NORRIS = new Nivel("Chuck Norris", 750, 0.6);

  static get todos() {
    return [Nivel.NORMAL, Nivel.DIFICIL, Nivel.CHUCK_NORRIS];
  }

  #nome;
  #intervalo;      // ms entre o surgimento de mosquitos
  #chanceRapido;   // 0 a 1

  constructor(nome, intervalo, chanceRapido) {
    this.#nome = nome;
    this.#intervalo = intervalo;
    this.#chanceRapido = chanceRapido;
  }

  get nome() { return this.#nome; }
  get intervalo() { return this.#intervalo; }
  get chanceRapido() { return this.#chanceRapido; }
}

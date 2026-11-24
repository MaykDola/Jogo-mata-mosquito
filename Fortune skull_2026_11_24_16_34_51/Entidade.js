// CLASSE ABSTRATA: serve de base para tudo que existe na tela do jogo.
// Não pode ser instanciada diretamente (new Entidade() gera erro).
class Entidade {
  // Atributos PRIVADOS (#): só podem ser acessados dentro desta classe.
  #x;
  #y;

  constructor(x, y) {
    if (new.target === Entidade) {
      throw new Error("Entidade é abstrata: use uma subclasse (ex.: Mosquito).");
    }
    this.#x = x;
    this.#y = y;
  }

  // Getters/setters PÚBLICOS: forma controlada de acessar os atributos privados.
  get x() { return this.#x; }
  set x(valor) { this.#x = valor; }
  get y() { return this.#y; }
  set y(valor) { this.#y = valor; }

  // Métodos que as subclasses devem sobrescrever (polimorfismo).
  atualizar() {}
  desenhar() {
    throw new Error("desenhar() precisa ser implementado na subclasse.");
  }
}

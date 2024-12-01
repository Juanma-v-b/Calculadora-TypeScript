class Calculator {
  private resultado: HTMLInputElement;
  private mostrar: HTMLElement;
  private contenedorHistorial: HTMLElement;
  private historial: HTMLInputElement;
  private operaciones: HTMLElement;
  private datosHistorial: string[];
  private operadores: string[] = ["+", "-", "*", "/", "."];
  private anteriorOpera: string = "";
  private anteriorResult: string = "";

  constructor() {
    this.resultado = document.querySelector("#result") as HTMLInputElement;
    this.mostrar = document.querySelector(".mostrar") as HTMLElement;
    this.contenedorHistorial = document.querySelector(
      ".container-historial"
    ) as HTMLElement;
    this.historial = document.querySelector("#historial") as HTMLInputElement;
    this.operaciones = document.querySelector(".operaciones") as HTMLElement;

    this.datosHistorial = JSON.parse(localStorage.getItem("historial") || "[]");

    this.contenedorHistorial.style.display = "none";

    this.initializeEventListeners();
    this.mostrarHistorial();
  }

  // Inicializa los event listeners para los botones
  private initializeEventListeners() {
    // Científica
    const btnCientifica = document.querySelector(
      ".btn-cientifica"
    ) as HTMLElement;
    const cientifica = document.querySelector(
      ".cont-cientifica"
    ) as HTMLElement;
    btnCientifica.addEventListener("click", () => {
      cientifica.classList.toggle("cientifica-block");
    });

    // Botón Mostrar Historial
    this.mostrar.addEventListener("click", () => this.toggleHistorial());
  }

  public enviarNumero(numero: string): void {
    this.resultado.value += numero;
  }

  public operar(operador: string): void {
    if (operador === "pi") {
      this.resultado.value += Math.PI;
      return;
    }

    if (operador === "euler") {
      this.resultado.value += Math.E;
      return;
    }

    if (operador === "raiz") {
      this.resultado.value = Math.sqrt(Number(this.resultado.value)).toString();
      return;
    }

    if (operador === "potencia") {
      this.resultado.value = Math.pow(
        Number(this.resultado.value),
        2
      ).toString();
      return;
    }

    if (operador === "coseno") {
      this.resultado.value = Math.cos(
        (Number(this.resultado.value) * Math.PI) / 180
      ).toString();
      return;
    }

    if (operador === "tangente") {
      this.resultado.value = Math.tan(
        (Number(this.resultado.value) * Math.PI) / 180
      ).toString();
      return;
    }

    // Si el último caracter es un operador, no permite agregar otro operador
    const ultimoCaracter = this.resultado.value.slice(-1);
    if (this.operadores.indexOf(ultimoCaracter) !== -1) {
      return;
    }

    this.resultado.value += operador;
  }

  // Resolver se produce al presionar el boton '=', resuelve el contenido del input
  public resolver(): void {
    if (this.resultado.value !== "") {
      if (this.datosHistorial.length !== 0) {
        this.operaciones.innerHTML = "";
      }

      this.anteriorOpera = this.resultado.value;
      try {
        this.resultado.value = eval(this.resultado.value);
        this.anteriorResult = this.resultado.value.toString();
        this.historial.value = `${this.anteriorOpera} = ${this.anteriorResult}`;
        this.datosHistorial.push(this.historial.value);
        localStorage.setItem("historial", JSON.stringify(this.datosHistorial));
        this.operaciones.innerHTML += `<p>${this.historial.value}</p>`;
      } catch (error) {
        this.resultado.value = "Error";
      }
    }

    this.mostrarHistorial();
  }

  private mostrarHistorial(): void {
    if (this.datosHistorial.length === 0) {
      this.operaciones.innerHTML = "<p>No hay datos en memoria</p>";
    } else {
      this.operaciones.innerHTML = "";
      this.datosHistorial.forEach((item) => {
        this.operaciones.innerHTML += `<p>${item}</p>`;
      });
    }
  }

  public borrar(): void {
    this.resultado.value = "";
  }

  public borrarHistorial(): void {
    localStorage.clear();
    this.datosHistorial = [];
    this.operaciones.innerHTML = "<p>No hay datos en memoria</p>";
  }

  // Toggle para mostrar u ocultar el panel
  private toggleHistorial(): void {
    this.mostrar.classList.toggle("visible");
    this.contenedorHistorial.style.display = this.mostrar.classList.contains(
      "visible"
    )
      ? "block"
      : "none";
  }
}

// Instanciamos la calculadora
const calculadora = new Calculator();

function enviarNumero(numero: string) {
  calculadora.enviarNumero(numero);
}

function operar(operador: string) {
  calculadora.operar(operador);
}

function resolver() {
  calculadora.resolver();
}

function borrar() {
  calculadora.borrar();
}

function borrarHistorial() {
  calculadora.borrarHistorial();
}

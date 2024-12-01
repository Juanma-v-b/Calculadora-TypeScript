var Calculator = /** @class */ (function () {
    function Calculator() {
        this.operadores = ["+", "-", "*", "/", "."];
        this.anteriorOpera = "";
        this.anteriorResult = "";
        this.resultado = document.querySelector("#result");
        this.mostrar = document.querySelector(".mostrar");
        this.contenedorHistorial = document.querySelector(".container-historial");
        this.historial = document.querySelector("#historial");
        this.operaciones = document.querySelector(".operaciones");
        this.datosHistorial = JSON.parse(localStorage.getItem("historial") || "[]");
        this.contenedorHistorial.style.display = "none";
        this.initializeEventListeners();
        this.mostrarHistorial();
    }
    // Inicializa los event listeners para los botones
    Calculator.prototype.initializeEventListeners = function () {
        var _this = this;
        // Científica
        var btnCientifica = document.querySelector(".btn-cientifica");
        var cientifica = document.querySelector(".cont-cientifica");
        btnCientifica.addEventListener("click", function () {
            cientifica.classList.toggle("cientifica-block");
        });
        // Botón Mostrar Historial
        this.mostrar.addEventListener("click", function () { return _this.toggleHistorial(); });
    };
    // Función para enviar número
    Calculator.prototype.enviarNumero = function (numero) {
        this.resultado.value += numero;
    };
    // Función para operar
    Calculator.prototype.operar = function (operador) {
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
            this.resultado.value = Math.pow(Number(this.resultado.value), 2).toString();
            return;
        }
        if (operador === "coseno") {
            this.resultado.value = Math.cos((Number(this.resultado.value) * Math.PI) / 180).toString();
            return;
        }
        if (operador === "tangente") {
            this.resultado.value = Math.tan((Number(this.resultado.value) * Math.PI) / 180).toString();
            return;
        }
        // Si el último caracter es un operador, no permite agregar otro operador
        var ultimoCaracter = this.resultado.value.slice(-1);
        if (this.operadores.indexOf(ultimoCaracter) !== -1) {
            return;
        }
        this.resultado.value += operador;
    };
    // Resolver la expresión matemática
    Calculator.prototype.resolver = function () {
        if (this.resultado.value !== "") {
            if (this.datosHistorial.length !== 0) {
                this.operaciones.innerHTML = "";
            }
            this.anteriorOpera = this.resultado.value;
            try {
                this.resultado.value = eval(this.resultado.value);
                this.anteriorResult = this.resultado.value.toString();
                this.historial.value = "".concat(this.anteriorOpera, " = ").concat(this.anteriorResult);
                this.datosHistorial.push(this.historial.value);
                localStorage.setItem("historial", JSON.stringify(this.datosHistorial));
                this.operaciones.innerHTML += "<p>".concat(this.historial.value, "</p>");
            }
            catch (error) {
                this.resultado.value = "Error";
            }
        }
        this.mostrarHistorial();
    };
    // Mostrar el historial
    Calculator.prototype.mostrarHistorial = function () {
        var _this = this;
        if (this.datosHistorial.length === 0) {
            this.operaciones.innerHTML = "<p>No hay datos en memoria</p>";
        }
        else {
            this.operaciones.innerHTML = "";
            this.datosHistorial.forEach(function (item) {
                _this.operaciones.innerHTML += "<p>".concat(item, "</p>");
            });
        }
    };
    // Borrar el valor en el input
    Calculator.prototype.borrar = function () {
        this.resultado.value = "";
    };
    // Borrar el historial en el localStorage, en memoria y actualizar el DOM
    Calculator.prototype.borrarHistorial = function () {
        // Borra los datos del localStorage
        localStorage.clear();
        // Vaciamos el array de historial en memoria
        this.datosHistorial = [];
        // Actualizamos el DOM para reflejar que el historial está vacío
        this.operaciones.innerHTML = "<p>No hay datos en memoria</p>";
    };
    // Mostrar u ocultar el contenedor del historial
    Calculator.prototype.toggleHistorial = function () {
        this.mostrar.classList.toggle("visible");
        this.contenedorHistorial.style.display = this.mostrar.classList.contains("visible")
            ? "block"
            : "none";
    };
    return Calculator;
}());
// Crear una instancia de la calculadora
var calculadora = new Calculator();
// Para enviar un número a la calculadora
function enviarNumero(numero) {
    calculadora.enviarNumero(numero);
}
// Para hacer una operación
function operar(operador) {
    calculadora.operar(operador);
}
// Para resolver la operación
function resolver() {
    calculadora.resolver();
}
// Para borrar el input
function borrar() {
    calculadora.borrar();
}
// Para borrar el historial
function borrarHistorial() {
    calculadora.borrarHistorial();
}

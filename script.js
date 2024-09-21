class Calculadora {
  constructor() {
    this.teclas = [
      "⌫",
      "%",
      "C",
      "-",
      "1",
      "2",
      "3",
      "/",
      "4",
      "5",
      "6",
      "x",
      "7",
      "8",
      "9",
      "+",
      "()",
      "0",
      ",",
      "=",
    ];

    this.createScaffoudCalculadora();
    this.expressao = document.getElementById("expressao");
    this.resultado = document.getElementById("resultado");
    this.renderTeclado();
  }
  createScaffoudCalculadora = () => {
    document.body.innerHTML = `
    <div id="calculadora">
      <div id="visor">
        <p id="expressao"></p>
        <p id="resultado"></p>
      </div>
      <div id="teclado"></div>
    </div>`;
  };

  renderTeclado = () => {
    const teclado = document.getElementById("teclado");
    this.teclas.map((tecla) => {
      const teclaObj = document.createElement("button");
      teclaObj.textContent = tecla;
      teclaObj.id = tecla;
      teclaObj.classList.add("tecla");
      teclaObj.onclick = ()=>{
        this.teclar(tecla)
      }
      teclado.appendChild(teclaObj);
    });

  };

  formatarExpressao = (expressao) => {
    var expressaoFormatada = String(expressao)
      .replace("x", "*")
      .replace(",", ".")
    return expressaoFormatada;
  };
  getExpressao = () => {
    return String(this.expressao.innerText);
  };
  getResultado = () => {
    return String(this.formatarExpressao(this.resultado.innerText));
  };
  setExpressao = (novaExpressao) => {
    this.expressao.innerHTML = novaExpressao;
  };
  setResultado = (novoResultado) => {
    this.resultado.innerHTML = novoResultado;
  };

  resolverExpressao = (expressao) => {
    return eval(expressao);
  };

  resetVisor = () => {
    this.setExpressao("");
    this.setResultado("");
  };

  calcularPorcentagem = (n, porcentagem) => {
    n = Number(eval(n)) ?? 1;
    return n * Number(porcentagem);
  };

  deleteTecla = () => {
    this.setExpressao(this.getExpressao().slice(0, -1));
  };
  listenTecladoFisico = () => {
    addEventListener("keydown", (e) => {
      if (this.teclas.includes(e.key)) {
        this.teclar(e.key);
      }
    });
  };
  teclar = (tecla) => {
    console.log(tecla)
    const existeColcheteAberto = String(this.getExpressao())
      .split("")
      .findLast((e) => e === "(");
    const OPERACOES = ["+", "-", "x", "/"];
    const primeiraTeclaClicada = this.getExpressao().length === 0;
    const ultimoDigitoEhNumero = OPERACOES.includes(
      this.getExpressao().slice(-1)
    );

    switch (tecla) {
      case "C":
        this.resetVisor();
        break;
      case "Enter":
      case "=":
        if (!primeiraTeclaClicada) {
          this.setResultado(
            String(
              this.resolverExpressao(
                this.formatarExpressao(this.getExpressao())
              )
            )
              .slice(0, 15)
              .replace(".", ",")
          );
        }

        break;
      case "⌫":
        this.deleteTecla();
        break;
      case "()":
        if (existeColcheteAberto) {
          this.setExpressao(this.getExpressao() + ")");
        } else if (!ultimoDigitoEhNumero) {
          this.setExpressao(this.getExpressao() + "(");
        }
        break;
      case "%":
        const indexUltimaOperacao = this.getExpressao()
          .split("")
          .findLastIndex((e) => ["+", "-", "*", "/", "x"].includes(e));
        var expressaoAntesDaPorcentagem = this.getExpressao().slice(
          0,
          indexUltimaOperacao
        );
        var porcentagem = eval(
          this.getExpressao().slice(indexUltimaOperacao + 1) + "/100"
        );
        this.setExpressao(
          this.getExpressao().slice(0, indexUltimaOperacao + 1) + porcentagem
        );
        if (this.getExpressao()[indexUltimaOperacao] === "+") {
          this.setExpressao(
            this.getExpressao().slice(0, indexUltimaOperacao + 1) +
              String(
                this.calcularPorcentagem(
                  expressaoAntesDaPorcentagem,
                  porcentagem
                )
              ).slice(0, 2)
          );
        }
        break;

      default:
        const existeResultadoNoVisor = this.getResultado();
        if (existeResultadoNoVisor) {
          this.setResultado("");
        }
        if (OPERACOES.includes(tecla)) {
          var ultimaTeclaClicada = String(this.getExpressao()).slice(-1);
          const ultimaTeclaNaoEOperacao =
            !OPERACOES.includes(ultimaTeclaClicada);

          if (ultimaTeclaNaoEOperacao && !primeiraTeclaClicada) {
            this.setExpressao(this.getExpressao() + tecla);
          }
        } else {
          this.setExpressao(this.getExpressao() + tecla);
        }
        break;
    }
  };
}

var c1;
c1 = new Calculadora();

window.onload = () => {
  console.log(typeof c1.expressao.innerHTML);

  //var c1 = new Calculadora();

  //console.log(c1.expressao.innerHTML)
  //c1.renderTeclado();
  /*
  for (tecla of c1.teclas) {
    document.getElementById(tecla).onclick = (e) => {
      c1.teclar(e.target.innerHTML);
    };
  }*/
  //c1.listenTecladoFisico();
  console.log(c1);
};

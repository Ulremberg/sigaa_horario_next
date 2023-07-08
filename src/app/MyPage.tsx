import React, { useState, useRef } from "react";

const MyPage: React.FC = () => {
  const [saida, setSaida] = useState("");
  const [showCard, setShowCard] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const traduzir = () => {
    const entrada = document.getElementById("fhorario") as HTMLInputElement;

    const saida = descodificar(entrada.value);
    setSaida(saida);
  };

  const descodificar = (entradaValor: string): string => {
    entradaValor = entradaValor.toLowerCase();
    console.log(entradaValor);
    const reDias = /\b\d{1,2}/;
    const reTurno = /[a-z]/;
    const reHorario = /\d{1,2}\b/;
    const dias = entradaValor.match(reDias);
    const turno = entradaValor.match(reTurno);
    const horario = entradaValor.match(reHorario);

    if (dias === null || turno === null || horario === null) {
      return `<p>Código inválido</p>`;
    }

    const primeiroDia = dias[0][0];
    const segundoDia = dias[0][1];

    const primeiroHorario = horario[0][0];
    const segundoHorario = horario[0][1];

    if (
      primeiroDia === undefined ||
      primeiroHorario === undefined ||
      turno === null ||
      turno === undefined
    ) {
      return `<p>Código inválido</p>`;
    }

    let saida = "<p>";
    saida = saida + queDia(primeiroDia);
    if (segundoDia !== null) {
      saida = saida + "<p>" + queDia(segundoDia) + "</p>";
    }
    saida = saida + "</p>";

    saida =
      saida + "<p>" + queTurno(turno, primeiroHorario, segundoHorario) + "</p>";

    return `${saida}`;
  };

  const queDia = (numDia: string): string => {
    switch (numDia) {
      case "1": {
        return "Primeiro dia inválido";
      }
      case "2": {
        return "Segunda";
      }
      case "3": {
        return "Terça";
      }
      case "4": {
        return "Quarta";
      }
      case "5": {
        return "Quinta";
      }
      case "6": {
        return "Sexta";
      }
      case "7": {
        return "Sábado";
      }
      default: {
        return "";
      }
    }
  };

  const queTurno = (
    turno: RegExpMatchArray | null,
    primeiroHorario: string,
    segundoHorario: string
  ): string => {
    if (turno === null) {
      return "";
    }

    let hora = "";
    if (turno[0] === "t") {
      hora =
        "<p>" +
        queHorarioTarde(primeiroHorario) +
        "</p><p>" +
        queHorarioTarde(segundoHorario) +
        "</p>";
      return hora + "<p>Tarde</p>";
    }
    if (turno[0] === "m") {
      hora =
        "<p>" +
        queHorarioManha(primeiroHorario) +
        "</p><p>" +
        queHorarioManha(segundoHorario) +
        "</p>";
      return hora + "<p>Manhã</p>";
    }
    if (turno[0] === "n") {
      hora =
        "<p>" +
        queHorarioNoite(primeiroHorario) +
        "</p><p>" +
        queHorarioNoite(segundoHorario) +
        "</p>";
      return hora + "<p>Noite</p>";
    }

    return "";
  };

  const queHorarioManha = (horario: string): string => {
    switch (horario) {
      case "1": {
        return "7:00 - 8:00";
      }
      case "2": {
        return "8:00 - 9:00";
      }
      case "3": {
        return "9:00 - 10:00";
      }
      case "4": {
        return "10:00 - 11:00";
      }
      case "5": {
        return "11:00 - 12:00";
      }
      case "6": {
        return "12:00 - 13:00";
      }
      default: {
        return "";
      }
    }
  };

  const queHorarioTarde = (horario: string): string => {
    switch (horario) {
      case "1": {
        return "13:00 - 14:00";
      }
      case "2": {
        return "14:00 - 15:00";
      }
      case "3": {
        return "15:00 - 16:00";
      }
      case "4": {
        return "16:00 - 17:00";
      }
      case "5": {
        return "17:00 - 18:00";
      }
      default: {
        return "";
      }
    }
  };

  const queHorarioNoite = (horario: string): string => {
    switch (horario) {
      case "1": {
        return "18:30 - 19:20";
      }
      case "2": {
        return "19:20 - 20:10";
      }
      case "3": {
        return "20:10 - 21:00";
      }
      case "4": {
        return "21:00 - 21:50";
      }
      default: {
        return "";
      }
    }
  };

  function handleButton(){
    const inputValue = inputRef.current?.value;
    if (inputValue && inputValue.trim() !== '') {
      setShowCard(!showCard);
    }
    traduzir()
  }

  return (
    <>
    
    <div className="h-screen flex ">
      <div className="w-1/2 border-r pr-4 "></div>
      <div className="w-1/2 pl-4 justify-center items-center relative">
        <div className="py-3 px-3">
          <input
            id="fhorario"
            className="text-black py-1 mr-4 pl-1"
            ref={inputRef}
            type="text"
          />
          <button
            className="bg-blue-900 hover:bg-blue-500 text-white rounded-lg px-4 py-2"
            onClick={handleButton}
          >
            Traduzir
          </button>
          <h1 className="text-lg pt-1">Resultado:</h1>
          {showCard && (<div className="bg-black rounded-lg border border-gray-500 p-4 max-w-fit">
            <div
              id="saida"
              className="text-white text-center"
              dangerouslySetInnerHTML={{ __html: saida }}
            ></div>
          </div>)}
          
        </div>
        <footer className="absolute bottom-0 py-4 text-center ">
    Feito por <a href="https://github.com/Ulremberg" target="_blank" rel="noopener noreferrer">Berg</a>🚀
  </footer>
      </div>
      
    </div>
   
  </>
  );
};

export default MyPage;

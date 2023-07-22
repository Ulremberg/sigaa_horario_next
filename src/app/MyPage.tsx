import React, { useState, useRef } from "react";
import Footer from "./footer";
import Image from "next/image";
import UFRPE from "./../../public/Marca-UFRPE-PB-Negativo-1.webp"

function MyPage (){
  const [saida, setSaida] = useState("");
  const [showCard, setShowCard] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const traduzir = () => {
    const entrada = document.querySelector("#fhorario") as HTMLInputElement;

    const saida = descodificar(entrada.value);
    setSaida(saida);
  };

  const descodificar = (entradaValor: string): string => {
    entradaValor = entradaValor.toLowerCase();
    entradaValor = entradaValor.trim();
    
    if (entradaValor.indexOf(" ") === -1) {
      entradaValor = entradaValor.replace(/(.{4})/, "$1 ");
    }
    const reDias = /\b\d{1,2}/;
    const reTurno = /[a-z]/;
    const reHorario = /\d{1,2}\b/;
    const dias = entradaValor.match(reDias);
    const turno = entradaValor.match(reTurno);
    const horario = entradaValor.match(reHorario);

    if (dias === null || turno === null || horario === null) {
      return `<p>Código inválido</p>`;
    }

    const [primeiroDia, segundoDia] = entradaValor.split(" ");

    const horarioPrimeiroDia = entradaValor.substring(2, 5);
    const horarioSegundoDia = entradaValor.substring(7, 10);
  
    const primeiroHorarioPrimeiroDia = horarioPrimeiroDia[0];
    const segundoHorarioPrimeiroDia = horarioPrimeiroDia[1];
  
    const primeiroHorarioSegundoDia = horarioSegundoDia[0];
    const segundoHorarioSegundoDia = horarioSegundoDia[1];
  
    if (
      primeiroDia == undefined ||
      primeiroHorarioPrimeiroDia == undefined ||
      turno == null ||
      turno == undefined
    ) {
      return `<p>Código invalido</p>`;
    }
  
    let saida = "<p>";
    saida = saida + queDia(primeiroDia[0]) + "</p>";
  
    saida =
      saida +
      "<p>" +
      queHorario(turno, primeiroHorarioPrimeiroDia, segundoHorarioPrimeiroDia) +
      "</p>";
  
    if (segundoDia != null) {
      saida = saida + "<p>" + queDia(segundoDia[0]) + "</p>";
    }
    saida =
      saida +
      "<p>" +
      queHorario(turno, primeiroHorarioSegundoDia, segundoHorarioSegundoDia) +
      "</p>";
  
    saida = saida + "<p>" + queTurno(turno) + "</p>";
  
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
    turno: RegExpMatchArray  
    
  ): any => {
    if (turno[0] === "t") {
      return "<p>Tarde</p>";
    }
    if (turno[0] ==="m") {
      return "<p>Manhã</p>";
    }
    if (turno[0] ==="n") {
      return "<p>Noite</p>";
    }
  };

  function queHorario(
    turno: string | RegExpMatchArray,
    primeiroHorarioPrimeiroDia: string,
    segundoHorarioPrimeiroDia: string
  ) {
    let hora: string;
    if (turno == "t") {
      hora =
        "<p>" +
        queHorarioTarde(primeiroHorarioPrimeiroDia) +
        "</p><p>" +
        queHorarioTarde(segundoHorarioPrimeiroDia) +
        "</p>";
      return hora;
    }
    if (turno == "m") {
      hora =
        "<p>" +
        queHorarioManha(primeiroHorarioPrimeiroDia) +
        "</p><p>" +
        queHorarioManha(segundoHorarioPrimeiroDia) +
        "</p>";
      return hora;
    }
    if (turno == "n") {
      hora =
        "<p>" +
        queHorarioNoite(primeiroHorarioPrimeiroDia) +
        "</p><p>" +
        queHorarioNoite(segundoHorarioPrimeiroDia) +
        "</p>";
      return hora;
    }
  }

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
    
    <div className="h-screen flex flex-row max-md:flex-col max-md:gap-3">
      <div className="w-1/2 flex-row pr-4 max-md:py-5 max-md:w-fit"><Image src={UFRPE} alt={""}></Image></div>
      <div className="w-1/2 flex-row pl-4 justify-center items-center relative max-md:py-5 max-md:w-max">
        <div className="py-3 px-3 ">
          <div className="flex max-md:flex-col max-md:gap-2">
          <input
            id="fhorario"
            className="text-black py-1 mr-4 pl-1"
            ref={inputRef}
            type="text"
          />
          <button
            className="bg-blue-900 hover:bg-blue-500 text-white rounded-lg px-4 py-2 max-md:w-fit"
            onClick={handleButton}
          >
            Traduzir
          </button>

          </div>
         
          <h1 className="text-lg pt-1 max-md:py-5">Resultado:</h1>
          {showCard && (<div className="bg-black rounded-lg border border-gray-500 p-4 max-w-fit max-md:m-4">
            <div
              id="saida"
              className="text-white text-center max-md:py-5"
              dangerouslySetInnerHTML={{ __html: saida }}
            ></div>
          </div>)}
          
        </div>
        <Footer className={"absolute bottom-0 py-4 text-center max-md:py-5"}  text={'Feito por'} user={'Berg'} href={'https://github.com/Ulremberg'}/>
    
      </div>
      
    </div>
   
  </>
  );
};

export default MyPage;

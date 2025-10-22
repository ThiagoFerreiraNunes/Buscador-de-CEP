import { useState } from "react";
import "./App.css";
import { FaSearch } from "react-icons/fa";
import { api } from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  const handleSearch = async () => {
    if (!input.trim()) {
      return alert("Preencha algum CEP");
    }

    try {
      const response = await api.get(`${input}/json/`);
      setCep(response.data);
      setInput("");
    } catch (error) {
      alert("Erro ao buscar CEP: " + error);
      setInput("");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center flex-col bg-gradient-to-b from-slate-800 to-slate-600">
      <h1 className="text-8xl text-white font-bold">Buscador CEP</h1>
      <div className="w-[500px] flex p-4 my-9 bg-slate-400/50 rounded-3xl shadow-2xl gap-2">
        <input
          className="w-full text-white outline-none"
          type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="cursor-pointer hover:scale-120 duration-200"
        >
          <FaSearch size={25} color="white" />
        </button>
      </div>
      {Object.keys(cep).length > 0 && (
        <main className="flex justify-center items-center flex-col font-bold bg-white w-[500px] rounded-3xl py-4 gap-4">
          <h2 className="text-3xl">CEP: {cep.cep}</h2>
          <div className="flex flex-col gap-1 font-bold">
            <span>Logradouro: {cep.logradouro}</span>
            <span>
              Complemento:{" "}
              {cep.complemento == "" ? " NÃO INFORMADO" : cep.complemento}
            </span>
            <span>Bairro: {cep.bairro}</span>
            <span>
              Cidade: {cep.localidade} - {cep.uf}
            </span>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;

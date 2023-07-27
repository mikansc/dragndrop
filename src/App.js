import { useState } from "react";

const initial_state = { nome: "", sobrenome: "" };

function App() {
  const [lista, setLista] = useState([]);
  const [formulario, setFormulario] = useState(initial_state);

  function handleSubmit() {
    setLista([...lista, formulario]);
    setFormulario(initial_state);
  }

  function handleDragStart(evento, indice) {
    evento.dataTransfer.setData("indice", indice);
  }

  function handleDragEnter(evento) {
    evento.target.classList.add("hovered");
  }

  function handleDragLeave(evento) {
    evento.target.classList.remove("hovered");
  }

  function handleDrop(evento) {
    const indice = evento.dataTransfer.getData("indice");
    const self = evento.target.id;

    let copiaLista = [...lista];
    const temp = copiaLista[indice];
    copiaLista[indice] = copiaLista[self];
    copiaLista[self] = temp;

    setLista(copiaLista);
    evento.target.classList.remove("hovered");
  }

  //  ----------------------------
  // MODO HARDCORE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // ===================================================
  function handleMudarTexto(evento) {
    const { id, value } = evento.target;
    setFormulario((prev) => ({ ...prev, [id]: value }));
  }
  // ===================================================
  // MODO HARDCORE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  return (
    <div className="content">
      <h1>Drag and Drop</h1>
      <p>Adicione nomes à lista e arraste-os para reordenar</p>
      <div className="form-group">
        <div className="input-group mb-1 mt-">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            name="nome"
            id="nome"
            value={formulario.nome}
            onChange={(e) => handleMudarTexto(e)}
          />
        </div>

        <div className="input-group mb-1">
          <label htmlFor="sobrenome">Sobrenome</label>
          <input
            autoComplete="off"
            type="text"
            name="sobrenome"
            id="sobrenome"
            value={formulario.sobrenome}
            onChange={(e) => handleMudarTexto(e)}
          />
        </div>
        <div className="mb-1">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Adicionar
          </button>
        </div>
      </div>

      <div className="drag-area">
        {lista.map((item, index) => (
          <div
            key={index}
            id={index}
            className="list-item"
            draggable={true}
            onDrop={handleDrop}
            onDragStart={(event) => handleDragStart(event, index)}
            onDragLeave={handleDragLeave}
            onDragOver={(event) => event.preventDefault()}
            onDragEnter={handleDragEnter}
          >
            {item?.nome} {item?.sobrenome}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import { type Task } from "../types";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    titulo: string,
    tipo: string,
    descricao: string,
    prioridade: string,
    data_limite: string,
    estimativa: number,
  ) => void;
  taskToEdit?: Task | null;
}

const normalizeDateForInput = (rawDate: string) => {
  if (!rawDate) return "";

  if (/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
    return rawDate;
  }

  const isoDate = rawDate.split("T")[0];
  if (/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
    return isoDate;
  }

  const brDateMatch = rawDate.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (brDateMatch) {
    const [, dia, mes, ano] = brDateMatch;
    return `${ano}-${mes}-${dia}`;
  }

  const parsedDate = new Date(rawDate);
  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export function TaskModal({
  isOpen,
  onClose,
  onSubmit,
  taskToEdit,
}: TaskModalProps) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataLimite, setDataLimite] = useState("");
  const [estimativa, setEstimativa] = useState(0);
  const tipos = ["Pessoal", "Trabalho", "Lazer"];
  const prioridade = ["Baixa", "Média", "Alta"];
  const [tipoSelecionado, setTipoSelecionado] = useState(tipos[0]);
  const [prioridadeSelecionada, setPrioridadeSelecionada] = useState(
    prioridade[0],
  );

  useEffect(() => {
    if (taskToEdit) {
      setTitulo(taskToEdit.titulo);
      setTipoSelecionado(taskToEdit.tipo);
      setDescricao(taskToEdit.descricao);
      setPrioridadeSelecionada(taskToEdit.prioridade);
      setDataLimite(normalizeDateForInput(taskToEdit.data_limite));
      setEstimativa(taskToEdit.estimativa);
    } else {
      setTitulo("");
      setDescricao("");
      setPrioridadeSelecionada(prioridade[0]);
      setDataLimite("");
      setEstimativa(0);
      setTipoSelecionado(tipos[0]);
    }
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <form
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(
            titulo,
            tipoSelecionado,
            descricao,
            prioridadeSelecionada,
            dataLimite,
            estimativa,
          );
        }}
      >
        <h2 className="modal-title">
          {taskToEdit ? "Editar Tarefa" : "Nova Tarefa"}
        </h2>
        <input
          className="modal-input"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        <select
          className="modal-input"
          value={tipoSelecionado}
          onChange={(e) => setTipoSelecionado(e.target.value)}
        >
          {tipos.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>

        <select
          className="modal-input"
          value={prioridadeSelecionada}
          onChange={(e) => setPrioridadeSelecionada(e.target.value)}
        >
          {prioridade.map((prioridade) => (
            <option key={prioridade} value={prioridade}>
              {prioridade}
            </option>
          ))}
        </select>

        <input
          className="modal-input"
          type="date"
          value={dataLimite}
          onChange={(e) => setDataLimite(e.target.value)}
          required
        />

        <input
          className="modal-input"
          placeholder="Estimativa (horas)"
          type="number"
          min={1}
          value={estimativa}
          onChange={(e) => setEstimativa(e.target.valueAsNumber || 0)}
          required
        />

        <textarea
          className="modal-textarea"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <div className="modal-buttons">
          <button
            type="button"
            onClick={onClose}
            className="modal-btn modal-btn-cancel"
          >
            Cancelar
          </button>
          <button type="submit" className="modal-btn modal-btn-save">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}

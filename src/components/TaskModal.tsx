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

export function TaskModal({
  isOpen,
  onClose,
  onSubmit,
  taskToEdit,
}: TaskModalProps) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("Baixa");
  const [dataLimite, setDataLimite] = useState("");
  const [estimativa, setEstimativa] = useState(0);
  const tipos = ["Pessoal", "Trabalho", "Lazer"];
  const [tipoSelecionado, setTipoSelecionado] = useState(tipos[0]);

  useEffect(() => {
    if (taskToEdit) {
      setTitulo(taskToEdit.titulo);
      setTipoSelecionado(taskToEdit.tipo);
      setDescricao(taskToEdit.descricao);
      setPrioridade(taskToEdit.prioridade);
      setDataLimite(taskToEdit.data_limite);
      setEstimativa(taskToEdit.estimativa);
    } else {
      setTitulo("");
      setDescricao("");
      setPrioridade("Baixa");
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
            prioridade,
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

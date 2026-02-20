import { useState, useEffect } from "react";
import { type Task } from "../types";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (titulo: string, tipo: string, descricao: string) => void;
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
  const tipos = ["Pessoal", "Trabalho", "Lazer"];
  const [tipoSelecionado, setTipoSelecionado] = useState(tipos[0]);

  useEffect(() => {
    if (taskToEdit) {
      setTitulo(taskToEdit.titulo);
      setTipoSelecionado(taskToEdit.tipo);
      setDescricao(taskToEdit.descricao);
    } else {
      setTitulo("");
      setDescricao("");
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
          onSubmit(titulo, tipoSelecionado, descricao);
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

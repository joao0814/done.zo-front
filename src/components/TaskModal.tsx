import { useState, useEffect } from "react";
import { type Task } from "../types";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (titulo: string, descricao: string) => void;
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

  useEffect(() => {
    if (taskToEdit) {
      setTitulo(taskToEdit.titulo);
      setDescricao(taskToEdit.descricao);
    } else {
      setTitulo("");
      setDescricao("");
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
          onSubmit(titulo, descricao);
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

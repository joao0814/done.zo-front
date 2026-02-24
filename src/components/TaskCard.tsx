import { type Task } from "../types";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const dataLimiteFormatada = Number.isNaN(new Date(task.data_limite).getTime())
    ? task.data_limite
    : new Date(task.data_limite).toLocaleDateString("pt-BR");

  return (
    <div className="task-card">
      <div className="task-card-content">
        <h2 className="task-card-title">{task.titulo}</h2>
        <p className="task-card-desc">{task.descricao}</p>

        <div className="task-card-meta">
          <span className="task-chip">Tipo: {task.tipo}</span>
          <span className="task-chip">Prioridade: {task.prioridade}</span>
          <span className="task-chip">Estimativa: {task.estimativa}h</span>
          <span className="task-chip">Data limite: {dataLimiteFormatada}</span>
        </div>
      </div>

      <div className="task-card-actions">
        <button
          onClick={() => onEdit(task)}
          className="task-card-btn task-card-btn-edit"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="task-card-btn task-card-btn-delete"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

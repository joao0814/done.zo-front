import { type Task } from "../types";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <div className="task-card">
      <div>
        <h2 className="task-card-title">{task.titulo}</h2>
        <p className="task-card-desc">{task.descricao}</p>
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

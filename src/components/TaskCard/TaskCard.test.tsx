import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TaskCard } from ".";

describe("TaskCard", () => {
  it("renderiza os dados da tarefa e dispara as acoes", () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(
      <TaskCard
        task={{
          id: 10,
          titulo: "Planejar sprint",
          tipo: "Planejamento",
          descricao: "Definir backlog e prioridades",
          prioridade: "Alta",
          data_limite: "20/03/2026",
          estimativa: 6,
        }}
        onEdit={onEdit}
        onDelete={onDelete}
      />,
    );

    expect(screen.getByText("Planejar sprint")).toBeInTheDocument();
    expect(
      screen.getByText("Definir backlog e prioridades"),
    ).toBeInTheDocument();
    expect(screen.getByText("Tipo: Planejamento")).toBeInTheDocument();
    expect(screen.getByText("Prioridade: Alta")).toBeInTheDocument();
    expect(screen.getByText("Estimativa: 6h")).toBeInTheDocument();
    expect(screen.getByText("Data limite: 20/03/2026")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Editar" }));
    fireEvent.click(screen.getByRole("button", { name: "Excluir" }));

    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledWith(
      expect.objectContaining({ id: 10, titulo: "Planejar sprint" }),
    );
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith(10);
  });
});

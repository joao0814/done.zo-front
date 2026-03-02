import { useCallback, useState, useEffect } from "react";
import { taskService } from "../services/taskService";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend } from "recharts";

export default function Metrics() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchMetrics = useCallback(async () => {
    setLoading(true);
    try {
      const data = await taskService.getMetrics();
      setMetrics(data);
    } catch (err) {
      console.error("Erro ao buscar métricas:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  if (loading)
    return <div className="p-8 text-center">Carregando indicadores...</div>;
  if (!metrics)
    return <div className="p-8 text-center">Nenhum dado encontrado.</div>;

  const dataPie = [
    { name: "Alta", value: metrics.prioridades.alta, fill: "#ef4444" },
    { name: "Média", value: metrics.prioridades.media, fill: "#f59e0b" },
    { name: "Baixa", value: metrics.prioridades.baixa, fill: "#3b82f6" },
  ].filter((item) => item.value > 0);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 className="mb-24 text-[24px] font-bold">Dashboard de Tarefas</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            padding: "16px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#666", fontSize: "14px" }}>TAREFAS ATRASADAS</h3>
          <p style={{ fontSize: "28px", fontWeight: "bold", color: "#ef4444" }}>
            {metrics.prazos.atrasadas}
          </p>
        </div>
        <div
          style={{
            padding: "16px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#666", fontSize: "14px" }}>HORAS PLANEJADAS</h3>
          <p style={{ fontSize: "28px", fontWeight: "bold", color: "#3b82f6" }}>
            {metrics.planejamento.horas_estimadas}h
          </p>
        </div>
      </div>

      <div
        style={{
          height: "420px",
          background: "#323232",
          padding: "20px",
          borderRadius: "12px",
          border: "1px solid #eee",
        }}
      >
        <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
          Distribuição por Prioridade
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dataPie}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={5}
              dataKey="value"
            />
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

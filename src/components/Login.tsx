import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1. Chama o seu Back-end no Express
      const response = await api.post("/auth/login", { email, senha });
      
      // 2. Extrai o token e o usuário
      const { token, user } = response.data;

      // 3. Salva no "bolso" do navegador (LocalStorage)
      localStorage.setItem("@DoneZo:token", token);
      localStorage.setItem("@DoneZo:user", JSON.stringify(user));

      // 4. Manda para a tela de tarefas
      navigate("/tasks");
    } catch (error) {
      console.error(error);
      alert("Email ou senha incorretos!");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h1 className="login-title">Done.zo</h1>
        <p className="login-subtitle">Faça login para gerenciar suas tarefas.</p>

        <div className="login-fields">
          <input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="login-input"
            required
          />
          <button type="submit" className="login-btn">
            ENTRAR
          </button>
        </div>
      </form>
    </div>
  );
}

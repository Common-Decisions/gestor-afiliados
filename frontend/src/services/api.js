const API_URL = import.meta.env.VITE_API_URL || "/api";

const ERROR_MAP = {
  "Email e password são obrigatórios.": "Email and password are required.",
  "Credenciais inválidas.": "Invalid credentials.",
  "Não autenticado.": "Not authenticated.",
  "Sessão inválida.": "Invalid session.",
  "Erro na requisição": "Request failed."
};

function toEnglishMessage(message) {
  return ERROR_MAP[message] || message || "Request failed.";
}

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(toEnglishMessage(data.message));
  }
  return data;
}

export const api = {
  login: (payload) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  me: () => request("/auth/me"),
  logout: () =>
    request("/auth/logout", {
      method: "POST"
    }),
  dashboardSummary: () => request("/dashboard/summary")
};

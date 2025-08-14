// authService.ts
export async function checkAuth() {
  const res = await api.post("http://localhost:7777/api/users/auth/me", {
    credentials: "include" // envia cookie automaticamente
  });

  if (res.ok) {
    return await res.json(); // dados do usuário
  } else {
    return null; // não autenticado
  }
}
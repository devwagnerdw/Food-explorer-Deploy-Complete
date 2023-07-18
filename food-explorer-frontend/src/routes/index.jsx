import { BrowserRouter } from "react-router-dom";
import { useAuth } from '../hooks/auth';

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const { user, isUserAuthenticated } = useAuth();
  const isAdmin = user ? user.is_admin : false; // Verifica se o usuário é um administrador

  const userAuthenticated = isUserAuthenticated(); // Verifica se o usuário está autenticado

  return (
    <BrowserRouter>
    {/* Renderiza AppRoutes se o usuário estiver logado e autenticado */}

      {(user && userAuthenticated) ? <AppRoutes isAdmin={isAdmin} /> : <AuthRoutes />}
      
    </BrowserRouter>
  );
}
import { Navigate, Route, Routes } from "react-router-dom";
import CardPage from "./pages/CardPage";
import CardsPage from "./pages/CardsPage";
import LoginPage from "./pages/LoginPage";
import RequireAuth from "./hoc/RequireAuth";
import RegistrationPage from "./pages/RegistrationPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<Navigate to="/cards" replace />} />

        <Route
          path="cards"
          element={
            <RequireAuth>
              <CardsPage />
            </RequireAuth>
          }
        />
        <Route
          path="cards/:id"
          element={
            <RequireAuth>
              <CardPage />
            </RequireAuth>
          }
        />

        <Route path="*" element={<NotFoundPage />} />

        <Route path="login" element={<LoginPage />} />
        <Route path="registration" element={<RegistrationPage />} />
      </Route>
    </Routes>
  );
}

export default App;

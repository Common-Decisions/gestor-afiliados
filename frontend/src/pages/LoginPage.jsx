import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [email, setEmail] = useState("admin@gestor.local");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="bg-app login-screen">
      <div className="login-theme-toggle p-3 p-md-4">
        <button type="button" className="btn btn-theme-toggle" onClick={toggleTheme}>
          {isDark ? "Light mode" : "Dark mode"}
        </button>
      </div>

      <section className="login-layout container">
        <div className="row align-items-center g-4 g-lg-5">
          <div className="col-12 col-lg-6">
            <div className="login-copy">
              <p className="text-uppercase copy-tag">Affiliate manager</p>
              <h1 className="display-5 fw-semibold mb-3">Developed By Marco</h1>
              <p className="mb-0 copy-lead">
                One place to manage affiliates, conversion data and commission activity.
              </p>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <section className="card login-card border-0 shadow-lg">
              <div className="card-body p-4 p-md-5">
                <h2 className="h3 mb-2">Welcome back</h2>
                <p className="text-body-secondary mb-4">Sign in to access your dashboard</p>

                <form className="d-grid gap-3" onSubmit={handleSubmit}>
                  <div>
                    <label className="form-label">Email</label>
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">Password</label>
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {error ? (
                    <div className="alert alert-danger py-2 mb-0" role="alert">
                      {error}
                    </div>
                  ) : null}

                  <button className="btn btn-accent btn-lg mt-2" type="submit" disabled={submitting}>
                    {submitting ? "Signing in..." : "Sign in"}
                  </button>
                </form>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;

import { Switch, Route, Router as WouterRouter } from "wouter";
import Home from "@/pages/Home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route>
        <div style={{
          minHeight: "100vh", display: "flex", alignItems: "center",
          justifyContent: "center", flexDirection: "column", textAlign: "center",
          background: "linear-gradient(180deg, #0b0c17, #0f111f)", color: "#e8eef8"
        }}>
          <h1 style={{ fontSize: "4rem", color: "#3b82f6" }}>404</h1>
          <p style={{ color: "#98a0b3" }}>Page not found</p>
          <a href="/" style={{ marginTop: 20, color: "#3b82f6", fontWeight: 600 }}>Go Home</a>
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}

export default App;

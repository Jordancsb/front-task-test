import { useRoutes } from "react-router";
import routes from "./routes";
import './index.css';

function App() {
  const element = useRoutes(routes);
  return <>{element}</>;

}

export default App

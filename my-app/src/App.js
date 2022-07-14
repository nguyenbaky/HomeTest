import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AllRoutes from "./containers/routes"

function App() {
  return (
    <Router>
      <Routes>
        {AllRoutes.length && AllRoutes.map((r, index) => (
          <Route
            key={index}
            path={r.path}
            element={r.element()}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;

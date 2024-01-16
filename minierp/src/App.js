import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import PersonalDetailsForm from "./components/PersonalDetailsForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/"  element={<HomePage />}/>
          <Route path="/hr"  element={<PersonalDetailsForm />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import PersonalDetailsForm from "./components/PersonalDetailsForm";
import LegislativeContactInfo from "./components/LegislativeContactForm";
import EmploymentInfo from "./components/EmploymentInfo";
import CompensationInfo from "./components/CompensationInfo";
import CreateLocation from "./components/WorkforceStructures/CreateLocation";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/"  element={<HomePage />}/>
          <Route path="/hr"  element={<PersonalDetailsForm />}/>
          <Route path="/legislativeContactInfo"  element={<LegislativeContactInfo />}/>
          <Route path="/employmentInfo"  element={<EmploymentInfo />}/>
          <Route path="/compensationInfo"  element={<CompensationInfo />}/>
          <Route path="/createLocation"  element={<CreateLocation />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

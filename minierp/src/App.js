import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import PersonalDetailsForm from "./components/PersonalDetailsForm";
import LegislativeContactInfo from "./components/LegislativeContactForm";
import EmploymentInfo from "./components/EmploymentInfo";
import CompensationInfo from "./components/CompensationInfo";
import CreateLocation from "./components/WorkforceStructures/CreateLocation";
import CreateCompany from "./components/WorkforceStructures/CreateCompany";
import CreateGrade from "./components/WorkforceStructures/CreateGrade";
import CreateJob from "./components/WorkforceStructures/CreateJob";
import CreateDepartment from "./components/WorkforceStructures/CreateDepartment";

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
          <Route path="/createCompany"  element={<CreateCompany />}/>
          <Route path="/createGrade"  element={<CreateGrade />}/>
          <Route path="/createJob"  element={<CreateJob />}/>
          <Route path="/createDepartment"  element={<CreateDepartment />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

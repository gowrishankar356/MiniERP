import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import PersonalDetailsForm from "./components/HRActivities/Hiring/CreatePerson/PersonalDetails";
import DemographicInfo from "./components/HRActivities/Hiring/CreatePerson/DemographicDetails";
import EmploymentInfo from "./components/HRActivities/Hiring/CreatePerson/EmploymentDetails";
import CompensationInfo from "./components/HRActivities/Hiring/CreatePerson/CompensationDetails";
import CreateLocation from "./components/WorkforceStructures/CreateLocation";
import CreateCompany from "./components/WorkforceStructures/CreateCompany";
import CreateGrade from "./components/WorkforceStructures/CreateGrade";
import CreateJob from "./components/WorkforceStructures/CreateJob";
import CreateDepartment from "./components/WorkforceStructures/CreateDepartment";
import CreateElement from "./components/WorkforceStructures/CreateElement";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/personalDetails" element={<PersonalDetailsForm />} />
          <Route
            path="/demographicDetails"
            element={<DemographicInfo />}
          />
          <Route path="/employmentInfo" element={<EmploymentInfo />} />
          <Route path="/compensationDetails" element={<CompensationInfo />} />
          <Route path="/createLocation" element={<CreateLocation />} />
          <Route path="/createCompany" element={<CreateCompany />} />
          <Route path="/createGrade" element={<CreateGrade />} />
          <Route path="/createJob" element={<CreateJob />} />
          <Route path="/createDepartment" element={<CreateDepartment />} />
          <Route path="/createElement" element={<CreateElement />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

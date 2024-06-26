import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import PersonalDetailsForm from "./components/HRActivities/Hiring/CreatePerson/PersonalDetails";
import DemographicInfo from "./components/HRActivities/Hiring/CreatePerson/DemographicDetails";
import EmploymentInfo from "./components/HRActivities/Hiring/CreatePerson/EmploymentDetails";
import CompensationInfo from "./components/HRActivities/Hiring/CreatePerson/CompensationDetails";
import RunPayroll from "./components/Payroll/RunPayroll";

//HR Homepages
import EmployeesHomepPage from "./components/HRActivities/Hiring/EmployeesHomePage";

//Payroll Homepage
import ElementHomePage from "./components/Payroll/Elements/ElementHomePage";
import PayrollResults from "./components/Payroll/PayrollResults";

//WorkForce Homepage
import CompanyHomePage from "./components/WorkforceStructures/Company/CompanyHomePage";
import LocationHomePage from "./components/WorkforceStructures/Location/LocationHomePage";
import GradeHomePage from "./components/WorkforceStructures/Grade/GradeHomePage";
import DepartmentHomePage from "./components/WorkforceStructures/Department/DepartmentHomePage";
import JobHomePage from "./components/WorkforceStructures/Job/JobHomePage";

//Create WorkForce Structure Routes
import CreateLocation from "./components/WorkforceStructures/Location/CreateLocation";
import CreateCompany from "./components/WorkforceStructures/Company/CreateCompany";
import CreateGrade from "./components/WorkforceStructures/Grade/CreateGrade";
import CreateJob from "./components/WorkforceStructures/Job/CreateJob";
import CreateDepartment from "./components/WorkforceStructures/Department/CreateDepartment";
import CreateElement from "./components/Payroll/Elements/CreateElement";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/employees" element={<EmployeesHomepPage />} />
          <Route path="/personalDetails" element={<PersonalDetailsForm />} />
          <Route path="/demographicDetails" element={<DemographicInfo />} />
          <Route path="/employmentInfo" element={<EmploymentInfo />} />
          <Route path="/compensationDetails" element={<CompensationInfo />} />
          <Route path="/company" element={<CompanyHomePage />} />
          <Route path="/createCompany" element={<CreateCompany />} />
          <Route path="/location" element={<LocationHomePage />} />
          <Route path="/createLocation" element={<CreateLocation />} />
          <Route path="/grade" element={<GradeHomePage />} />
          <Route path="/createGrade" element={<CreateGrade />} />
          <Route path="/job" element={<JobHomePage />} />
          <Route path="/createJob" element={<CreateJob />} />
          <Route path="/department" element={<DepartmentHomePage />} />
          <Route path="/createDepartment" element={<CreateDepartment />} />
          <Route path="/element" element={<ElementHomePage />} />
          <Route path="/createElement" element={<CreateElement />} />
          RunPayroll
          <Route path="/payroll" element={<RunPayroll />} />
          <Route path="/payrollResults" element={<PayrollResults />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

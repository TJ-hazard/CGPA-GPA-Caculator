import {useEffect, useState} from "react";
import {Header} from "./components/Header";
import {TableContainer} from "./components/TableContainer";
import {Footer} from "./components/Footer";
import axios from "axios";

function App() {
  const [response, setResponse] = useState("");
  const [colleges, setColleges] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get("http://localhost:3000/");
        setResponse(res.data);
        setColleges(res.data.colleges);
        setDepartments(res.data.departments);
        setCourses(res.data.courses);
      } catch (error) {
        setResponse(error.message);
      } finally {
      }
    };
    fetchdata();
  }, []);
  return (
    <>
      <Header />
      <TableContainer
        response={response}
        colleges={colleges}
        departments={departments}
        courses={courses}
      />
      <Footer />
    </>
  );
}

export default App;

import {useEffect} from "react";
import {Table} from "./Table.jsx";
import {useState} from "react";

export function TableContainer(props) {
  const {response, colleges, departments, courses} = props;

  const [selectedCollege, setSelectedCollege] = useState(0);
  const [availableDepartment, setAvailableDepartment] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(0);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [departmentSelected, setDepartmentSelected] = useState(false);
  const [maxLevel, setMaxLevel] = useState(0);
  const [allLevels, setAllLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(0);

  async function handleSelectCollege(e) {
    const selectedId = Number(e.target.value);

    setSelectedCollege(selectedId);
    const selectedDepartment = departments.filter(
      (department) => department.college_id === selectedId
    );
    setAvailableDepartment(selectedDepartment);
    const maxLevel = colleges.find((c) => selectedId === c.id)?.max_level;

    setMaxLevel(maxLevel);
    console.log("MaxLevel:", maxLevel);
  }

  async function handleSelectedDepartment(e) {
    const selectedId = Number(e.target.value);
    setSelectedDepartment(selectedId);

    const availableCourses = courses.filter(
      (course) => course.department_id === selectedId
    );
    setFilteredCourses(availableCourses);
    setDepartmentSelected(true);
  }

  function handleLevelSelected(e) {
    const selectedLevel = e.target.value;
    setSelectedLevel(selectedLevel);
    console.log(selectedLevel);
  }

  useEffect(() => {
    let levels = [];
    for (let i = maxLevel; i >= 100; i -= 100) {
      levels.push(i);
    }
    setAllLevels(levels);
    console.log(levels);
  }, [departmentSelected]);

  return (
    <div className="table-container">
      <div className="select-wrapper">
        <select
          className="custom-select"
          value={selectedCollege}
          onChange={handleSelectCollege}>
          <option value="">-- Select College --</option>
          {colleges.map((college) => (
            <option key={college.id} value={college.id}>
              {college.name}
            </option>
          ))}
        </select>
      </div>
      <div className={selectedCollege >= 1 ? "select-wrapper" : ""}>
        {selectedCollege >= 1 && (
          <select
            id=""
            className="custom-select"
            value={selectedDepartment}
            onChange={handleSelectedDepartment}>
            <option value="">-- Select Departmment</option>
            {availableDepartment.map((department) => {
              return (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              );
            })}
          </select>
        )}
      </div>
      {departmentSelected && (
        <div>
          <h1>Choose your Level</h1>
          <select
            name=""
            id=""
            className="custom-select"
            onChange={handleLevelSelected}>
            <option value="">--Levels---</option>
            {allLevels.map((level) => {
              return (
                <option value={level} key={level}>
                  {level} Level
                </option>
              );
            })}
          </select>
        </div>
      )}

      {departmentSelected && <Table filteredCourses={filteredCourses} />}
    </div>
  );
}

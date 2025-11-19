import {useState} from "react";
import {useEffect} from "react";

export function Table(props) {
  const {selectedCourse, filteredCourses} = props;
  const [courses, setCourses] = useState(filteredCourses);

  useEffect(() => {
    pagination();
  }, [courses]);

  function pagination() {
    let level = 100;

    const setFilteredCourses = courses.filter((c) => c.level === level);
  }

  // Update grade in state when user types
  const handleGradeChange = (code, value) => {
    // Update React state if you're tracking the courses list
    setCourses((prevCourses) => {
      const updated = prevCourses.map((c) =>
        c.course_code === code ? {...c, grade: value} : c
      );
      return updated;
    });

    handleCalculateGradePoint(code);
  };

  const handleCalculateGradePoint = (code) => {
    setCourses((prevGrade) => {
      const updated = prevGrade.map((c) => {
        if (c.course_code === code) {
          const unit = c.credit_unit || 0;
          const grade = c.grade || "";

          const gradeValue = (() => {
            switch (grade) {
              case "A":
                return 5;
              case "B":
                return 4;
              case "C":
                return 3;
              case "D":
                return 2;
              case "F":
                return 0;
              default:
                return 0;
            }
          })();

          const weightedScore = unit * gradeValue;

          // Return updated course
          return {...c, gradeValue, weightedScore};
        }

        // Return unchanged course
        return c;
      });

      return updated;
    });
  };

  return (
    <div className="horizontal-table">
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Units</th>
            <th>Grade</th>
            <th>Grade Value</th>
            <th>Weighted Score</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => {
            return (
              <tr key={course.id}>
                <td>{course.course_code}</td>
                <td>{course.credit_unit}</td>
                <td className="select-grade">
                  <select
                    value={course.grade}
                    onChange={(e) =>
                      handleGradeChange(course.course_code, e.target.value)
                    }>
                    <option value="">--Select Grade--</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="F">F</option>
                  </select>
                </td>
                <td>{course.gradeValue}</td>
                <td>{course.weightedScore}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <strong>Totals</strong>
            </td>
            <td>
              <strong>{"hi"}</strong>
            </td>
            <td></td>
            <td>{}</td>
            <td>
              <strong>{"hi"}</strong>
            </td>
          </tr>
          <tr>
            <td colSpan="5">
              <strong>GPA = {"hi"}</strong>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const FetchData = (props) => {
  const [unfilteredList, setUnfilteredList] = useState([]);
  const [search, setSearch] = useState("");
  const [areGradesOpen, setAreGradesOpen] = useState(false);
  const [filteredList, setFilteredList] = useState([]);

  const toggleGrades = () => {
    setAreGradesOpen(!areGradesOpen);
  };

  useEffect(() => {
    try {
      axios.get("https://api.hatchways.io/assessment/students").then((res) => {
        setUnfilteredList(res.data.students);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const average = (grades) => {
    let total = 0;
    for (let i = 0; i < grades.length; i++) {
      total += +grades[i];
    }
    const avg = total / grades.length;
    return avg.toFixed(2);
  };

  const updateFilteredList = (searchTerm) => {
    const searchedStudent = unfilteredList.filter((student) => {
      return (`${student.firstName} ${student.lastName}`).toLowerCase().includes(searchTerm.toLowerCase())
    });
    // setFilteredList to the new list
    setFilteredList(searchedStudent);
    setSearch(searchTerm);
  }

  const studentMap = (studentList) => {
    return studentList.map((student) => {
      const { id, firstName, lastName, email, skill, grades, pic, company } =
        student;

      return (
        <div>
          <div key={id} className="student-container">
            <div className="flex-row">
              <img src={pic} className="student-img" />
              <div className="student-info">
                <div className="student-name">{`${firstName.toUpperCase()} ${lastName.toUpperCase()}`}</div>
                <div>Email: {email}</div>
                <div>Company: {company}</div>
                <div>Skill: {skill}</div>
                <div>Average: {average(grades)}</div>
              </div>
            </div>
            <button onClick={toggleGrades} className='toggle-grades-btn'>+</button>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="student-info-page font-link">
      <div>
        <input
          className="search-input"
          type="search"
          id="search"
          placeholder="Search by name"
          onChange={(e) => updateFilteredList(e.target.value)}
        ></input>
        <div className="scroll-and-containers">
          {search.length > 0 && studentMap(filteredList)}
          {search.length === 0 && studentMap(unfilteredList)}
        </div>
      </div>
    </div>
  );
};

export default FetchData;

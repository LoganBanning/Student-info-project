import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import StudentInfo from './Components/studentInfo';

const FetchData = (props) => {
  const [unfilteredList, setUnfilteredList] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    try {
      axios.get("https://api.hatchways.io/assessment/students").then((res) => {
        setUnfilteredList(res.data.students);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

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
      return (
          <StudentInfo student={student} />
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

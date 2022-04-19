import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import StudentInfo from './Components/studentInfo';

const FetchData = (props) => {
  const [unfilteredList, setUnfilteredList] = useState([]);
  const [search, setSearch] = useState("");
  const [tagSearch, setTagSearch] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    try {
      axios.get("https://api.hatchways.io/assessment/students").then((res) => {
        setUnfilteredList(res.data.students);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const updateFilteredList = (searchTerm, searchByTags) => {
    if (searchByTags) {
      setTagSearch(searchTerm);
    } else {
      setSearch(searchTerm);
    }
      // create a list of student ids that match the tag
      const idsThatMatchTag = tags.map(tagObject => {
        if(tagObject.tag.toLowerCase().includes(tagSearch.toLowerCase())) {
          return tagObject.studentId;
        }
      });

      // filter the student list, only include students whose id is in the list above
      const searchedStudentsByTag = unfilteredList.filter((student) => {
        return idsThatMatchTag.includes(student.id)
      });

      // filter the original list of students by a combinations of their first and last name
      const searchedStudentsByName = unfilteredList.filter((student) => {
        return (`${student.firstName} ${student.lastName}`).toLowerCase().includes(search.toLowerCase())
      });

      let finalList = [];
      if(searchByTags) { // meaning the input of the tag-search bar has changed
        finalList = searchedStudentsByTag
        if(search.length > 0) {
          finalList = [...finalList, searchedStudentsByName]
        }
        
      } else { // meaning the input of the name search bar has changed
        finalList = searchedStudentsByName
        if(tagSearch.length > 0) {
          finalList = [...finalList, searchedStudentsByTag];
        }
      }
    
    // setFilteredList to the new list
    setFilteredList(finalList);
  }

  const studentMap = (studentList) => {
    return studentList.map((student) => {
      const studentTags = tags.filter((tag) => {
        return student.id === tag.studentId
      })
      return (
          <StudentInfo key={student.id} tags={studentTags} addTag={addTag} student={student} />
      );
    });
  };

  const addTag = (tag, studentId) => {
   // Add the tag and the studentId in a object to the tags list and update the state
   const newTag = {tag, studentId};
   const newTags = [...tags, newTag];
   setTags(newTags);
  }

  return (
    <div className="student-info-page font-link">
      <div>
        <input
          className="search-input"
          type="search"
          id="search"
          placeholder="Search by Name"
          onChange={(e) => updateFilteredList(e.target.value, false)}
        ></input>
        <input
          className="search-input"
          type="search"
          id="search-tag"
          placeholder="Search by Tag"
          onChange={(e) => updateFilteredList(e.target.value, true)}
        ></input>
        <div className="scroll-and-containers">
          {(search.length > 0 || tagSearch.length > 0) && studentMap(filteredList)}
          {(search.length === 0 && tagSearch.length === 0) && studentMap(unfilteredList)}
        </div>
      </div>
    </div>
  );
};

export default FetchData;

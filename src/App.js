import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import StudentInfo from "./Components/studentInfo";

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

  const filterByTag = (searchTerm, studentList) => {
    // Make sure an empty searchTerm returns the original list!
    if(!searchTerm){
      return studentList
    }
    // create a list of student ids that match the tag
      const idsThatMatchTag = [];
      tags.forEach(tagObject => {
        if(tagObject.tag.toLowerCase().includes(searchTerm.toLowerCase())) {
          idsThatMatchTag.push(tagObject.studentId);
        }
      });

      // filter the student list, only include students whose id is in the list above
      const searchedStudentsByTag = studentList.filter((student) => {
        return idsThatMatchTag.includes(student.id)
      });

      return searchedStudentsByTag;
  };

  const filterByName = (searchTerm, studentList) => {
    // Make sure an empty searchTerm returns the original list!
    if(!searchTerm){
      return studentList
    }
    const searchedStudentsByName = studentList.filter((student) => {
      return `${student.firstName} ${student.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });

    return searchedStudentsByName;
  };

  const updateFilteredList = (searchTerm, searchByTags) => {
    if (searchByTags) { // Searching by tag
      setTagSearch(searchTerm);
      // Filter the original list of students by tag
      const searchResultByTag = filterByTag(searchTerm, unfilteredList);

      // if there is an existing value in the name searchbar
      if (search.length > 0) {
        // Then filter the list by name
        const filteredByTagThenName = filterByName(search, searchResultByTag);
        setFilteredList(filteredByTagThenName);
      } else {
        setFilteredList(searchResultByTag);
      }
    } else { // Searching by name
      setSearch(searchTerm);
      // Filter the list by name using the original list
      const filteredByName = filterByName(searchTerm, unfilteredList);

      // if there is an existing value in the tag searchbar
      if (tagSearch.length > 0) {
        // Then filter the list by tag
        const filteredByNameThenTag = filterByTag(
          tagSearch,
          filteredByName
        );
        setFilteredList(filteredByNameThenTag);
      } else {
        setFilteredList(filteredByName)
      }
    }
  };

  const studentMap = (studentList) => {
    return studentList.map((student) => {
      const studentTags = tags.filter((tag) => {
        return student.id === tag.studentId;
      });
      return (
        <StudentInfo
          key={student.id}
          tags={studentTags}
          addTag={addTag}
          student={student}
        />
      );
    });
  };

  const addTag = (tag, studentId) => {
    // Add the tag and the studentId in a object to the tags list and update the state
    const newTag = { tag, studentId };
    const newTags = [...tags, newTag];
    setTags(newTags);
  };

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
          {(search.length > 0 || tagSearch.length > 0) &&
            studentMap(filteredList)}
          {search.length === 0 &&
            tagSearch.length === 0 &&
            studentMap(unfilteredList)}
        </div>
      </div>
    </div>
  );
};

export default FetchData;

import { useState } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";

const StudentInfo = (props) => {
  const [areGradesOpen, setAreGradesOpen] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const { student, addTag, tags } = props;
  const { id, firstName, lastName, email, skill, grades, pic, company } =
    student;

  const allGrades = (grades) => {
    return grades.map((grade, index) => {
      return (
        <div key={index}>
          Test {index + 1}: {grade}%
        </div>
      );
    });
  };

  const allTags = (tags) => {
    return tags.map((tagObject, index) => {
      return <div className='student-tags' key={index}>{tagObject.tag}</div>;
    });
  };

  const toggleGrades = () => {
    setAreGradesOpen(!areGradesOpen);
  };

  const submitTag = (e) => {
    e.preventDefault();
    // add the tag
    addTag(tagInput, id);
    // clear the input
    setTagInput("");
  };

  const average = (grades) => {
    let total = 0;
    for (let i = 0; i < grades.length; i++) {
      total += +grades[i];
    }
    const avg = total / grades.length;
    return avg.toFixed(2);
  };

  return (
    <div key={id} className="student-container">
      <div className="flex-row">
        <img src={pic} className="student-img" />
        <div className="student-info">
          <div className="student-name">{`${firstName?.toUpperCase()} ${lastName?.toUpperCase()}`}</div>
          <div>Email: {email}</div>
          <div>Company: {company}</div>
          <div>Skill: {skill}</div>
          <div>Average: {average(grades)}</div>
          {allTags(tags)}
          <form onSubmit={submitTag}>
            <input
              className='tag-input'
              placeholder='Add a tag'
              onChange={(e) => setTagInput(e.target.value)}
              type="text"
              value={tagInput}
            ></input>
          </form>
          {areGradesOpen && allGrades(grades)}
        </div>
      </div>
      {!areGradesOpen && [
        <BiPlus onClick={toggleGrades} className="toggle-grades-btn"></BiPlus>,
      ]}
      {areGradesOpen && [
        <BiMinus
          onClick={toggleGrades}
          className="toggle-grades-btn"
        ></BiMinus>,
      ]}
    </div>
  );
};

export default StudentInfo;

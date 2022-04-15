import { useState } from 'react';

  const StudentInfo = (props) => {
  console.log('StudentInfo Props', props);
  const [areGradesOpen, setAreGradesOpen] = useState(false);
  const { student } = props
  const { id, firstName, lastName, email, skill, grades, pic, company } =
  student;

  const allGrades = (grades) => {
    let gradesArr = [];
    for(let i = 0; i < grades.length; i++){
      let result = grades[i];
      result.push(gradesArr);
    }
    return gradesArr;
  }

  const toggleGrades = () => {
    setAreGradesOpen(!areGradesOpen);
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
        <div className="student-name">{`${firstName.toUpperCase()} ${lastName.toUpperCase()}`}</div>
        <div>Email: {email}</div>
        <div>Company: {company}</div>
        <div>Skill: {skill}</div>
        <div>Average: {average(grades)}</div>
      </div>
    </div>
    <button onClick={toggleGrades} className='toggle-grades-btn'>+</button>
  </div>
  )
};

export default StudentInfo;
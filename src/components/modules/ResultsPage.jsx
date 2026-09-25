import React from "react";
import { PageHead } from "./ModuleShared.jsx";

export default function ResultsPage({ results }) {
  const data = results || { gpa: "0", credits: "0 / 0", rank: "-", grades: [] };
  return (
    <div className="module">
      <PageHead
        title="Academic results"
        text="View your performance and grade history"
        action={<button className="secondary-btn">Current semester</button>}
      />
      <div className="result-summary">
        <div>
          <span>Semester GPA</span>
          <b>{data.gpa}</b>
          <small>Current performance</small>
        </div>
        <div>
          <span>Credits earned</span>
          <b>{data.credits}</b>
          <small>Current semester</small>
        </div>
        <div>
          <span>Class rank</span>
          <b>{data.rank}</b>
          <small>Current standing</small>
        </div>
      </div>
      <div className="module-panel grades">
        <h3>Course grades</h3>
        {data.grades.map((grade) => (
          <div key={grade.name}>
            <span>{grade.name}</span>
            <em>{grade.grade}</em>
            <b>{grade.score} / 10</b>
          </div>
        ))}
      </div>
    </div>
  );
}

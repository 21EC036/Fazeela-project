import React from "react";
import { Download } from "lucide-react/dist/esm/lucide-react.mjs";
import { PageHead } from "./ModuleShared.jsx";

export default function AttendancePage({ attendance }) {
  const data = attendance || {
    overall: 0,
    present: 0,
    absent: 0,
    total: 0,
    subjects: [],
  };
  return (
    <div className="module">
      <PageHead
        title="Attendance"
        text="Your attendance record for the current semester"
        action={
          <button className="secondary-btn">
            <Download size={16} /> Download report
          </button>
        }
      />
      <div className="attendance-summary">
        <div className="big-percent">
          <b>{data.overall}%</b>
          <span>Overall attendance</span>
        </div>
        <div>
          <b>{data.present}</b>
          <span>Classes present</span>
        </div>
        <div>
          <b>{data.absent}</b>
          <span>Classes absent</span>
        </div>
        <div>
          <b>{data.total}</b>
          <span>Total classes</span>
        </div>
      </div>
      <div className="module-panel">
        <h3>Subject-wise attendance</h3>
        {data.subjects.map((subject) => (
          <div className="subject-row" key={subject.name}>
            <div>
              <b>{subject.name}</b>
              <span>Current semester</span>
            </div>
            <div className="subject-progress">
              <div className="progress">
                <span
                  style={{
                    width: `${subject.value}%`,
                    background: subject.color,
                  }}
                />
              </div>
            </div>
            <b>{subject.value}%</b>
            <span className="present">
              {subject.value >= 75 ? "On track" : "Needs attention"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

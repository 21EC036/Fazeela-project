import React from "react";
import MyCourses from "./components/modules/MyCourses.jsx";
import Attendance from "./components/modules/Attendance.jsx";
import Assignments from "./components/modules/Assignments.jsx";
import Schedule from "./components/modules/Schedule.jsx";
import Results from "./components/modules/Results.jsx";
import Placement from "./components/modules/Placement.jsx";
import Settings from "./components/modules/Settings.jsx";
import { moduleStyles } from "./components/modules/moduleStyles.js";

export default function AcademicModules({
  active,
  assignments,
  setAssignments,
  courses,
  attendance,
  schedule,
  results,
  notify,
}) {
  const pages = {
    "My Courses": <MyCourses courses={courses} notify={notify} />,
    Attendance: <Attendance attendance={attendance} />,
    Assignments: (
      <Assignments
        assignments={assignments}
        setAssignments={setAssignments}
        notify={notify}
      />
    ),
    Schedule: <Schedule schedule={schedule} />,
    Results: <Results results={results} />,
    Placement: <Placement />,
    Settings: <Settings notify={notify} />,
  };

  return (
    <>
      <style>{moduleStyles}</style>
      {pages[active] || pages.Settings}
    </>
  );
}

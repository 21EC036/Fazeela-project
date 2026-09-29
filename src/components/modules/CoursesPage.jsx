import React, { useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  FileText,
  Plus,
  Search,
  UserRound,
} from "lucide-react/dist/esm/lucide-react.mjs";
import { courseData } from "./moduleData.js";
import { EnrollmentDrawer, PageHead } from "./ModuleShared.jsx";

function CourseDetails({ course, onBack, onEnroll }) {
  const [name, code, teacher, progress, lessons] = course;
  return (
    <div className="course-detail">
      <button className="course-detail-back" onClick={onBack}>
        console.log("Back to my courses")
        ← Back to my courses
      </button>
      <div className="course-detail-hero">
        <div className="course-detail-banner b0">
          <div>
            <BookOpen size={31} />
            <h2>{name}</h2>
            <p>
              Learn, practice, and build strong foundations with guided lessons.
            </p>
          </div>
          <span className="course-detail-code">{code}</span>
        </div>
        <div className="course-detail-body">
          <div className="course-detail-grid">
            <div className="course-detail-stat">
              <span>Instructor</span>
              <b>{teacher}</b>
            </div>
            <div className="course-detail-stat">
              <span>Total lessons</span>
              <b>{lessons}</b>
            </div>
            <div className="course-detail-stat">
              <span>Current semester</span>
              <b>Semester 5</b>
            </div>
            <div className="course-detail-stat">
              <span>Course status</span>
              <b>Available to enroll</b>
            </div>
          </div>
          <div className="course-detail-columns">
            <div>
              <h3>About this course</h3>
              <p>
                This course gives students practical knowledge through
                structured lessons, examples, and academic activities.
              </p>
              <h3>What you will learn</h3>
              <ul>
                <li>Understand the core concepts and terminology.</li>
                <li>Apply the concepts through practical exercises.</li>
                <li>Build confidence for exams and projects.</li>
              </ul>
            </div>
            <div>
              <h3>Your progress</h3>
              <div className="course-detail-progress">
                <div className="progress-label">
                  <span>Course progress</span>
                  <b>{progress}</b>
                </div>
                <div className="progress">
                  <span style={{ width: progress }} />
                </div>
              </div>
              <button
                className="primary-btn course-detail-enroll"
                onClick={onEnroll}
              >
                <Plus size={15} /> Enroll in this course
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CoursesPage({ notify, courses = [] }) {
  const [query, setQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: "",
    semester: "Semester 5",
  });
  const rows = (
    courses.length
      ? courses.map((c) => [
          c.name,
          c.code,
          c.teacher,
          c.progress,
          c.lessons,
          c.tone,
        ])
      : courseData
  ).filter((x) => x[0].toLowerCase().includes(query.toLowerCase()));
  const updateForm = (field, value) =>
    setForm((current) => ({ ...current, [field]: value }));
  const enroll = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.course)
      return notify("Complete your name, email and course");
    setDrawerOpen(false);
    setForm({ name: "", email: "", course: "", semester: "Semester 5" });
    setSuccess(true);
    notify("Course enrolled successfully");
    setTimeout(() => setSuccess(false), 2600);
  };
  if (selectedCourse)
    return (
      <>
        <CourseDetails
          course={selectedCourse}
          onBack={() => setSelectedCourse(null)}
          onEnroll={() => {
            setForm((current) => ({
              ...current,
              course: `${selectedCourse[1]} · ${selectedCourse[0]}`,
            }));
            setDrawerOpen(true);
          }}
        />
        {drawerOpen && (
          <EnrollmentDrawer
            form={form}
            updateForm={updateForm}
            enroll={enroll}
            close={() => setDrawerOpen(false)}
            courseData={courseData}
          />
        )}{" "}
        {success && (
          <div className="assignment-success" role="status">
            <i>✓</i> Enrollment submitted successfully
          </div>
        )}
      </>
    );
  return (
    <>
      <div className="module">
        <PageHead
          title="My courses"
          text="Semester 5 · Computer Science Engineering"
          action={
            <button className="primary-btn" onClick={() => setDrawerOpen(true)}>
              <Plus size={16} /> Enroll course
            </button>
          }
        />
        <div className="filter-row">
          <div className="search-box">
            <Search size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses..."
            />
          </div>
          <span className="filter-chip">Current semester</span>
        </div>
        <div className="course-cards">
          {rows.map((course, i) => (
            <article className="course-card" key={course[1]}>
              <div className={`course-banner b${i % 4}`}>
                <BookOpen size={29} />
                <span>{course[1]}</span>
              </div>
              <div className="course-card-body">
                <h3>{course[0]}</h3>
                <p>
                  <UserRound size={14} />
                  {course[2]}
                </p>
                <p>
                  <FileText size={14} />
                  {course[4]}
                </p>
                <div className="progress-label">
                  <span>Course progress</span>
                  <b>{course[3]}</b>
                </div>
                <div className="progress">
                  <span style={{ width: course[3] }} />
                </div>
                <button onClick={() => setSelectedCourse(course)}>
                  Open course →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
      {drawerOpen && (
        <EnrollmentDrawer
          form={form}
          updateForm={updateForm}
          enroll={enroll}
          close={() => setDrawerOpen(false)}
          courseData={courseData}
        />
      )}{" "}
      {success && (
        <div className="assignment-success" role="status">
          <i>✓</i> Enrollment submitted successfully
        </div>
      )}
    </>
  );
}

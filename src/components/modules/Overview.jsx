import React from "react";
import {
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileText,
  Grid2X2,
  MoreHorizontal,
  Sparkles,
  TrendingUp,
  UserRound,
  Users,
} from "lucide-react/dist/esm/lucide-react.mjs";

export default function Overview({
  firstName,
  results,
  attendance,
  assignments,
  courses,
  schedule,
  setActive,
  setAssignments,
  toggleAssignment,
  cycleMonth,
  month,
  setNotice,
}) {
  const totalDone = assignments.filter(
    (item) => item.status === "Completed",
  ).length;
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="pill">
            <Sparkles size={14} /> Keep going!
          </span>
          <h2>
            You are doing
            <br />
            <strong>great this week.</strong>
          </h2>
          <p>
            You have completed 72% of your learning goals. Let’s make today
            count.
          </p>
          <button onClick={() => setActive("My Courses")}>
            View my progress <ChevronRight size={17} />
          </button>
        </div>
        <div className="hero-art">
          <div className="orbit orbit-a" />
          <div className="orbit orbit-b" />
          <div className="book-stack">
            <div />
            <div />
            <div>
              <BookOpen size={64} />
            </div>
          </div>
          <span className="floating-card top">
            <TrendingUp size={18} /> +12% this week
          </span>
          <span className="floating-card bottom">
            <span className="tiny-avatar">P</span> Great work, {firstName}!
          </span>
        </div>
      </section>
      <section className="stats-grid dashboard-section">
        <Stat
          icon={<TrendingUp />}
          label="Overall performance"
          value={results?.gpa || "0"}
          suffix="/10"
          delta="Current semester GPA"
          tone="purple"
        />
        <Stat
          icon={<UserRound />}
          label="Attendance"
          value={attendance?.overall || 0}
          suffix="%"
          delta="Current attendance"
          tone="teal"
        />
        <Stat
          icon={<FileText />}
          label="Assignments done"
          value={`${totalDone}`}
          suffix={`/${assignments.length}`}
          delta={`${assignments.length - totalDone} remaining`}
          tone="orange"
        />
      </section>
      <section className="dashboard-grid dashboard-section">
        <div className="panel courses-panel">
          <PanelHead
            title="Current courses"
            action="View all"
            onAction={() => setActive("My Courses")}
          />
          <div className="course-list">
            {courses.map((course, index) => (
              <Course key={course.name} c={course} index={index} />
            ))}
          </div>
        </div>
        <div className="panel attendance-panel">
          <PanelHead
            title="Attendance overview"
            action="View details"
            onAction={() => setActive("Attendance")}
          />
          <div className="attendance-ring">
            <div className="ring">
              <div>
                <b>{attendance?.overall || 0}%</b>
                <span>Average</span>
              </div>
            </div>
            <div className="legend">
              <p>
                <i className="dot purple" />
                Present <b>{attendance?.present || 0} days</b>
              </p>
              <p>
                <i className="dot pale" />
                Absent <b>{attendance?.absent || 0} days</b>
              </p>
            </div>
          </div>
          <div className="bar-chart">
            {[52, 74, 57, 82, 63, 91, 72].map((height, index) => (
              <div key={index}>
                <span
                  style={{ height: `${height}%` }}
                  className={index === 5 ? "highlight" : ""}
                />
                <small>{["M", "T", "W", "T", "F", "S", "S"][index]}</small>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bottom-grid dashboard-section">
        <div className="panel assignment-panel">
          <PanelHead
            title="Upcoming assignments"
            action="Add assignment"
            onAction={() => {
              setAssignments((items) => [
                ...items,
                {
                  id: Date.now(),
                  title: "New coursework task",
                  course: "General",
                  due: "Due next week",
                  accent: "teal",
                  status: "Pending",
                },
              ]);
              setNotice("New assignment added");
            }}
          />
          {assignments.slice(0, 3).map((item, index) => (
            <div
              className={`assignment animated-card ${item.status === "Completed" ? "complete" : ""}`}
              key={item.id || item.title}
              style={{ "--delay": `${index * 100}ms` }}
            >
              <button onClick={() => toggleAssignment(index)} className="check">
                {item.status === "Completed" ? "✓" : ""}
              </button>
              <div className={`assignment-icon ${item.accent}`}>
                <FileText size={18} />
              </div>
              <div className="assignment-info">
                <b>{item.title}</b>
                <span>{item.course}</span>
              </div>
              <span className="due">
                {item.status === "Completed" ? "Completed" : item.due}
              </span>
              <button className="more">
                <MoreHorizontal size={20} />
              </button>
            </div>
          ))}
        </div>
        <div className="panel schedule-panel">
          <div className="schedule-top">
            <div>
              <p className="eyebrow">UP NEXT</p>
              <h3>Today’s schedule</h3>
            </div>
            <button onClick={() => cycleMonth(-1)} aria-label="Previous month">
              <ChevronLeft size={17} />
            </button>
            <button onClick={() => cycleMonth(1)} aria-label="Next month">
              <ChevronRight size={17} />
            </button>
          </div>
          {schedule.slice(0, 2).map((item, index) => (
            <div className="schedule-item" key={`${item.subject}-${item.time}`}>
              <span className="time">
                {item.time.split(" ")[0]}
                <br />
                <small>{item.time.split(" ")[1]}</small>
              </span>
              <div className={`line ${index ? "blue-line" : "purple-line"}`} />
              <div>
                <b>{item.subject}</b>
                <p>
                  <UserRound size={13} /> {item.room} · {item.day}
                </p>
              </div>
            </div>
          ))}
          <button
            className="full-schedule"
            onClick={() => setActive("Schedule")}
          >
            <CalendarDays size={17} /> Open full schedule
          </button>
        </div>
      </section>
    </>
  );
}

function Stat({ icon, label, value, suffix, delta, tone }) {
  return (
    <div className="stat">
      <div className={`stat-icon ${tone}`}>{icon}</div>
      <div>
        <p>{label}</p>
        <h2 className="animated-number">
          {value}
          <small>{suffix}</small>
        </h2>
        <span>{delta}</span>
      </div>
    </div>
  );
}
function PanelHead({ title, action, onAction }) {
  return (
    <div className="panel-head">
      <h3>{title}</h3>
      <button onClick={onAction}>
        {action}
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
function Course({ c, index }) {
  return (
    <div
      className="course animated-card"
      style={{ "--delay": `${index * 100}ms` }}
    >
      <div className={`course-icon ${c.tone}`}>
        {index === 0 ? <Grid2X2 /> : index === 1 ? <Users /> : <BookOpen />}
      </div>
      <div className="course-main">
        <div>
          <b>{c.name}</b>
          <span>{c.code}</span>
        </div>
        <p>
          <Clock3 size={14} />
          {c.next}
        </p>
        <div className="progress">
          <span
            style={{
              width: `${c.progress}%`,
              "--progress-width": `${c.progress}%`,
            }}
          />
        </div>
      </div>
      <div className="course-score">
        <b>{c.progress}%</b>
        <span>Progress</span>
      </div>
    </div>
  );
}

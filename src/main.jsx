import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Bell,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock3,
  FileText,
  GraduationCap,
  Grid2X2,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Search,
  Settings,
  Sparkles,
  TrendingUp,
  UserRound,
  Users,
} from "lucide-react/dist/esm/lucide-react.mjs";
import "./styles.css";
import AcademicModules from "./AcademicModules.jsx";
import LoginPage from "./components/LoginPage.jsx";
import AppFooter from "./components/AppFooter.jsx";
import Overview from "./components/modules/Overview.jsx";

const nav = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "My Courses", icon: BookOpen },
  { label: "Attendance", icon: UserRound },
  { label: "Assignments", icon: FileText, badge: "3" },
  { label: "Schedule", icon: CalendarDays },
  { label: "Results", icon: GraduationCap },
  { label: "Placement", icon: BriefcaseBusiness },
];

let courses = [
  {
    name: "Data Structures",
    code: "CSE 302",
    tone: "violet",
    progress: 72,
    next: "Today, 10:30 AM",
    teacher: "Dr. N. Sharma",
  },
  {
    name: "Computer Networks",
    code: "CSE 304",
    tone: "blue",
    progress: 61,
    next: "Tomorrow, 09:00 AM",
    teacher: "Prof. A. Kumar",
  },
  {
    name: "Database Systems",
    code: "CSE 306",
    tone: "orange",
    progress: 84,
    next: "Thu, 11:45 AM",
    teacher: "Dr. R. Mehta",
  },
];

const initialAssignments = [
  {
    title: "Linked List Implementation",
    course: "Data Structures",
    due: "Due today",
    accent: "purple",
    status: "In progress",
  },
  {
    title: "SQL Query Optimization",
    course: "Database Systems",
    due: "Due in 2 days",
    accent: "orange",
    status: "Pending",
  },
  {
    title: "Network Topology Report",
    course: "Computer Networks",
    due: "Due Sep 28",
    accent: "blue",
    status: "Pending",
  },
];

const initialAttendance = {
  overall: 82,
  present: 41,
  absent: 9,
  total: 50,
  subjects: [
    { name: "Data Structures", value: 88, color: "#6552d7" },
    { name: "Computer Networks", value: 76, color: "#398fc6" },
    { name: "Database Systems", value: 84, color: "#38a88d" },
  ],
};

const initialSchedule = [
  { day: "Monday", time: "09:00 AM", subject: "Computer Networks", room: "Lab 3" },
  { day: "Tuesday", time: "10:30 AM", subject: "Data Structures", room: "Room 204" },
  { day: "Wednesday", time: "01:15 PM", subject: "Database Systems", room: "Room 105" },
  { day: "Friday", time: "03:00 PM", subject: "Software Engineering", room: "Seminar Hall" },
];

const initialResults = {
  gpa: "8.4",
  credits: "24 / 24",
  rank: "12",
  grades: [
    { name: "Data Structures", grade: "A", score: "8.8" },
    { name: "Computer Networks", grade: "A-", score: "8.2" },
    { name: "Database Systems", grade: "A", score: "8.6" },
  ],
};

const notificationStyles = `.notification-wrap{position:relative}.notification-panel{position:absolute;right:0;top:47px;width:320px;background:#fff;border:1px solid #ececf3;border-radius:13px;box-shadow:0 16px 35px #3029581c;z-index:25;overflow:hidden;animation:notification-in .18s ease-out}.notification-panel-head{display:flex;align-items:center;justify-content:space-between;padding:15px 16px;border-bottom:1px solid #f0f0f5}.notification-panel-head h3{font-size:13px;margin:0}.notification-panel-head span{font-size:10px;color:#6552d7;font-weight:700}.notification-item{display:flex;gap:10px;padding:13px 16px;border-bottom:1px solid #f5f5f8;text-align:left;width:100%}.notification-item:hover{background:#faf9ff}.notification-item i{height:29px;width:29px;border-radius:9px;background:#eeebff;color:#6552d7;display:grid;place-items:center;font-style:normal;flex:0 0 auto}.notification-item b{display:block;font-size:11px;margin-bottom:3px}.notification-item p{color:#858698;font-size:10px;line-height:1.45;margin:0}.notification-item time{display:block;color:#aaaaba;font-size:9px;margin-top:4px}.notification-empty{padding:22px 16px;color:#8e90a0;font-size:11px;text-align:center}@keyframes notification-in{from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:translateY(0)}}@media(max-width:560px){.notification-panel{position:fixed;top:74px;right:14px;left:14px;width:auto}}`;

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: "Fazeela M" });
  const [active, setActive] = useState("Overview");
  const [open, setOpen] = useState(false);
  const [assignments, setAssignments] = useState(initialAssignments);
  const [localCourses, setLocalCourses] = useState(courses);
  const [attendance] = useState(initialAttendance);
  const [schedule] = useState(initialSchedule);
  const [results] = useState(initialResults);
  const [notice, setNotice] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [month, setMonth] = useState("September 2026");
  const totalDone = useMemo(
    () => assignments.filter((a) => a.status === "Completed").length,
    [assignments],
  );

  const toggleAssignment = (idx) => {
    setAssignments((items) =>
      items.map((item, i) =>
        i === idx
          ? {
              ...item,
              status: item.status === "Completed" ? "Pending" : "Completed",
            }
          : item,
      ),
    );
    notify("Assignment status updated");
  };
  const cycleMonth = (dir) =>
    setMonth((current) =>
      current === "September 2026"
        ? dir > 0
          ? "October 2026"
          : "August 2026"
        : "September 2026",
    );
  const notify = (message) => {
    setNotice(message);
    setTimeout(() => setNotice(""), 2200);
  };
  const firstName = user.name?.split(" ")[0] || "Student";
  const initials =
    user.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "ST";

  const login = (email, password) => {
    if (!email.trim() || !password.trim()) {
      throw new Error("Enter your email and password to continue.");
    }
    setUser({ name: "Fazeela M", semester: "Semester 5" });
    setAssignments(initialAssignments);
    setLocalCourses(courses);
    setLoggedIn(true);
  };
  if (!loggedIn) return <LoginPage onLogin={login} />;

  const notifications = [
    {
      type: "Placement",
      title: "Microsoft placement drive opened",
      text: "Register your interest before September 30.",
      time: "10 minutes ago",
      target: "Placement",
    },
    {
      type: "Assignment",
      title: "SQL Query Optimization is due soon",
      text: "Your Database Systems assignment is due in 2 days.",
      time: "1 hour ago",
      target: "Assignments",
    },
    {
      type: "Schedule",
      title: "Computer Networks lab reminder",
      text: "Lab 3 starts today at 09:00 AM.",
      time: "3 hours ago",
      target: "Schedule",
    },
    {
      type: "Results",
      title: "Grade update available",
      text: "Your latest course results are ready to view.",
      time: "Yesterday",
      target: "Results",
    },
  ];

  return (
    <>
      <style>{notificationStyles}</style>

      <div className="dashboard-bg-orb orb-one" />
      <div className="dashboard-bg-orb orb-two" />
      <div className="dashboard-bg-orb orb-three" />

      <div className="app-shell">
        <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
          <div className="brand">
            <div className="brand-mark">
              <GraduationCap size={25} />
            </div>
            <span>Acadly</span>
          </div>
          <div className="student-mini">
            <div className="avatar small">{initials}</div>
            <div>
              <b>{user.name}</b>
              <span>{user.semester || "Semester 5"} · CSE</span>
            </div>
            <ChevronDown size={15} />
          </div>
          <p className="nav-caption">MAIN MENU</p>
          <nav>
            {nav.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    setActive(item.label);
                    setOpen(false);
                  }}
                  className={`nav-link ${active === item.label ? "active" : ""}`}
                >
                  <Icon size={19} />
                  <span>{item.label}</span>
                  {item.badge && <em>{item.badge}</em>}
                </button>
              );
            })}
          </nav>
          <div className="sidebar-bottom">
            <button
              onClick={() => setActive("Settings")}
              className={`nav-link ${active === "Settings" ? "active" : ""}`}
            >
              <Settings size={19} />
              <span>Settings</span>
            </button>
            <button
              onClick={() =>
                notify("Student support is available at support@acadly.edu")
              }
              className="nav-link"
            >
              <CircleHelp size={19} />
              <span>Help center</span>
            </button>
            <div className="upgrade">
              <Sparkles size={18} />
              <b>Need help?</b>
              <p>Visit the student support hub.</p>
              <button onClick={() => notify("Student support opened")}>
                Explore now
              </button>
            </div>
          </div>
        </aside>
        {open && <div className="scrim" onClick={() => setOpen(false)} />}
        <main>
          <header>
            <button className="mobile-menu" onClick={() => setOpen(true)}>
              <Menu />
            </button>
            <div>
              <p className="eyebrow">
                {new Intl.DateTimeFormat("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })
                  .format(new Date())
                  .toUpperCase()}
              </p>
              <h1>
                {active === "Overview" ? `Good morning, ${firstName}!` : active}
              </h1>
            </div>
            <div className="header-actions">
              <button className="icon-btn">
                <Search size={20} />
              </button>
              <div className="notification-wrap">
                <button
                  className="icon-btn notification"
                  onClick={() => setNotificationsOpen((value) => !value)}
                  aria-label="Open notifications"
                >
                  <Bell size={20} />
                  <i />
                </button>
                {notificationsOpen && (
                  <div className="notification-panel">
                    <div className="notification-panel-head">
                      <h3>Notifications</h3>
                      <span>{notifications.length} new</span>
                    </div>
                    {notifications.map((item) => (
                      <button
                        className="notification-item"
                        key={item.title}
                        onClick={() => {
                          setActive(item.target);
                          setNotificationsOpen(false);
                        }}
                      >
                        <i>{item.type.slice(0, 1)}</i>
                        <span>
                          <b>{item.title}</b>
                          <p>{item.text}</p>
                          <time>{item.time}</time>
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="avatar">{initials}</div>
            </div>
          </header>
          {active === "Overview" ? (
            <Overview
              firstName={firstName}
              results={results}
              attendance={attendance}
              assignments={assignments}
              courses={localCourses}
              schedule={schedule}
              setActive={setActive}
              setAssignments={setAssignments}
              toggleAssignment={toggleAssignment}
              cycleMonth={cycleMonth}
              month={month}
              setNotice={setNotice}
            />
          ) : active === "__legacy_overview__" ? (
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
                    You have completed 72% of your learning goals. Let’s make
                    today count.
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
                    <span className="tiny-avatar">P</span> Great work,{" "}
                    {firstName}!
                  </span>
                </div>
              </section>
              <section className="stats-grid">
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
              <section className="dashboard-grid">
                <div className="panel courses-panel">
                  <PanelHead
                    title="Current courses"
                    action="View all"
                    onAction={() => setActive("My Courses")}
                  />
                  <div className="course-list">
                    {localCourses.map((c, i) => (
                      <Course key={c.name} c={c} index={i} />
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
                    {[52, 74, 57, 82, 63, 91, 72].map((h, i) => (
                      <div key={i}>
                        <span
                          style={{ height: `${h}%` }}
                          className={i === 5 ? "highlight" : ""}
                        />
                        <small>{["M", "T", "W", "T", "F", "S", "S"][i]}</small>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <section className="bottom-grid">
                <div className="panel assignment-panel">
                  <PanelHead
                    title="Upcoming assignments"
                    action="Add assignment"
                    onAction={() => {
                      setAssignments((a) => [
                        ...a,
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
                  {assignments.slice(0, 3).map((a, i) => (
                    <div
                      className={`assignment ${a.status === "Completed" ? "complete" : ""}`}
                      key={a.id || a.title}
                    >
                      <button
                        onClick={() => toggleAssignment(i)}
                        className="check"
                      >
                        {a.status === "Completed" ? "✓" : ""}
                      </button>
                      <div className={`assignment-icon ${a.accent}`}>
                        <FileText size={18} />
                      </div>
                      <div className="assignment-info">
                        <b>{a.title}</b>
                        <span>{a.course}</span>
                      </div>
                      <span className="due">
                        {a.status === "Completed" ? "Completed" : a.due}
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
                    <button onClick={() => cycleMonth(-1)}>
                      <ChevronLeft size={17} />
                    </button>
                    <button onClick={() => cycleMonth(1)}>
                      <ChevronRight size={17} />
                    </button>
                  </div>
                  {schedule.slice(0, 2).map((item, i) => (
                    <div
                      className="schedule-item"
                      key={`${item.subject}-${item.time}`}
                    >
                      <span className="time">
                        {item.time.split(" ")[0]}
                        <br />
                        <small>{item.time.split(" ")[1]}</small>
                      </span>
                      <div
                        className={`line ${i ? "blue-line" : "purple-line"}`}
                      />
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
          ) : (
            <AcademicModules
              active={active}
              assignments={assignments}
              setAssignments={setAssignments}
              courses={localCourses}
              attendance={attendance}
              schedule={schedule}
              results={results}
              notify={notify}
            />
          )}
        </main>
        <AppFooter />
        {notice && <div className="toast">✓ {notice}</div>}
      </div>
    </>
  );
}

function Stat({ icon, label, value, suffix, delta, tone }) {
  return (
    <div className="stat">
      <div className={`stat-icon ${tone}`}>{icon}</div>
      <div>
        <p>{label}</p>
        <h2>
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
    <div className="course">
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
          <span style={{ width: `${c.progress}%` }} />
        </div>
      </div>
      <div className="course-score">
        <b>{c.progress}%</b>
        <span>Progress</span>
      </div>
    </div>
  );
}
function FeatureView({ title, month, onBack }) {
  return (
    <div className="feature-view">
      <div className="feature-icon">
        <GraduationCap size={34} />
      </div>
      <h2>{title} workspace</h2>
      <p>
        Your {title.toLowerCase()} information is organized here. This section
        is ready for additional records and integrations.
      </p>
      <div className="feature-cards">
        <div>
          <b>{month}</b>
          <span>Current academic period</span>
        </div>
        <div>
          <b>24</b>
          <span>Learning activities</span>
        </div>
        <div>
          <b>92%</b>
          <span>Participation score</span>
        </div>
      </div>
      <button onClick={onBack}>← Return to dashboard</button>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);

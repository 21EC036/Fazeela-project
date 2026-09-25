import React, { useState } from "react";
import { CalendarDays, Plus, X } from "lucide-react/dist/esm/lucide-react.mjs";
import { PageHead } from "./ModuleShared.jsx";

const scheduleStyles = `
.schedule-actions{display:flex;align-items:center;gap:9px}.schedule-drawer{position:fixed;inset:0 0 0 auto;width:min(430px,100%);z-index:31;background:#fff;padding:27px 25px;box-shadow:-12px 0 35px #332b5b22;overflow:auto;animation:drawer-in .28s ease-out}.schedule-drawer-backdrop{position:fixed;inset:0;z-index:30;background:#27233d55;animation:fade-in .2s ease-out}.schedule-field{display:block;color:#4c4d5f;font-size:11px;font-weight:700;margin:17px 0}.schedule-field input,.schedule-field select{display:block;width:100%;margin-top:7px;border:1px solid #e4e5ed;border-radius:9px;padding:11px 12px;outline:0;background:#fff;color:#404153;font:inherit;font-size:12px}.schedule-field input:focus,.schedule-field select:focus{border-color:#7160db;box-shadow:0 0 0 3px #eeeaff}.schedule-success{position:fixed;left:50%;bottom:28px;z-index:40;background:#24213a;color:#fff;border-radius:11px;padding:13px 17px;font-size:12px;transform:translateX(-50%);animation:success-pop .35s ease-out}.schedule-toolbar{display:flex;align-items:center;justify-content:space-between;margin:20px 0 12px}.schedule-today{border:1px solid #e8e8f0;border-radius:8px;padding:8px 12px;color:#636477;font-size:11px;font-weight:700}.schedule-views{display:flex;background:#eeecf7;border-radius:8px;padding:3px}.schedule-views button{padding:7px 11px;border-radius:6px;color:#77778a;font-size:10px;font-weight:700}.schedule-views button.active{background:#fff;color:#6552d7;box-shadow:0 2px 6px #4d437015}.week-calendar{background:#fff;border:1px solid #eff0f5;border-radius:14px;overflow:auto}.week-header,.week-body{display:grid;grid-template-columns:68px repeat(7,minmax(105px,1fr));min-width:810px}.week-header{border-bottom:1px solid #eff0f5}.week-header>div{padding:13px 8px;text-align:center;border-left:1px solid #f1f1f5}.week-header .week-corner{border-left:0}.week-header small{display:block;color:#a0a1b0;font-size:9px;text-transform:uppercase}.week-header b{display:block;color:#35364a;font-size:12px;margin-top:5px}.week-header .today-column b{color:#6552d7}.week-body{height:720px}.week-time-column{position:relative}.week-time{height:72px;padding:9px 8px 0;text-align:right;color:#9a9baa;font-size:10px}.week-day-column{position:relative;border-left:1px solid #f1f1f5;background:repeating-linear-gradient(to bottom,transparent 0,transparent 71px,#f1f1f5 71px,#f1f1f5 72px)}.calendar-event{position:absolute;left:5px;right:5px;min-height:38px;overflow:hidden;padding:7px 8px;border-left:3px solid #6552d7;border-radius:6px;background:#eeebff;color:#40339b;font-size:10px;line-height:1.25}.calendar-event.blue{background:#e0f0fb;border-color:#398fc6;color:#236487}.calendar-event.orange{background:#fff0df;border-color:#e19944;color:#895414}.calendar-event.green{background:#e1f5ee;border-color:#38a88d;color:#267761}.calendar-event strong,.calendar-event span{display:block}.calendar-event strong{font-size:10px}.calendar-event span{margin-top:3px;opacity:.75}.schedule-empty{color:#8e90a0;font-size:12px;padding:28px 0;text-align:center}.schedule-drawer .drawer-actions{display:flex;justify-content:flex-end;gap:9px;margin-top:27px}@keyframes drawer-in{from{transform:translateX(100%)}to{transform:translateX(0)}}@keyframes fade-in{from{opacity:0}to{opacity:1}}@keyframes success-pop{from{opacity:0;transform:translate(-50%,15px) scale(.94)}to{opacity:1;transform:translate(-50%,0) scale(1)}}@media(max-width:700px){.schedule-toolbar{align-items:flex-start;gap:10px}.schedule-views button{padding:7px 8px}}
`;

export default function SchedulePage({ schedule = [] }) {
  const [classes, setClasses] = useState(schedule);
  const [day, setDay] = useState("All");
  const [monthOpen, setMonthOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    subject: "",
    day: "Monday",
    time: "09:00",
    room: "",
    duration: "60",
  });
  const [selectedMonth, setSelectedMonth] = useState(
    new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(
      new Date(),
    ),
  );
  const days = ["All", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const months = Array.from({ length: 12 }, (_, index) =>
    new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(
      new Date(new Date().getFullYear(), index, 1),
    ),
  );
  const selectedMonthDate = new Date(`${selectedMonth} 1`);
  const monthStart = new Date(
    selectedMonthDate.getFullYear(),
    selectedMonthDate.getMonth(),
    1,
  );
  const nextMonthStart = new Date(
    selectedMonthDate.getFullYear(),
    selectedMonthDate.getMonth() + 1,
    1,
  );
  const monthDays = Math.round(
    (nextMonthStart.getTime() - monthStart.getTime()) / (1000 * 60 * 60 * 24),
  );
  const today = new Date();
  const monthProgress =
    today < monthStart
      ? 0
      : today >= nextMonthStart
        ? 100
        : Math.min(100, Math.round((today.getDate() / monthDays) * 100));
  const visible = classes.filter(
    (item) =>
      (day === "All" || !item.day || item.day === day) &&
      (!item.month || item.month === selectedMonth),
  );
  const calendarDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const hourSlots = Array.from({ length: 10 }, (_, index) => index + 8);
  const selectedMonthNumber = selectedMonthDate.getMonth();
  const selectedYear = selectedMonthDate.getFullYear();
  const referenceDate =
    selectedYear === today.getFullYear() && selectedMonthNumber === today.getMonth()
      ? today
      : new Date(selectedYear, selectedMonthNumber, 15);
  const weekStart = new Date(referenceDate);
  weekStart.setDate(referenceDate.getDate() - referenceDate.getDay());
  const weekDates = calendarDays.map((_, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    return date;
  });
  const getEventPosition = (value, duration = 60) => {
    const match = String(value || "").match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
    if (!match) return { top: 0, height: 60 };
    let hour = Number(match[1]);
    const minute = Number(match[2]);
    const period = match[3]?.toUpperCase();
    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;
    return {
      top: Math.max(0, (hour - 8 + minute / 60) * 72),
      height: Math.max(42, (Number(duration) || 60) * 1.2),
    };
  };
  const updateForm = (field, value) =>
    setForm((current) => ({ ...current, [field]: value }));
  const formatTime = (value) => {
    if (!value || value.includes("AM") || value.includes("PM")) return value;
    const [hours, minutes] = value.split(":");
    const hour = Number(hours);
    if (Number.isNaN(hour)) return value;
    return `${String(hour % 12 || 12).padStart(2, "0")}:${minutes} ${hour >= 12 ? "PM" : "AM"}`;
  };
  const addClass = (event) => {
    event.preventDefault();
    setClasses((current) => [
      ...current,
      {
        id: Date.now(),
        subject: form.subject.trim(),
        day: form.day,
        time: formatTime(form.time),
        room: form.room.trim() || "Room to be assigned",
        duration: Number(form.duration) || 60,
        month: selectedMonth,
      },
    ]);
    setForm({
      subject: "",
      day: "Monday",
      time: "09:00",
      room: "",
      duration: "60",
    });
    setDrawerOpen(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2600);
  };
  return (
    <>
      <style>{scheduleStyles}</style>
      <div className="module">
      <PageHead
        title="Class schedule"
        text="Your weekly learning calendar"
        action={
          <div className="schedule-actions">
            <button className="primary-btn" onClick={() => setDrawerOpen(true)}>
              <Plus size={16} /> Add class
            </button>
            <div className="month-filter">
            <button
              className="secondary-btn schedule-month-button"
              onClick={() => setMonthOpen((open) => !open)}
              aria-expanded={monthOpen}
            >
              <CalendarDays size={16} /> {selectedMonth}
            </button>
            {monthOpen && (
              <div className="month-filter-menu">
                {months.map((month) => (
                  <button
                    key={month}
                    className={month === selectedMonth ? "selected" : ""}
                    onClick={() => {
                      setSelectedMonth(month);
                      setMonthOpen(false);
                    }}
                  >
                    {month}
                  </button>
                ))}
              </div>
            )}
            </div>
          </div>
        }
      />
      <div className="month-progress-panel module-panel">
        <div className="month-progress-heading">
          <div>
            <span>Monthly progress</span>
            <b>{selectedMonth}</b>
          </div>
          <strong>{monthProgress}%</strong>
        </div>
        <div className="month-progress-track">
          <span style={{ width: `${monthProgress}%` }} />
        </div>
        <p>
          {monthProgress === 100
            ? "This month is complete."
            : monthProgress === 0
              ? "This month has not started yet."
              : `${monthProgress}% of the month has passed.`}
        </p>
      </div>
      <div className="schedule-toolbar">
        <button className="schedule-today" onClick={() => setSelectedMonth(months[today.getMonth()])}>
          Today
        </button>
        <div className="schedule-views">
          <button>Day</button>
          <button className="active">Week</button>
          <button>Month</button>
        </div>
      </div>
      <div className="week-calendar">
        <div className="week-header">
          <div className="week-corner" />
          {weekDates.map((date, index) => (
            <div
              className={date.toDateString() === today.toDateString() ? "today-column" : ""}
              key={calendarDays[index]}
            >
              <small>{calendarDays[index].slice(0, 3)}</small>
              <b>{date.getDate()}</b>
            </div>
          ))}
        </div>
        <div className="week-body">
          <div className="week-time-column">
            {hourSlots.map((hour) => (
              <div className="week-time" key={hour}>
                {hour > 12 ? hour - 12 : hour}:00 {hour >= 12 ? "PM" : "AM"}
              </div>
            ))}
          </div>
          {calendarDays.map((calendarDay) => (
            <div className="week-day-column" key={calendarDay}>
              {visible
                .filter((event) => day === "All" || event.day === day)
                .filter((event) => event.day === calendarDay)
                .map((event, index) => {
                  const position = getEventPosition(event.time, event.duration);
                  return (
                    <div
                      className={`calendar-event ${["", "blue", "orange", "green"][index % 4]}`}
                      key={event.id || `${event.subject}-${event.time}`}
                      style={{ top: position.top, height: position.height }}
                    >
                      <strong>{event.subject}</strong>
                      <span>
                        {event.time} · {event.room}
                      </span>
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
      </div>
      {drawerOpen && (
        <>
          <div className="schedule-drawer-backdrop" onClick={() => setDrawerOpen(false)} />
          <aside className="schedule-drawer" aria-label="Add class to schedule">
            <div className="drawer-head">
              <div>
                <h2>Add class</h2>
                <p>Add a class to {selectedMonth}.</p>
              </div>
              <button className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close add class form">
                <X size={17} />
              </button>
            </div>
            <form onSubmit={addClass}>
              <label className="schedule-field">
                Subject
                <input value={form.subject} onChange={(event) => updateForm("subject", event.target.value)} placeholder="e.g. Operating Systems" required autoFocus />
              </label>
              <label className="schedule-field">
                Day
                <select value={form.day} onChange={(event) => updateForm("day", event.target.value)}>
                  {days.slice(1).map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label className="schedule-field">
                Time
                <input type="time" value={form.time} onChange={(event) => updateForm("time", event.target.value)} required />
              </label>
              <label className="schedule-field">
                Room
                <input value={form.room} onChange={(event) => updateForm("room", event.target.value)} placeholder="e.g. Room 301" required />
              </label>
              <label className="schedule-field">
                Duration in minutes
                <input type="number" min="15" step="15" value={form.duration} onChange={(event) => updateForm("duration", event.target.value)} required />
              </label>
              <div className="drawer-actions">
                <button type="button" className="secondary-btn" onClick={() => setDrawerOpen(false)}>Cancel</button>
                <button type="submit" className="primary-btn"><Plus size={15} /> Add to timetable</button>
              </div>
            </form>
          </aside>
        </>
      )}
      {success && <div className="schedule-success" role="status">Class added to your timetable.</div>}
    </>
  );
}

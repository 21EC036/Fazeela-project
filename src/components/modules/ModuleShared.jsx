import React from "react";
import { CheckCircle2, X } from "lucide-react/dist/esm/lucide-react.mjs";

export function PageHead({ title, text, action, children }) {
  return (
    <>
      <div className="module-head">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        {action}
      </div>
      {children}
    </>
  );
}

export function EnrollmentDrawer({
  form,
  updateForm,
  enroll,
  close,
  courseData,
}) {
  return (
    <>
      <div className="assignment-drawer-backdrop" onClick={close} />
      <aside className="assignment-drawer" aria-label="Enroll in a course">
        <div className="drawer-head">
          <div>
            <h2>Enroll in a course</h2>
            <p>Complete your details to join a new class.</p>
          </div>
          <button
            className="drawer-close"
            onClick={close}
            aria-label="Close enrollment form"
          >
            <X size={17} />
          </button>
        </div>
        <form onSubmit={enroll}>
          <label className="drawer-field">
            Full name
            <input
              value={form.name}
              onChange={(e) => updateForm("name", e.target.value)}
              placeholder="Enter your full name"
              required
              autoFocus
            />
          </label>
          <label className="drawer-field">
            University email
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateForm("email", e.target.value)}
              placeholder="you@university.edu"
              required
            />
          </label>
          <label className="drawer-field">
            Select course
            <select
              value={form.course}
              onChange={(e) => updateForm("course", e.target.value)}
              required
            >
              <option value="">Choose a course</option>
              {courseData.map((c) => (
                <option key={c[1]} value={`${c[1]} · ${c[0]}`}>
                  {c[1]} · {c[0]}
                </option>
              ))}
            </select>
          </label>
          <label className="drawer-field">
            Semester
            <select
              value={form.semester}
              onChange={(e) => updateForm("semester", e.target.value)}
            >
              <option>Semester 5</option>
              <option>Semester 6</option>
            </select>
          </label>
          <div className="drawer-actions">
            <button type="button" className="secondary-btn" onClick={close}>
              Cancel
            </button>
            <button type="submit" className="primary-btn">
              <CheckCircle2 size={15} /> Submit enrollment
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}

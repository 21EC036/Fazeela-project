import React, { useState } from "react";
import {
  FileText,
  Plus,
  Trash2,
  X,
} from "lucide-react/dist/esm/lucide-react.mjs";
import { PageHead } from "./ModuleShared.jsx";

function AssignmentDrawer({ form, updateForm, submit, close }) {
  return (
    <>
      <div className="assignment-drawer-backdrop" onClick={close} />
      <aside className="assignment-drawer">
        <div className="drawer-head">
          <div>
            <h2>Add assignment</h2>
            <p>Keep your course work organized.</p>
          </div>
          <button className="drawer-close" onClick={close}>
            <X size={17} />
          </button>
        </div>
        <form onSubmit={submit}>
          <label className="drawer-field">
            Title
            <input
              value={form.title}
              onChange={(e) => updateForm("title", e.target.value)}
              required
            />
          </label>
          <label className="drawer-field">
            Course
            <input
              value={form.course}
              onChange={(e) => updateForm("course", e.target.value)}
              required
            />
          </label>
          <label className="drawer-field">
            Due date
            <input
              type="date"
              value={form.due}
              onChange={(e) => updateForm("due", e.target.value)}
              required
            />
          </label>
          <label className="drawer-field">
            Description
            <textarea
              value={form.description}
              onChange={(e) => updateForm("description", e.target.value)}
            />
          </label>
          <div className="drawer-actions">
            <button type="button" className="secondary-btn" onClick={close}>
              Cancel
            </button>
            <button type="submit" className="primary-btn">
              <Plus size={15} /> Add assignment
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}

export default function AssignmentsPage({
  assignments,
  setAssignments,
  notify,
}) {
  const [filter, setFilter] = useState("All");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    title: "",
    course: "",
    due: "",
    description: "",
  });
  const visible = assignments.filter(
    (item) => filter === "All" || item.status === filter,
  );
  const updateForm = (field, value) =>
    setForm((current) => ({ ...current, [field]: value }));
  const submit = (event) => {
    event.preventDefault();
    setAssignments((items) => [
      ...items,
      {
        title: form.title.trim(),
        course: form.course,
        due: `Due ${form.due}`,
        description: form.description.trim(),
        accent: "teal",
        status: "Pending",
      },
    ]);
    setForm({ title: "", course: "", due: "", description: "" });
    setDrawerOpen(false);
    setSuccess(true);
    notify("Assignment added successfully");
    setTimeout(() => setSuccess(false), 2600);
  };
  const toggle = (index) =>
    setAssignments((items) =>
      items.map((item, i) =>
        i === index
          ? {
              ...item,
              status: item.status === "Completed" ? "Pending" : "Completed",
            }
          : item,
      ),
    );
  return (
    <>
      <div className="module">
        <PageHead
          title="Assignments"
          text="Plan, track and submit your course work"
          action={
            <button className="primary-btn" onClick={() => setDrawerOpen(true)}>
              <Plus size={16} /> Add assignment
            </button>
          }
        />
        <div className="tabs">
          {["All", "Pending", "Completed"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={filter === item ? "selected" : ""}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="assignment-table">
          {visible.map((item) => {
            const index = assignments.indexOf(item);
            return (
              <div className="assignment full" key={`${item.title}-${index}`}>
                <button className="check" onClick={() => toggle(index)}>
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
                <button
                  className="delete-btn"
                  onClick={() =>
                    setAssignments((items) =>
                      items.filter((_, itemIndex) => itemIndex !== index),
                    )
                  }
                >
                  <Trash2 size={15} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
      {drawerOpen && (
        <AssignmentDrawer
          form={form}
          updateForm={updateForm}
          submit={submit}
          close={() => setDrawerOpen(false)}
        />
      )}{" "}
      {success && (
        <div className="assignment-success" role="status">
          <i>✓</i> Assignment added successfully
        </div>
      )}
    </>
  );
}

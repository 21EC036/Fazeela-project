import React, { useState } from "react";
import {
  CheckCircle2,
  Mail,
  Save,
} from 
"lucide-react/dist/esm/lucide-react.mjs";
import { PageHead } from "./ModuleShared.jsx";

export default function SettingsPage({ notify }) {
  const [saved, setSaved] = useState(false);
  return (
    <div className="module">
      <PageHead
        title="Settings"
        text="Manage your academic account preferences"
      />
      <div className="settings-grid">
        <div className="module-panel profile">
          <h3>Profile information</h3>
          <label>
            Full name
            <input defaultValue="Fazeela M" />
          </label>
          <label>
            University email
            <input defaultValue="fazeela.m@gmail.com" />
          </label>
          <label>
            Program
            <input defaultValue="B.Tech Computer Science" />
          </label>
          <button
            className="primary-btn"
            onClick={() => {
              setSaved(true);
              notify("Profile settings saved");
            }}
          >
            <Save size={16} /> Save changes
          </button>
          {saved && (
            <span className="saved">
              <CheckCircle2 size={15} /> Changes saved
            </span>
          )}
        </div>
        <div className="module-panel">
          <h3>Notifications</h3>
          {[
            "Placement drives",
            "Assignment deadlines",
            "Class reminders",
            "Grade updates",
          ].map((item) => (
            <label className="switch-row" key={item}>
              {item}
              <input type="checkbox" defaultChecked />
              <i />
            </label>
          ))}
          <h3 className="support-title">Need support?</h3>
          <button
            className="support-btn"
            onClick={() => notify("Support request opened")}
          >
            <Mail size={16} /> Contact student support
          </button>
        </div>
      </div>
    </div>
  );
}

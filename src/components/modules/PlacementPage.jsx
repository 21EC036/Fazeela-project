import React, { useState } from "react";
import {
  ArrowLeft,
  BriefcaseBusiness,
  ExternalLink,
  X,
} from "lucide-react/dist/esm/lucide-react.mjs";
import { PageHead } from "./ModuleShared.jsx";
import { placementCompanies } from "./moduleData.js";

function ApplicationModal({ company, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const submit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };
  return (
    <div className="application-modal-backdrop" onClick={onClose}>
      <section
        className="application-modal"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="application-modal-head">
          <div>
            <h2>View application details</h2>
            <p>{company.name} · Campus placement drive</p>
          </div>
          <button
            className="drawer-close"
            onClick={onClose}
            aria-label="Close application details"
          >
            <X size={17} />
          </button>
        </div>
        {submitted ? (
          <>
            <h3>Application interest recorded</h3>
            <p className="application-modal-copy">
              Your placement cell will share the assessment link and interview
              schedule through notifications.
            </p>
            <div className="application-modal-actions">
              <button className="primary-btn" onClick={onClose}>
                Done
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={submit}>
            <h3>Drive information</h3>
            <ul>
              <li>Role: {company.roles}</li>
              <li>Package: {company.package}</li>
              <li>Eligibility: B.Tech CSE students with no active backlogs</li>
              <li>
                Selection: Online assessment, technical interview, and HR
                discussion
              </li>
            </ul>
            <label>
              University email
              <input type="email" placeholder="you@university.edu" required />
            </label>
            <div className="application-modal-actions">
              <button type="button" className="secondary-btn" onClick={onClose}>
                Close
              </button>
              <button type="submit" className="primary-btn">
                Register interest
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}

function CompanyDetails({ company, onBack }) {
  const [applicationOpen, setApplicationOpen] = useState(false);
  return (
    <>
      <div className="placement-detail">
        <button className="placement-back" onClick={onBack}>
          <ArrowLeft size={15} /> Back to placement
        </button>
        <div className="placement-hero">
          <div className={`company-logo ${company.tone}`}>{company.short}</div>
          <div>
            <h2>{company.name}</h2>
            <p>{company.sector} · Campus placement drive</p>
          </div>
        </div>
        <div className="placement-detail-grid">
          <div className="placement-detail-stat">
            <span>Expected package</span>
            <b>{company.package}</b>
          </div>
          <div className="placement-detail-stat">
            <span>Work location</span>
            <b>{company.location}</b>
          </div>
          <div className="placement-detail-stat">
            <span>Open roles</span>
            <b>{company.roles}</b>
          </div>
        </div>
        <div className="placement-detail-copy">
          <h3>About the company</h3>
          <p>{company.about}</p>
          <button
            className="primary-btn placement-apply"
            onClick={() => setApplicationOpen(true)}
          >
            <ExternalLink size={15} /> View application details
          </button>
        </div>
      </div>
      {applicationOpen && (
        <ApplicationModal
          company={company}
          onClose={() => setApplicationOpen(false)}
        />
      )}
    </>
  );
}

export default function PlacementPage() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  if (selectedCompany)
    return (
      <CompanyDetails
        company={selectedCompany}
        onBack={() => setSelectedCompany(null)}
      />
    );
  return (
    <div className="module">
      <PageHead
        title="Campus placement"
        text="Explore companies hiring from your graduating batch"
        action={
          <button className="secondary-btn">
            <BriefcaseBusiness size={16} /> Placement cell
          </button>
        }
      />
      <div className="placement-list">
        {placementCompanies.map((company) => (
          <article className="placement-card" key={company.name}>
            <div className="placement-card-top">
              <div className={`company-logo ${company.tone}`}>
                {company.short}
              </div>
              <div>
                <h3>{company.name}</h3>
                <p>{company.sector}</p>
              </div>
            </div>
            <div className="placement-card-meta">
              <span>
                Package<b>{company.package}</b>
              </span>
              <span>
                Location<b>{company.location}</b>
              </span>
            </div>
            <button onClick={() => setSelectedCompany(company)}>
              View company details <ExternalLink size={14} />
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

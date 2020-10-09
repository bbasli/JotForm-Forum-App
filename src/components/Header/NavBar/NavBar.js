import React from "react";

import "./NavBar.css";

const navBar = (props) => (
  <div className="NavBar">
    <div className="dropdown">
      <button className="dropbtn">My Forms</button>
      <div className="dropdown-content"></div>
    </div>
    <div className="dropdown">
      <button className="dropbtn">
        Templates&nbsp;<i className="fa fa-caret-down"></i>
      </button>
      <div className="dropdown-content">
        <a
          href="https://www.jotform.com/form-templates/?classic"
          target="blank"
        >
          Form Templates
        </a>
        <a href="https://www.jotform.com/form-templates/?cards" target="blank">
          Card Templates
        </a>
        <a href="https://www.jotform.com/pdf-templates/" target="blank">
          PDF Templates
        </a>
      </div>
    </div>
    <div className="dropdown">
      <button className="dropbtn">
        Themes&nbsp;<i className="fa fa-caret-down"></i>
      </button>
      <div className="dropdown-content">
        <a href="https://www.jotform.com/theme-store/">Form Themes</a>
        <a href="/questions">Card Form Themes</a>
      </div>
    </div>
    <div className="dropdown">
      <button className="dropbtn">
        Features&nbsp;<i className="fa fa-caret-down"></i>
      </button>
      <div className="dropdown-content">
        <a href="https://www.jotform.com/enterprise/">Jotfrom Enterprise</a>
        <a href="https://www.jotform.com/hipaa/">HIPAA Forms</a>
        <a href="https://www.jotform.com/products/smart-pdf-forms/">
          Smart PDF Forms
        </a>
        <a href="https://www.jotform.com/products/report-builder/">
          Report Builder
        </a>
        <a href="https://www.jotform.com/features/assign-forms/">
          Assign Forms
        </a>
        <a href="https://www.jotform.com/products/mobile-forms/">
          Mobile Forms
        </a>
        <a href="https://www.jotform.com/products/pdf-editor/">PDF Editor</a>
        <a href="https://www.jotform.com/online-payments/">Online Payments</a>
        <a href="https://www.jotform.com/security/">Secure Forms</a>
        <a href="https://www.jotform.com/apps/">Apps & Integrations</a>
        <a href="https://www.jotform.com/widgets/">Form Widgets</a>
      </div>
    </div>
    <div className="dropdown">
      <button className="dropbtn">
        Support&nbsp;<i className="fa fa-caret-down"></i>
      </button>
      <div className="dropdown-content">
        <a href="/new-question">Contact Us</a>
        <a href="https://www.jotform.com/faq/">FAQ</a>
        <a href="https://www.jotform.com/help/">User Guide</a>
        <a href="/questions">Forum</a>
        <a href="https://www.jotform.com/blog/">Blog</a>
        <a href="https://www.youtube.com/user/TheJotForm">Videos</a>
      </div>
    </div>
    <div className="dropdown">
      <button className="dropbtn">Pricing</button>
      <div className="dropdown-content"></div>
    </div>
    {props.children}
  </div>
);

export default navBar;

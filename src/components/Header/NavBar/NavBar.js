import React from "react";
/* import { Navbar, Nav, NavDropdown } from "react-bootstrap"; */

import "./NavBar.css";
/* import Logo from '../Logo/Logo'; */

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

/* const bootstrapNavbar = () => (
  <Navbar expand="lg">
    <Navbar.Brand href="#home">
      <Logo
        src="https://www.jotform.com/resources/assets/svg/jotform-logo-transparent.svg"
        alt="JF-Logo"
        url="https://www.jotform.com/"
        // eslint-disable-next-line
        style="Jf-logo"
      />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav>
        <Nav.Link href="#home">My Forms</Nav.Link>
        <NavDropdown title="Templates" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Form Templates</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Card Templates</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">PDF Templates</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Themes" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Form Themes</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Card Form Themes</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Features" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Jotform Enterprise</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">HIPAA Forms</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Smart PDF Forms</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Report Builder</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Assign Forms</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Mobile Forms</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">PDF Editor</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Online Payments</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Secure Forms</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Apps & Integrations</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Form Widgets</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Support" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Contact Us</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">FAQ</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">User Guide</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Forum</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Blog</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Videos</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="#home">Pricing</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
); */

export default navBar;

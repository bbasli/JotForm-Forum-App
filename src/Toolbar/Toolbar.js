import React from "react";
import { connect } from "react-redux";

import LoggedInDropdown from "../LoggedInDropdown/LoggedInDropdown";
import NotLoggedInDropdown from "../NotLoggedInDropdown/NotLoggedInDropdown";
import * as actions from "../store/actions/index";

const Toolbar = (props) => {
  const getAccountType = (accountTypeUrl) => {
    return accountTypeUrl.substring(accountTypeUrl.lastIndexOf("/") + 1);
  };
  let userDropdown = <NotLoggedInDropdown login={props.onAuth} />;
  let accountType = null;
  if (props.user !== null) {
    accountType = getAccountType(props.user.account_type);
    userDropdown = (
      <LoggedInDropdown
        user={props.user}
        logout={props.logout}
        accountType={accountType}
      />
    );
  }
  return (
    <div className="toolbar">
      <img
        src={
          "https://www.jotform.com/resources/assets/svg/jotform-logo-transparent.svg"
        }
        alt="logo"
        className="toolbar-logo"
      />
      <div className="toolbar-links">
        <div className="dropdown">
          <a
            href="https://www.jotform.com/myforms"
            target="blank"
            className="dropbtn"
          >
            My Forms
          </a>
          <div className="dropdown-content"></div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">
            Templates&nbsp;<i className="fa fa-caret-down"></i>
          </button>
          <div className="triangle"></div>
          <div className="dropdown-content">
            <a
              href="https://www.jotform.com/form-templates/?classic"
              target="blank"
            >
              Form Templates
            </a>
            <a
              href="https://www.jotform.com/form-templates/?cards"
              target="blank"
            >
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
          <div className="triangle"></div>
          <div className="dropdown-content">
            <a href="https://www.jotform.com/theme-store/" target="blank">
              Form Themes
            </a>
            <a
              href="https://www.jotform.com/build/203073712379051/cardthemes"
              target="blank"
            >
              Card Form Themes
            </a>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">
            Features&nbsp;<i className="fa fa-caret-down"></i>
          </button>
          <div className="triangle"></div>
          <div className="dropdown-content">
            <a href="https://www.jotform.com/enterprise/" target="blank">
              Jotfrom Enterprise
            </a>
            <a href="https://www.jotform.com/hipaa/" target="blank">
              HIPAA Forms
            </a>
            <a
              href="https://www.jotform.com/products/smart-pdf-forms/"
              target="blank"
            >
              Smart PDF Forms
            </a>
            <a
              href="https://www.jotform.com/products/report-builder/"
              target="blank"
            >
              Report Builder
            </a>
            <a
              href="https://www.jotform.com/features/assign-forms/"
              target="blank"
            >
              Assign Forms
            </a>
            <a
              href="https://www.jotform.com/products/mobile-forms/"
              target="blank"
            >
              Mobile Forms
            </a>
            <a
              href="https://www.jotform.com/products/pdf-editor/"
              target="blank"
            >
              PDF Editor
            </a>
            <a href="https://www.jotform.com/online-payments/" target="blank">
              Online Payments
            </a>
            <a href="https://www.jotform.com/security/" target="blank">
              Secure Forms
            </a>
            <a href="https://www.jotform.com/apps/" target="blank">
              Apps & Integrations
            </a>
            <a href="https://www.jotform.com/widgets/" target="blank">
              Form Widgets
            </a>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">
            Support&nbsp;<i className="fa fa-caret-down"></i>
          </button>
          <div className="triangle"></div>
          <div className="dropdown-content">
            <a href="/new-question" target="blank">
              Contact Us
            </a>
            <a href="https://www.jotform.com/faq/" target="blank">
              FAQ
            </a>
            <a href="https://www.jotform.com/help/" target="blank">
              User Guide
            </a>
            <a href="/questions" target="blank">
              Forum
            </a>
            <a href="https://www.jotform.com/blog/" target="blank">
              Blog
            </a>
            <a href="https://www.youtube.com/user/TheJotForm" target="blank">
              Videos
            </a>
          </div>
        </div>
        <div className="dropdown">
          <a href="https://www.jotform.com/pricing/" className="dropbtn">
            Pricing
          </a>
          <div className="dropdown-content"></div>
        </div>
        {userDropdown}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: () => dispatch(actions.auth()),
    logout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);

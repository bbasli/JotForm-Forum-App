import React from "react";
import { Link } from "react-router-dom";

const EditButton = (props) => (
  <div className="u-fs-2">
    <Link
      to={{
        pathname: "/new-question",
        aboutProps: {
          questionID: props.id,
          type: props.type,
        },
      }}
    >
      <i className="fas fa-edit"></i>
    </Link>
  </div>
);

export default EditButton;

import React, { useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import $ from "jquery";

import { storage } from "../Firebase/Firebase";

const HelperImage = (props) => {
  const [imageUrl, setImageUrl] = useState("");
  const zoomImage = useRef();

  $(zoomImage.current).on("click", function () {
    $("#Overlay")
      .addClass("open")
      .one("click", function () {
        $(this).removeClass("open");
      });
    $(".ZoomedImage").css({
      backgroundImage: `url(${zoomImage.current.src})`,
    });
  });

  if (props.ssUrl.length > 0)
    storage
      .ref("images")
      .child(props.ssUrl)
      .getDownloadURL()
      .then((url) => {
        setImageUrl(url);
      });

  if (props.ssUrl.length > 0) {
    if (imageUrl !== "")
      return (
        <div className="helper-image-box">
          <img
            src={imageUrl}
            alt="Screenshot"
            className="helper-image"
            ref={zoomImage}
          />
        </div>
      );
    else
      return (
        <div className="helper-image">
          <Spinner animation="border" variant="success" />
        </div>
      );
  } else return null;
};

HelperImage.defaultProps = {
  ssUrl: "",
};

export default HelperImage;

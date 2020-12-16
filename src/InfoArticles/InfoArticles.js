import React from "react";

import ForumInfo from "../ForumInfo/ForumInfo";
import PopularArticles from "../PopularArticles/PopularArticles";

const InfoArticles = () => {
  return (
    <div className="info-articles">
      <ForumInfo />
      <PopularArticles />
    </div>
  );
};

export default InfoArticles;

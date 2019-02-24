import React from "react";

const currentWhitelistStub = [
  {
    label:
      "Baby Shark Dance | Sing and Dance! | Animal Songs | PINKFONG Songs for Children",
    url: "https://www.youtube.com/watch?v=XqZsoesa55w"
  },
  {
    label: "Sesame Street: If You're Happy and You Know It | Elmo's Sing-Along",
    url: "https://www.youtube.com/watch?v=5015skRvqs8"
  },
  {
    label: "If You’re Happy and You Know It + More Baby Songs by Dave and Ava",
    url: "https://www.youtube.com/watch?v=WbUP2PO9gFI"
  }
];

const WhiteList = () => {
  return (
    <div className="page-header">
    <h1>Enjoy!</h1>
      <div className="page-header__container">
      {currentWhitelistStub.map(video => {
        return (
          <div className="whitelist__item" key={video.url}>
            <span>{video.label}</span>
            <span className="whitelist__url">
              <a href={video.url}>{video.url}</a>
            </span>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default WhiteList;

import React from "react";

export default function GetFileImg({ style, type }) {
  switch (type) {
    case "mp4":
      return (
        <img
          style={style}
          src="https://img.icons8.com/external-fauzidea-flat-fauzidea/256/external-mp4-file-file-extension-fauzidea-flat-fauzidea.png"
          alt="mp4"
        />
      );
    case "mp3":
      return (
        <img
          style={style}
          src="https://img.icons8.com/color/256/mp3.png"
          alt="mp3"
        />
      );
    case "pdf":
      return (
        <img
          style={style}
          src="https://img.icons8.com/?size=512&id=QTSqWGZ38xGz&format=png"
          alt="pdf"
        />
      );
    case "png":
      return (
        <img
          style={style}
          src="https://img.icons8.com/?size=512&id=ym99QVB6cC9x&format=png"
          alt="png"
        />
      );
    case "jpeg":
      return (
        <img
          style={style}
          src="https://img.icons8.com/?size=512&id=ym99QVB6cC9x&format=png"
          alt="jpeg"
        />
      );
    case "gif":
      return (
        <img
          style={style}
          src="https://img.icons8.com/?size=512&id=rZm43knldtiU&format=png"
          alt="gif"
        />
      );
    case "jpg":
      return (
        <img
          style={style}
          src="https://img.icons8.com/?size=512&id=ym99QVB6cC9x&format=png"
          alt="gif"
        />
      );
    default:
      return (
        <img
          style={style}
          src="https://img.icons8.com/fluency/256/file.png"
          alt="gif"
        />
      );
  }
}

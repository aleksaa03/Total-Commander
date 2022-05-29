import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const { copyFile } = window.require("fs");

export default function CenterWindow() {
  return (
    <div className="flex justify-center items-center flex-column">
      <abbr title="Copy" className="no-underline">
        <ContentCopyIcon
          className="cursor-pointer hover:text-sky-500 transition-all duration-100"
          onClick={() => {
            const copiedItem = JSON.parse(sessionStorage.getItem("copiedItem"));
            const rightWindowPath = sessionStorage.getItem("rightWindowPath");
            copyFile(
              copiedItem.pathDir + "\\" + copiedItem.name,
              rightWindowPath + "\\" + copiedItem.name,
              (err) => {
                if (err) throw err;
                console.log("Copied!");
              }
            );
          }}
        />
      </abbr>
    </div>
  );
}

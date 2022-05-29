import React, { useState, useId } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import Icon from "../Icon";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

const path = window.require("path");
const process = window.require("child_process");
const ws = window.require("windows-shortcuts");
const { copyFile } = window.require("fs");

export default function Item({ name, isDirectory, size, pathDir, addPathDir }) {
  const id = useId();
  const [contextMenuPosition, setContextMenuPosition] = useState({
    top: 0,
    left: 0,
  });
  const [contextMenuState, setContextMenuState] = useState(false);

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 B";

    const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    return (
      parseFloat(Math.round((bytes / Math.pow(1024, i)) * 10) / 10) +
      " " +
      sizes[i]
    );
  };

  const ContextMenu = ({ top, left }) => {
    const copiedItem = JSON.parse(sessionStorage.getItem("copiedItem"));

    return (
      <div
        className="fixed z-50 p-1 rounded max-w-[30%] bg-[#bcbcbc] context-menus"
        id="context-menu"
        style={{
          top: top,
          left: left,
        }}
      >
        <h1
          className="text-white text-md mb-1"
          onClick={() => {
            sessionStorage.setItem(
              "copiedItem",
              JSON.stringify({
                name: name,
                isDirectory: isDirectory,
                size: size,
                pathDir: pathDir,
              })
            );
          }}
        >
          <ContentCopyIcon /> Copy
        </h1>
        <h1
          className="text-white text-md"
          onClick={() => {
            copyFile(
              copiedItem.pathDir + "\\" + copiedItem.name,
              pathDir + "\\" + copiedItem.name,
              (err) => {
                if (err) throw err;
                console.log("Copied!");
              }
            );
            console.log(
              "FROM:",
              copiedItem.pathDir + "\\" + copiedItem.name,
              "TO:",
              pathDir + "\\" + copiedItem.name
            );
          }}
        >
          <ContentPasteIcon /> Paste
        </h1>
      </div>
    );
  };

  return (
    <div
      className="flex p-1 items-center w-full my-1 rounded hover:bg-[#f0f0f0] transition-all duration-100 select-none cursor-pointer items"
      id={id}
      onDoubleClick={() => {
        if (isDirectory) addPathDir(path.join(`${pathDir}/${name}`));

        if (path.extname(`${pathDir}/${name}`) === ".exe" && !isDirectory)
          process.execFile(`${pathDir}/${name}`);

        if (path.extname(`${pathDir}/${name}`) === ".lnk" && !isDirectory)
          ws.query(`${pathDir}/${name}`, (err, file) => {
            if (err) throw err;
            if (path.extname(file.target) === ".exe")
              process.execFile(file.target);
          });
      }}
      onClick={(e) => {
        const contextMenu = document.getElementById("context-menu");
        if (e.target.offsetParent !== contextMenu) {
          setContextMenuState(false);
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        const contextMenus = document.querySelectorAll(".context-menus");
        contextMenus.forEach((contextMenu) => {
          contextMenu.style.display = "none";
        });
        const { clientX: mouseX, clientY: mouseY } = e;
        setContextMenuPosition({
          top: mouseY,
          left: mouseX,
        });
        setContextMenuState(true);
      }}
    >
      {contextMenuState ? (
        <ContextMenu
          top={contextMenuPosition.top}
          left={contextMenuPosition.left}
        />
      ) : (
        ""
      )}
      {isDirectory ? (
        <FolderIcon className="text-yellow-500 mr-1" />
      ) : (
        <Icon ext={path.extname(name)} />
      )}
      <p className="overflow-hidden whitespace-nowrap text-ellipsis w-[70%] flex-grow text-sm">
        <abbr className="no-underline" title={name}>
          {name}
        </abbr>
      </p>
      <p className="text-sm mr-1">
        {!isDirectory ? formatBytes(size) : "<DIR>"}
      </p>
    </div>
  );
}

// clicks++;
//         if (clicks === 1) {
//           timer = setTimeout(() => {
//             addSelectedData({
//               name: name,
//               size: size,
//               isDirectory: isDirectory,
//               pathDir: pathDir,
//             });
//           }, 350);
//         } else {
//           clearTimeout(timer);
//           console.log("Double Click");
//           clicks = 0;
//         }

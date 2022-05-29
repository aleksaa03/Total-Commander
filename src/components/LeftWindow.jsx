import React, { useState, useEffect, useContext } from "react";
import Item from "./Item";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { DataContext } from "../DataContext";
import DiskDetails from "./DiskDetails";

const fs = window.require("fs");
const path = window.require("path");
const process = window.require("child_process");

export default function LeftData() {
  const [files, setFiles] = useState([]);
  const [pathDir, setPathDir] = useState("C:\\");
  const [mountPoint, setMountPoint] = useState("C:");
  const [counter, setCounter] = useState({});
  let dirsCounter = 0;
  let filesCounter = 0;

  const { ext, diskInfo, fileWindowHeight } = useContext(DataContext);

  useEffect(() => {
    GetFilesAndDirectories();
  }, [pathDir]);

  useEffect(() => {
    dirsCounter = 0;
    filesCounter = 0;
    files.map((file) => {
      if (file.isDirectory) dirsCounter++;
      else filesCounter++;
    });
    setCounter({
      files: filesCounter,
      dirs: dirsCounter,
    });
  }, [files]);

  function GetFilesAndDirectories() {
    setFiles([]);
    fs.readdir(`${pathDir}/`, (err, files) => {
      if (err) throw err;
      for (let i = 0; i < files.length; i++) {
        for (let j = 0; j < ext.length; j++) {
          if (files[i]?.toLowerCase().includes(ext[j]?.toLowerCase()))
            files.splice(i, 1);
        }
      }

      files.map((file) => {
        fs.stat(`${pathDir}/${file}`, (err, fileStats) => {
          if (err) throw err;
          setFiles((prevValue) => [
            ...prevValue,
            {
              name: file,
              filePath: `${pathDir}/${file}`,
              stats: fileStats,
              isDirectory: fileStats?.isDirectory(),
            },
          ]);
        });
      });
    });
  }

  return (
    <div className="max-w-[45%] w-full px-5 py-4">
      <div className="flex items-center mb-3">
        <select
          className="mr-5 cursor-pointer border-2 border-[#f0f0f0] outline-none"
          onChange={(e) => {
            setPathDir(`${e.target.value}\\`);
            setMountPoint(e.target.value);
          }}
        >
          {/* {dataContext.mountPoints.map((mountPoint, index) => (
            <option key={index} value={mountPoint}>
              {mountPoint}
            </option>
          ))} */}
          {diskInfo.map((disk, index) => (
            <option key={index} value={disk.mountPoint}>
              {disk.mountPoint}
            </option>
          ))}
        </select>
        <div className="flex justify-between items-center border-2 border-[#f0f0f0] w-full">
          <div className="flex items-center">
            <FolderOpenIcon className="text-yellow-500 mr-1" />
            <input
              type="text"
              disabled
              value={pathDir}
              className="w-full bg-white text-sm"
            />
          </div>
          <OpenInNewIcon
            className="text-gray-500 cursor-pointer py-1"
            onClick={() => process.exec(`explorer.exe ${pathDir}`)}
          />
        </div>
      </div>
      <DiskDetails mountPoint={mountPoint} diskInfo={diskInfo} />
      <div
        className="rounded border-2 border-[#f0f0f0] overflow-scroll overflow-x-hidden scrollbar-hide"
        style={{ height: fileWindowHeight }}
        onClick={() => {
          const contextMenus = document.querySelectorAll(".context-menus");
          contextMenus.forEach((contextMenu) => {
            contextMenu.style.display = "none";
          });
        }}
      >
        <div
          className="rounded p-1 m-1 hover:bg-[#f0f0f0] transition-all duration-100 select-none cursor-pointer"
          onClick={() => {
            sessionStorage.setItem("leftWindowPath", "");
            setPathDir(path.join(pathDir, ".."));
          }}
        >
          ../
        </div>
        {files.map((file, index) => (
          <Item
            key={index}
            name={file?.name}
            pathDir={pathDir}
            size={file?.stats?.size}
            isDirectory={file?.isDirectory}
            addPathDir={(path) => setPathDir(path)}
          />
        ))}
      </div>
      <h1 className="flex items-center mt-2">
        <InsertDriveFileIcon className="text-gray-500 mx-1" /> {counter.files}{" "}
        file(s) / <FolderIcon className="text-yellow-500 mx-1" /> {counter.dirs}{" "}
        dir(s)
      </h1>
    </div>
  );
}

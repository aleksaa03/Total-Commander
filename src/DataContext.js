import React, { useState, useEffect, createContext } from "react";

export const DataContext = createContext();
const { fsSize, diskLayout, blockDevices } =
  window.require("systeminformation");

export function DataProvider(props) {
  const [diskInfo, setDiskInfo] = useState([]);
  const [fileWindowHeight, setFileWindowHeight] = useState(
    window.innerHeight - 170
  );

  useEffect(() => {
    // blockDevices().then((data) => {
    //   data.forEach((data) =>
    //     setMountPoints((prevValue) => [...prevValue, data.mount])
    //   );
    // });
    fsSize().then((data) => {
      data.forEach((data) => {
        setDiskInfo((prevValue) => [
          ...prevValue,
          { mountPoint: data.mount, size: data.size, used: data.used },
        ]);
      });
    });
  }, []);

  window.onresize = () => setFileWindowHeight(window.innerHeight - 170);

  let ext = [
    ".log",
    ".tmp",
    ".sys",
    ".Bin",
    "pagefile.sys",
    ".000",
    ".001",
    ".002",
    ".ini",
    ".Msi",
    "DumpStack.log",
    "System Volume Information",
    "Documents and Settings",
  ];

  return (
    <DataContext.Provider
      value={{
        diskInfo: diskInfo,
        fileWindowHeight: fileWindowHeight,
        ext: ext,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}

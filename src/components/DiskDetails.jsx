import React, { useState, useEffect } from "react";
import CountUp from "react-countup";

export default function DiskDetails({ mountPoint, diskInfo }) {
  const [disk, setDisk] = useState({});
  const [sizePercentage, setSizePercentage] = useState(0);
  useEffect(() => {
    diskInfo.map((disk) => {
      if (disk.mountPoint === mountPoint) {
        setDisk(disk);
        setSizePercentage((disk.used / disk.size) * 100);
      }
    });
  }, [mountPoint, diskInfo]);

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

  return (
    <div className="flex justify-center items-center mb-3">
      <h1 className="mr-1 font-semibold text-sm">
        {disk.used ? formatBytes(disk.used) : ""}
      </h1>
      <div className="flex items-center rounded-md border-2 border-[#f0f0f0] h-5 w-[60%]">
        <div
          className="bg-green-500 h-4 rounded-md transition-all duration-500 flex justify-end items-center"
          style={{
            width: sizePercentage + "%",
          }}
        >
          <CountUp
            start={0}
            end={Math.floor(sizePercentage)}
            duration={0.6}
            suffix={" %"}
            className="text-xs text-white mr-1"
          />
        </div>
      </div>
      <h1 className="ml-1 font-semibold text-sm">
        {disk.size ? formatBytes(disk.size) : ""}
      </h1>
    </div>
  );
}

import { useState, useEffect } from "react";
import StorageIcon from "@mui/icons-material/Storage";

const { diskLayout } = window.require("systeminformation");

export default function DisksInfo() {
  const [data, setData] = useState([]);
  useEffect(() => {
    diskLayout().then((data) => setData(data));
  }, []);
  return (
    <div className="flex flex-col max-w-[50%] m-5">
      {data.map((data) => (
        <div className="rounded p-5 border-2 border-[#f0f0f0] my-5">
          <div className="flex items-center">
            <StorageIcon
              className="text-sky-500 mr-1"
              sx={{
                fontSize: 30,
              }}
            />
            <h1 className="text-3xl font-semibold">{data.vendor}</h1>
          </div>

          <h1 className="text-md flex flex-row items-center font-bold">
            Smart Status: <p className="ml-2">{data.smartStatus}</p>
          </h1>
          <h1 className="text-md flex flex-row items-center">
            <p className="font-bold mr-2">Name:</p>{" "}
            <p className="font-medium">{data.name}</p>
          </h1>
          <h1 className="text-md flex flex-row items-center whitespace-nowrap overflow-hidden text-ellipsis w-full">
            <p className="font-bold mr-2">Device:</p>{" "}
            <abbr title={data.device} className="no-underline">
              <p className="font-medium">{data.device}</p>
            </abbr>
          </h1>
          <h1 className="text-md flex flex-row items-center">
            <p className="font-bold mr-2">Firmware Revision:</p>{" "}
            <p className="font-medium">{data.firmwareRevision}</p>
          </h1>
          <h1 className="text-md flex flex-row items-center">
            <p className="font-bold mr-2">Interface Type:</p>{" "}
            <p className="font-medium">{data.interfaceType}</p>
          </h1>
          <h1 className="text-md flex flex-row items-center">
            <p className="font-bold mr-2">Size:</p>{" "}
            <p className="font-medium">{data.size} Bytes</p>
          </h1>
          <h1 className="text-md flex flex-row items-center">
            <p className="font-bold mr-2">Bytes per sector:</p>{" "}
            <p className="font-medium">{data.bytesPerSector}</p>
          </h1>
          <h1 className="text-md flex flex-row items-center">
            <p className="font-bold mr-2">Sectors per track:</p>{" "}
            <p className="font-medium">{data.sectorsPerTrack}</p>
          </h1>
          <h1 className="text-md flex flex-row items-center">
            <p className="font-bold mr-2">Total Cylinders:</p>{" "}
            <p className="font-medium">{data.totalCylinders}</p>
          </h1>
          <h1 className="text-md flex flex-row items-center">
            <p className="font-bold mr-2">Total Heads:</p>{" "}
            <p className="font-medium">{data.totalHeads}</p>
          </h1>
          <h1 className="text-md flex flex-row items-center">
            <p className="font-bold mr-2">Total Sectors:</p>{" "}
            <p className="font-medium">{data.totalSectors}</p>
          </h1>
          <h1 className="text-md flex flex-row items-center">
            <p className="font-bold mr-2">Total Tracks:</p>{" "}
            <p className="font-medium">{data.totalTracks}</p>
          </h1>
          <h1 className="text-md flex flex-row items-center">
            <p className="font-bold mr-2">Tracks per cylinder:</p>{" "}
            <p className="font-medium">{data.tracksPerCylinder}</p>
          </h1>
        </div>
      ))}
    </div>
  );
}

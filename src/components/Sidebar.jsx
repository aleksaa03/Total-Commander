import DataUsageIcon from "@mui/icons-material/DataUsage";
import StorageIcon from "@mui/icons-material/Storage";

const os = window.require("os");

export default function Sidebar() {
  return (
    <div
      className="fixed bg-[#f0f0f0] w-52 flex flex-col max-w-[13rem]"
      style={{
        height: window.innerHeight,
      }}
    >
      <div className="py-[50%] flex justify-center items-center w-full hover:bg-sky-500 hover:text-white transition-all cursor-pointer">
        <DataUsageIcon />
      </div>
      <div className="py-[50%] flex justify-center items-center w-full hover:bg-sky-500 hover:text-white transition-all cursor-pointer">
        <StorageIcon />
      </div>
      <h1 className="text-xs py-5 px-2 cursor-default">
        Hostname: {os.hostname()} <br /> OS: {os.version()} {os.arch()}{" "}
        {os.release()} <br /> Platform: {os.platform()}
      </h1>
    </div>
  );
}

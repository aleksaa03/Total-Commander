import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import MinimizeIcon from "@mui/icons-material/Minimize";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import InfoIcon from "@mui/icons-material/Info";
import MenuIcon from "@mui/icons-material/Menu";

const { app, BrowserWindow, dialog } = window.require("@electron/remote");

export default function Frame({ addSidebarState }) {
  const [sidebarState, setSidebarState] = useState(false);
  return (
    <div className="bg-[#f0f0f0] frame flex justify-between items-center border-b-2">
      <div>
        <MenuIcon
          className="hover:bg-black/10 cursor-pointer frame-icon p-1.5"
          onClick={() => {
            sidebarState ? setSidebarState(false) : setSidebarState(true);
            addSidebarState(sidebarState);
          }}
          sx={{ height: 30, width: 30 }}
        />
        <RestartAltIcon
          className="hover:bg-black/10 cursor-pointer frame-icon p-1.5"
          onClick={() => {
            app.relaunch();
            app.quit();
          }}
          sx={{ height: 30, width: 30 }}
        />
        <InfoIcon
          className="hover:bg-black/10 cursor-pointer frame-icon p-1.5"
          onClick={() => {
            dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
              message: "Total Commander v1.0.0",
              type: "info",
              title: "Info",
              detail:
                "Software is in development process. Developed by Aleksa Radonjic.",
            });
          }}
          sx={{ height: 30, width: 30 }}
        />
      </div>
      <h1 className="absolute left-[50%] translate-x-[-50%]">
        Total Commander
      </h1>
      <div>
        <MinimizeIcon
          className="hover:bg-black/10 cursor-pointer frame-icon p-1.5"
          onClick={() => BrowserWindow.getFocusedWindow().minimize()}
          sx={{ height: 30, width: 30 }}
        />
        <CropSquareIcon
          className="hover:bg-black/10 cursor-pointer frame-icon p-1.5"
          onClick={() =>
            BrowserWindow.getFocusedWindow().isMaximized()
              ? BrowserWindow.getFocusedWindow().unmaximize()
              : BrowserWindow.getFocusedWindow().maximize()
          }
          sx={{ height: 30, width: 30 }}
        />
        <CloseIcon
          className="hover:bg-red-500 hover:text-white cursor-pointer frame-icon p-1.5"
          onClick={() => app.quit()}
          sx={{ height: 30, width: 30 }}
        />
      </div>
    </div>
  );
}

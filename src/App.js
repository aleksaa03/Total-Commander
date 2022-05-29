import React, { useState } from "react";
import LeftWindow from "./components/LeftWindow";
import CenterWindow from "./components/CenterWindow";
import RightWindow from "./components/RightWindow";
import { DataProvider } from "./DataContext";
import Frame from "./components/Frame";
import Sidebar from "./components/Sidebar";

function App() {
  const [sidebarState, setSidebarState] = useState(false);
  return (
    <>
      <Frame addSidebarState={(state) => setSidebarState(state)} />
      <div className="flex justify-between">
        <DataProvider>
          {sidebarState ? <Sidebar /> : ""}
          <LeftWindow />
          <CenterWindow />
          <RightWindow />
        </DataProvider>
      </div>
    </>
  );
}

export default App;

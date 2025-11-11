import React from "react";
import Sidebar from "../components/Sidebar"
import useChatStore from "../store/useChatStore";
import EmptyChat from "../components/EmptyChat";
import Messages from "../components/Messages";
import Profile from "../components/Profile";

const Home = () => {
  const {selectedUser} = useChatStore()

  const renderContent = () => {
    if(!selectedUser) return <EmptyChat />
    if(selectedUser === "profile" ) return <Profile />
    return <Messages />
  }

  return (
    <div className="flex min-h-screen bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 rounded-xl flex flex-col mx-auto gap-6 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Home;

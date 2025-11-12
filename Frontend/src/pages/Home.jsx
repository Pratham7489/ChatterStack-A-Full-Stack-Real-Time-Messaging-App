import React from "react";
import Sidebar from "../components/Sidebar"
import useChatStore from "../store/useChatStore";
import EmptyChat from "../components/EmptyChat";
import Messages from "../components/Messages";
import Profile from "../components/Profile";

const Home = () => {
  const {selectedUser} = useChatStore()

  const renderContent = () => {

     //  If no user selected, show EmptyChat
    if (!selectedUser) {
      return <EmptyChat />;
    }

    // If user selected "profile", show Profile
    if (selectedUser === "profile") {
      return <Profile />;
    }

    // Otherwise, show chat messages
    return <Messages />;
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
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

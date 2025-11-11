import { useState } from "react";
import useChatStore from "../store/useChatStore";
import { X, Check } from "lucide-react";

const EditBar = ({ message, onCancel }) => {
  const { sendMessage } = useChatStore();
  const [text, setText] = useState(message.text);

  const handleSave = async () => {
    if (!text.trim()) return;

    const formData = new FormData();
    formData.append("text", text);
    formData.append("editMessageId", message._id); 

    await sendMessage(formData); // Backend must detect edit vs send
    onCancel();
  };

  return (
    <div className="p-3 bg-gray-800 border-t border-gray-700 flex items-center gap-3">
      <X
        onClick={onCancel}
        className="text-gray-300 cursor-pointer hover:text-red-400"
      />
      
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-full outline-none"
      />

      <button
        onClick={handleSave}
        className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-full text-white flex items-center gap-1"
      >
        <Check size={18} /> Save
      </button>
    </div>
  );
};

export default EditBar;

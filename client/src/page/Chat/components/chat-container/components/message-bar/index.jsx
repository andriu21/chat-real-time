import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import {  GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";

export const MessageBar = () => {
  const [message, setMessage] = useState("");
  const emojiRef = useRef();
  const [emojiPickerOpen,setEmojiPickerOpen] = useState(false);

  const handleAddEmoji = (emoji) =>{
    setMessage((msg)=> msg + emoji.emoji)
  }

  const handleMessage = async()=>{
    alert(message);
  }

  useEffect(()=>{
    const handleClickOutside =(e)=>{
        if(emojiRef.current && !emojiRef.current.contains(e.target)){
            setEmojiPickerOpen(false)
        }
    }
    document.addEventListener("mousedown",handleClickOutside);
    return()=>{
        document.removeEventListener("mousedown",handleClickOutside);
    }
  },[emojiRef])

  
  return (
    <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
        <input
         value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none text-wrap"
          placeholder="Enter Your Message"
        />
        <button  className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all '>
            <GrAttachment className="text-2xl"/>
        </button>
        <div className="realtive">
        <button  onClick={()=> setEmojiPickerOpen(true)} className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all '>
            <RiEmojiStickerLine className="text-2xl"/>
        </button>
        <div className="absolute bottom-16 right-0" ref={emojiRef}>
            <EmojiPicker theme="dark" open={emojiPickerOpen} onEmojiClick={handleAddEmoji} autoFocusSearch={false}/>
        </div>
        </div>
      </div>

      <button  onClick={handleMessage} className='bg-[#8417ff] hover:bg-[#741bda] focus:bg-[#741bda] rounded-xl flex items-center justify-center p-5 focus:border-none focus:outline-none focus:text-white duration-300 transition-all '>
            <IoSend className="text-2xl"/>
        </button>
    </div>
  );
};

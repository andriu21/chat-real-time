import { useAppStore } from "@/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Input } from "@/components/ui/input";

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  const saveChange = async () => {};

  useEffect(() => {}, []);
  return (
    <>
      <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10">
        <div className="flex flex-col gap-10 w-[80vw] md:w-max">
          <IoArrowBack className="text-4xl text-white" />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-full w-32 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="image profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(
                    selectedColor
                  )}`}
                >
                  {firstName
                    ? firstName.split("").shift()
                    : userInfo.email.split("").shift()}
                </div>
              )}
            </Avatar>
            {hovered && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 cursor-pointer rounded-full">
                {image ? (
                  <FaTrash className="text-white text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )}
              </div>
            )}
            {/* { <input type="text" /> } */}
          </div>
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <Input placeholder='Email' type='email' disbaled value={userInfo.email} className="rounded-lg p-6 bg-[#2c2e3b]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

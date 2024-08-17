import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FiEdit2 } from "react-icons/fi";
import { IoPowerSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export const ProfileInfo = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();

  const logout = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute bottom-0 h-16 w-full flex items-center justify-between px-10 bg-[#2a2b33]">
      <div className="flex justify-center items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <Avatar className="h-12 w-12  rounded-full ">
            {userInfo.image ? (
              <AvatarImage
                src={`${HOST}/${userInfo.image}`}
                alt="image profile"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <div
                className={`uppercase h-12 w-12  text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                  userInfo.color
                )}`}
              >
                {userInfo.firstName
                  ? userInfo.firstName.split("").shift()
                  : userInfo.email.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>
        <div className="">
          {userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : ``}
        </div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FiEdit2
                className="text-purple-500 text-xl font-medium"
                onClick={() => navigate(`/profile`)}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              Edit Profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IoPowerSharp
                className="text-red-500 text-2xl font-medium animate-pulse"
                onClick={() => logout()}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              Logout
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

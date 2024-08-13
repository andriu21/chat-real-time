import { useAppStore } from "@/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { colors, getColor } from "@/lib/utils";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { UPDATE_PROFILE_ROUTE } from "@/utils/constants";

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const { email, setEmail } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  useEffect(() => {
    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedColor(userInfo.color);
    }
  }, [userInfo]);

  const validateProfile = () => {
    if (!firstName) {
      toast.error("FirstName is required.");
      return false;
    }
    if (!lastName) {
      toast.error("LastName is required.");
      return false;
    }

    return true;
  };

  const saveChange = async () => {
    if (validateProfile()) {
      try {
        const response = await apiClient.post(
          UPDATE_PROFILE_ROUTE,
          { firstName, lastName, color: selectedColor },
          { withCredentials: true }
        );

        if (response.status === 200 && response.data) {
          setUserInfo({ ...response.data });
          toast.success("Profile update successfully!!!");
          navigate("/chat");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleNavigate = () => {
    if (userInfo.profileSetup) {
      navigate("/chat");
    } else {
      toast.error("Please setup profile.");
    }
  };

  return (
    <>
      <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10">
        <div className="flex flex-col gap-10 w-[80vw] md:w-max">
          <div onClick={handleNavigate} className="hover:cursor-pointer">
            <IoArrowBack className="text-4xl text-white" />
          </div>

          <div className="grid grid-cols-2">
            <div
              className="flex items-center justify-center h-full w-32 md:h-48 md:w-48 relative "
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full ">
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
                {hovered && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 cursor-pointer rounded-full">
                    {image ? (
                      <FaTrash className="text-white text-3xl cursor-pointer" />
                    ) : (
                      <FaPlus className="text-white text-3xl cursor-pointer" />
                    )}
                  </div>
                )}
              </Avatar>

              {/* { <input type="text" /> } */}
            </div>
            <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
              <div className="w-full">
                <Input
                  placeholder="Email"
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-lg p-6 bg-[#2c2e3b] border-none "
                />
              </div>
              <div className="w-full">
                <Input
                  placeholder="First Name"
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  className="rounded-lg p-6 bg-[#2c2e3b] border-none "
                />
              </div>
              <div className="w-full">
                <Input
                  placeholder="Last Name"
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  className="rounded-lg p-6 bg-[#2c2e3b] border-none "
                />
              </div>
              <div className="w-full flex gap-5">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${
                      selectedColor === index ? "outline outline-white/50 " : ""
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full">
            <Button
              className="h-16 w-full  bg-purple-700 hover:bg-purple-900 transition-all duration-300 "
              onClick={() => saveChange()}
            >
              Save Change
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

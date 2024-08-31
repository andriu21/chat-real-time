import Logo from "@/assets/logo1200.png";
import { ProfileInfo } from "./components/profile-info";
import { NewDm } from "./components/new-dm";
import { useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import {
  GET_DM_CONTACTS_ROUTES,
  GET_USER_CHANNELS_ROUTE,
} from "@/utils/constants";
import { useAppStore } from "@/store";
import { ContactList } from "@/components/ui/contact-list";
import { CreateChannel } from "./components/create-channel";
const LogoCodeChat = () => {
  return (
    <div className="flex justify-start items-center gap-2">
      <img src={Logo} alt="" className="w-16" />
      <span className="matemasie-regular text-2xl text-white">CodeChat</span>
    </div>
  );
};

const Title = ({ text }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
      {text}
    </h6>
  );
};

export const ContactContainer = () => {
  const {
    setDirectMessagesContacts,
    directMessagesContacts,
    channels,
    setChannels,
  } = useAppStore();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await apiClient.get(GET_DM_CONTACTS_ROUTES, {
          withCredentials: true,
        });

        if (response.data.contacts) {
          setDirectMessagesContacts(response.data.contacts);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getChannels = async () => {
      try {
        const response = await apiClient.get(GET_USER_CHANNELS_ROUTE, {
          withCredentials: true,
        });

        if (response.data.channels) {
          setChannels(response.data.channels);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
    getChannels();
  }, [setChannels, setDirectMessagesContacts]);

  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
      <div className="pt-3">
        <LogoCodeChat />
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text={"Direct Message"} />
          <NewDm />
        </div>
        <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
          <ContactList contacts={directMessagesContacts} />
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text={"Channels"} />
          <CreateChannel />
        </div>
        <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
          <ContactList contacts={channels} isChannel={true} />
        </div>
      </div>
      <ProfileInfo />
    </div>
  );
};

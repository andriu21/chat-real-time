import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import Lottie from "react-lottie";
import { animationDefaultOptions } from "@/lib/utils";

import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export const NewDm = () => {
  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const [searchedContact, setSearchedContact] = useState([]);

  const searchContacts = async (search) => {};
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 transition-all duration-300 cursor-pointer"
              onClick={() => setOpenNewContactModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            Select New Contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {/* component create new contact */}
      <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Please select a contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search a contact"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={(e) => searchContacts(e.target.value)}
            />
          </div>
          {searchedContact.length <= 0 && (
            <div className="flex-1 md:bg-[#1c1d25] md:flex mt-10 flex-col justify-center items-center duration-1000 transition-all">
              <Lottie
                isClickToPauseDisabled={true}
                height={100}
                width={100}
                options={animationDefaultOptions}
              />
              <div className="text-opacity-80 text-center text-white flex flex-col gap-5 items-center mt-5 lg:text-2xl text-xl transition-all duration-300">
                <h3 className="poppins-medium">
                  Hi<span className="text-purple-500">! </span>Search New
                  <span className="text-purple-500"> Contact. </span> 
                  
                </h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

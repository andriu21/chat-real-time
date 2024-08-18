import Logo from "@/assets/logo1200.png";
import { ProfileInfo } from "./components/profile-info";
import { NewDm } from "./components/new-dm";
const LogoCodeChat = () => {
  return (
    <div className="flex justify-start items-center gap-2">
      <img src={Logo} alt="" className="w-16" />
      <span className="matemasie-regular text-2xl text-white">CodeChat</span>
    </div>
  );
};


const Title = ({text})=>{
  return(
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
      {text}
    </h6>
  )
}

export const ContactContainer = () => {
  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
      <div className="pt-3">
        <LogoCodeChat />
      </div>
      <div className="my-5">
          <div className="flex items-center justify-between pr-10">
              < Title text={'Direct Message'}/>
              <NewDm />
          </div>
      </div>
      <div className="my-5">
          <div className="flex items-center justify-between pr-10">
              < Title text={'Channels'}/>
          </div>
      </div>
      <ProfileInfo />

    </div>
  );
};

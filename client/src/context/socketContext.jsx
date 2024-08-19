import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef();
  const { userInfo } = useAppStore();

  useEffect(() => {  
    // esto lo modifiscate tu elimina la funcion si no  sirve de anda
    const validationSocket = async () => {
      if (userInfo) {
        socket.current = await io(HOST, {
          withCredentials: true,
          query: { userId: userInfo.id },
        });
        socket.current.on("connect", () => {
          console.log("Connected to socket server");
        });

        return socket.current.disconnect();
      }
    };

    validationSocket()
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};

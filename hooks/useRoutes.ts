import { usePathname } from "next/navigation"
import useConversation from "./useConversation";
import { useMemo } from "react";
import {HiArrowLeft, HiChat, HiUser} from "react-icons/hi"
import { signOut } from "next-auth/react";
const useRoutes = ()=>{
    const pathname = usePathname();
    const {conversationId} = useConversation();

    const routes = useMemo(()=>[
     
            {
                label: "Chat",
                href: "/conversations",
                icon: HiChat,
                active: pathname === "/conversations",
            },
            {
                label: "Users",
                href: "/user",
                icon: HiUser,
                active: pathname === "/user",
            },
            {
                label: "Conversation",
                href: `/conversation/${conversationId}`,
                active: pathname === `/conversation/${conversationId}`,
            },
            {
                label: "Logout",
                href: "#",
                icon: HiArrowLeft,
                onClick: ()=> signOut()
            }
  
    ], [pathname, conversationId])
    return routes;
}
export default useRoutes;
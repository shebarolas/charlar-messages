"use client"

import useRoutes from "@/hooks/useRoutes"
import { useState } from "react";

export default function DesktopSiderBar() {
    const routes = useRoutes();
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
       <div className="h-[10px] w-[10000rem] bg-red-950">
        <h1 className="h-[10000rem] w-[1000rem]">asdasda</h1>
       </div>

    )
}

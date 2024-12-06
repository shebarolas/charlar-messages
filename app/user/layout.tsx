import SideBar from "@/common/SideBar";

export default function Userlayout({ children }: { children: React.ReactNode }) {
    return (
            <div className="h-full flex flex-row w-screen">
                <div className="w-1/4">
                    <SideBar/>
                </div>
                {children}
            </div>

    )
}

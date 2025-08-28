import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { Child } from "../../types/Child"
import Tooltip from "../common/Tooltip";

type ChildDashboardHeaderProps = {
    child: Child
}

function ChildDashboardHeader({ child }: ChildDashboardHeaderProps) {

    const handleLogout = () => {
        sessionStorage.removeItem('childToken');
        localStorage.removeItem('loggedInChild');
        window.location.href = '/';
    };

    return (
        <div className="w-full bg-white shadow-lg p-2 px-[30px] grid grid-cols-3 items-center absolute top-20 left-20 right-20 bottom-20">
            <div className="text-xl font-bold text-gray-800">
                {child.name}'s Dashboard
            </div>
            <div className="flex justify-center">
                <img
                    src={`${import.meta.env.VITE_S3_URL}/logo.png`}
                    alt="MomSays Logo"
                    className="w-16 h-auto"
                />
            </div>
            <div className="flex justify-end">
                <button onClick={handleLogout} className="hover:text-red-600">
                    <Tooltip content={'Logout'}>
                        <FontAwesomeIcon icon="user-circle" className="w-8 h-auto" />
                    </Tooltip>
                </button>
            </div>
        </div>
    )
}

export default ChildDashboardHeader
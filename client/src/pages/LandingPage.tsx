import { useNavigate } from "react-router-dom";

function LandingPage() {
    const navigate = useNavigate();

    const handleParentLogin = () => {
        navigate("/parent-login");
    };

    const handleChildLogin = () => {
        navigate("/child-login");
    };

    return (
        <div
            className="w-screen h-screen bg-contain bg-center bg-no-repeat relative"
            style={{
                backgroundImage: `url('https://momsaysapp.s3.ap-south-1.amazonaws.com/landing_page.png')`, backgroundColor: '#9CE8F8'
            }}
        >
            <div className="absolute bottom-[12rem] left-1/2 transform -translate-x-1/2 flex flex-col gap-10">
                <button className="bg-pink-400 text-white sm:px-4 sm:py-1 px-6 py-2 rounded-xl text-xl shadow hover:bg-pink-500 transition" onClick={handleParentLogin}>
                    Parent Login
                </button>
                <button className="bg-green-400 text-white sm:px-4 sm:py-1 px-6 py-2 rounded-xl text-xl shadow hover:bg-green-500 transition" onClick={handleChildLogin}>
                    Child Login
                </button>
            </div>
        </div>
    );

}

export default LandingPage;
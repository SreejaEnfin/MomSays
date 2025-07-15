// import React from 'react'

import { useNavigate } from "react-router-dom";

// function LandingPage() {
//     return (
//         <div className="w-screen h-screen bg-sky-100 overflow-hidden relative">
//             {/* Logo in the center or top */}
//             <div className="absolute top-[10rem] left-1/2 transform -translate-x-1/2 z-10">
//                 <img
//                     src="https://momsaysapp.s3.ap-south-1.amazonaws.com/logo.png"
//                     alt="MomSays Logo"
//                     className="w-[100rem] sm:w-48"
//                 />
//             </div>

//             {/* Floating animated icons */}
//             <div className="relative w-screen h-screen bg-blue-100 overflow-hidden">
//                 {/* dinosaur */}
//                 <img src="https://momsaysapp.s3.ap-south-1.amazonaws.com/dinosaur.png" className="absolute left-10 top-10 w-44 animate-bounce-slow" />
//                 <img src="https://momsaysapp.s3.ap-south-1.amazonaws.com/dinosaur.png" className="absolute right-10 top-[36rem] w-36 animate-wiggle" />

//                 {/* book_stack */}
//                 <img src="https://momsaysapp.s3.ap-south-1.amazonaws.com/book_stack.png" className="absolute right-40 top-10 w-28 animate-bounce-slow" />
//                 <img src="https://momsaysapp.s3.ap-south-1.amazonaws.com/book_stack.png" className="absolute left-[4rem] top-[15rem] w-36 animate-wiggle" />

//                 {/* book_with_star */}
//                 <img src="https://momsaysapp.s3.ap-south-1.amazonaws.com/book_with_star.png" className="absolute left-[24rem] top-[8rem] w-32 animate-wiggle" />
//                 <img src="https://momsaysapp.s3.ap-south-1.amazonaws.com/book_with_star.png" className="absolute right-[25rem] top-[40rem] w-40 animate-bounce-slow" />


//                 {/* car */}
//                 <img src="https://momsaysapp.s3.ap-south-1.amazonaws.com/car.png" className="absolute right-40 top-40 w-30 animate-wiggle" />
//                 <img src="https://momsaysapp.s3.ap-south-1.amazonaws.com/car.png" className="absolute left-32 top-[40rem] w-30 animate-bounce-slow" />

//                 {/* chalk-board */}
//                 <img src="https://momsaysapp.s3.ap-south-1.amazonaws.com/chalk_board.png" className="absolute left-80 top-80 w-24 animate-bounce-slow" />
//                 <img src="https://momsaysapp.s3.ap-south-1.amazonaws.com/chalk_board.png" className="absolute right-[25rem] top-[30rem] w-32 animate-wiggle" />


//                 {/* color_pallete */}
//                 <img src="https://momsaysapp.s3.ap-south-1.amazonaws.com/color_pallete.png" className="absolute right-40 top-[28rem] w-28 animate-wiggle" />
//                 <img src="https://momsaysapp.s3.ap-south-1.amazonaws.com/color_pallete.png" className="absolute left-[30rem] top-[28rem] w-36 animate-bounce-slow" />

//                 {/* flower_pot */}
//                 <img src="https://momsaysapp.s3.ap-south-1.amazonaws.com/flower_pot.png" className="absolute left-40 top-[28rem] w-20 animate-bounce-slow" />
//                 <img src="https://momsaysapp.s3.ap-south-1.amazonaws.com/flower_pot.png" className="absolute right-[38rem] top-[28rem] w-28 animate-bounce-slow" />


//                 {/* heart */}
//                 <img src="https://momsaysapp.s3.ap-south-1.amazonaws.com/heart.png" className="absolute right-10 top-80 w-20 animate-wiggle" />
//                 <img src="https://momsaysapp.s3.ap-south-1.amazonaws.com/heart.png" className="absolute left-[40rem] top-[5rem] w-28 animate-bounce-slow" />
//                 <img src="https://momsaysapp.s3.ap-south-1.amazonaws.com/heart.png" className="absolute right-[40rem] top-[5rem] w-28 animate-bounce-slow" />


//                 {/* Row 5 */}
//                 <img src="https://momsaysapp.s3.ap-south-1.amazonaws.com/lady_bug.png" className="absolute left-40 top-[36rem] w-20 animate-bounce-slow" />
//                 <img src="https://momsaysapp.s3.ap-south-1.amazonaws.com/paint_brush.png" className="absolute right-20 top-[28rem] w-20 animate-wiggle" />


//                 {/* Row 6 */}
//                 <img src="https://momsaysapp.s3.ap-south-1.amazonaws.com/pencil.png" className="absolute left-10 top-[32rem] w-16 animate-bounce-slow" />
//                 <img src="https://momsaysapp.s3.ap-south-1.amazonaws.com/pink_flower.png" className="absolute right-10 top-[32rem] w-16 animate-wiggle" />

//                 {/* star */}
//                 <img src="https://momsaysapp.s3.ap-south-1.amazonaws.com/star.png" className="absolute right-[49rem] top-[25rem] w-28 animate-wiggle" />
//                 {/* <img src="https://momsaysapp.s3.ap-south-1.amazonaws.com/star.png" className="absolute right-1/2 top-[36rem] w-24 animate-wiggle" /> */}
//             </div>

//             {/* Login Buttons */}
//             <div className="absolute bottom-[10rem] left-1/2 transform -translate-x-1/2 flex gap-10">
//                 <button className="bg-pink-400 text-white px-6 py-2 rounded-xl text-xl shadow hover:bg-pink-500 transition">
//                     Parent Login
//                 </button>
//                 <button className="bg-green-400 text-white px-6 py-2 rounded-xl text-xl shadow hover:bg-green-500 transition">
//                     Child Login
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default LandingPage



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
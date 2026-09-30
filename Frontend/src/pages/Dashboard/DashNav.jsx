// import React from "react";
// import { Bell , CircleQuestionMark  } from 'lucide-react';

// const DashNav = () => {
//   return (
//     <>
//       <header className="flex justify-between items-center w-full px-4 md:px-8 h-16 bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
//         <div className="md:hidden font-bold text-lg text-gray-900">
//           CanteenPro
//         </div>
//         <div className="hidden md:block text-xl font-bold text-blue-900">
//           Dashboard Overview
//         </div>
//         <div className="flex items-center gap-4">
//           <button className="text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer active:opacity-85">
//             <span className="material-symbols-outlined"><Bell /></span>
//           </button>
//           <button className="text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer active:opacity-85">
//             <span className="material-symbols-outlined"><CircleQuestionMark /></span>
//             {/* <Bell /> */}
//             {/* <CircleQuestionMark /> */}
            
//           </button>
//           <img
//             alt="Administrator Profile"
//             className="w-8 h-8 rounded-full object-cover border border-gray-300 ml-2"
//             data-alt="A small circular profile picture of a corporate administrator in a modern office, bright lighting, professional attire, subtle blue background."
//             src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnI829QwM6JZx8-ExDMSlBH-hG1wRsRcs3lRWt0Ujyv77RMDNv2mQjkVls29doFV0UwpGTpaaAz0W3XJBqqKTW_CgNovpc13OoasQC3abOt5gjrknXeSKVajSWRCKzW_JVzzzHblaTeItxtFYAW2p9VNyzVc9sGvYaKoMI0-RxvZVMuHzxQPdB2THvf8d2PJ4-s0GngafLETDoDOYfu3lLqV9TgBCclBn0_tuEgjHh-d7OJ-Qxu7Xxp5sBmEoEkEqkIqtgZ5Oh_Bo"
//           />
//         </div>
//       </header>
//     </>
//   );
// };

// export default DashNav;


import React from "react";
import { Bell, HelpCircle } from "lucide-react";

const DashNav = () => {
  return (
    <header className="flex justify-between items-center w-full px-4 md:px-8 h-16 bg-surface-container-lowest shadow-sm border-b border-outline-variant sticky top-0 z-40">
      {/* Mobile Title */}
      <div className="md:hidden font-bold text-lg text-primary">
        CanteenPro
      </div>

      {/* Desktop Page Title */}
      <div className="hidden md:block text-xl font-bold text-primary">
        Dashboard Overview
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="text-on-surface-variant hover:bg-surface-container-high p-2 rounded-full transition-colors cursor-pointer active:opacity-80"
        >
          <Bell size={20} />
        </button>

        <button
          type="button"
          aria-label="Help"
          className="text-on-surface-variant hover:bg-surface-container-high p-2 rounded-full transition-colors cursor-pointer active:opacity-80"
        >
          <HelpCircle size={20} />
        </button>

        <img
          alt="Administrator Profile"
          className="w-8 h-8 rounded-full object-cover border border-outline-variant ml-2"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnI829QwM6JZx8-ExDMSlBH-hG1wRsRcs3lRWt0Ujyv77RMDNv2mQjkVls29doFV0UwpGTpaaAz0W3XJBqqKTW_CgNovpc13OoasQC3abOt5gjrknXeSKVajSWRCKzW_JVzzzHblaTeItxtFYAW2p9VNyzVc9sGvYaKoMI0-RxvZVMuHzxQPdB2THvf8d2PJ4-s0GngafLETDoDOYfu3lLqV9TgBCclBn0_tuEgjHh-d7OJ-Qxu7Xxp5sBmEoEkEqkIqtgZ5Oh_Bo"
        />
      </div>
    </header>
  );
};

export default DashNav;

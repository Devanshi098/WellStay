// import { BsTwitter, BsInstagram, BsFacebook } from "react-icons/bs";
// import { FaSnapchatGhost } from "react-icons/fa";

// const Footer = () => {
//   const icons = [
//     <BsTwitter />,
//     <BsInstagram />,
//     <BsFacebook />,
//     <FaSnapchatGhost />,
//   ];
//   return (
//     <div className="bg-white border-t-2 shadow-md  shadow-gray-300 sticky bottom-0 h-20 w-full flex items-center justify-center gap-6">
//       {icons.map((icon) => (
//         <div className="text-[30px] text-gray-600 hover:text-black duration-100 ease-out ">
//           {icon}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Footer;


import { BsTwitter, BsInstagram, BsFacebook } from "react-icons/bs";
import { FaSnapchatGhost } from "react-icons/fa";

const Footer = () => {
  const socialMediaLinks = [
    { icon: <BsTwitter />, link: "https://twitter.com/example" },
    { icon: <BsInstagram />, link: "https://instagram.com/example" },
    { icon: <BsFacebook />, link: "https://facebook.com/example" },
    { icon: <FaSnapchatGhost />, link: "https://snapchat.com/add/example" },
  ];

  return (
  //   <div className="bg-white border-t-2 shadow-md  shadow-gray-300 sticky bottom-0 h-20 w-full flex items-center justify-center gap-6">
  //     {socialMediaLinks.map((socialMedia, index) => (
  //       <a
  //         key={index}
  //         href={socialMedia.link}
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         className="text-[30px] text-gray-600 hover:text-black duration-100 ease-out"
  //       >
  <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'white', borderTop: '2px solid #ccc', boxShadow: '0 -2px 6px rgba(0, 0, 0, 0.1)', padding: '10px 0', display: 'flex', justifyContent: 'center' }}>
  {socialMediaLinks.map((socialMedia, index) => (
    <a
      key={index}
      href={socialMedia.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{ fontSize: '30px', color: '#666', margin: '0 10px' }}
    >
          {socialMedia.icon}
        </a>
      ))}
    </div>
  );
};

export default Footer;

import { Link } from "react-router-dom";
import Logo from "../Logo";

const Footer = () => {
  return (
    <footer className="
        relative overflow-hidden 
        py-16 
        bg-gray-950 border-t border-gray-800 
        shadow-[0_-5px_20px_rgba(0,0,0,0.5)] 
        text-white
    ">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap -m-6">

          {/* Logo + Copyright (5/12 column) */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-start">
              <div className="mb-6 inline-flex items-center">
                <Link to="/">
                    <Logo width="130px" /> {/* Increased logo size for presence */}
                </Link>
              </div>
                
              <p className="text-base text-gray-400 font-light max-w-sm">
                A modern platform for building high-quality, reusable components with speed and efficiency.
              </p>

              <p className="text-sm text-gray-500 mt-8">
                © {new Date().getFullYear()} All Rights Reserved.  
                <span className="text-blue-500 font-bold"> DevUI</span>
              </p>
            </div>
          </div>

          {/* Footer Columns (Each 7/12 combined) */}
          <FooterColumn
            title="Company"
            links={["Features", "Pricing", "Affiliate Program", "Press Kit"]}
          />

          <FooterColumn
            title="Support"
            links={["Account", "Help Center", "Contact Us", "Customer Support"]}
          />

          <FooterColumn
            title="Legals"
            links={["Terms & Conditions", "Privacy Policy", "Licensing", "Cookie Settings"]}
          />
        </div>
      </div>

      {/* Bottom Accent Line (More vibrant and intentional) */}
      <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-blue-600 via-teal-400 to-indigo-600 shadow-xl shadow-blue-500/30" />
    </footer>
  );
};

const FooterColumn = ({ title, links }) => (
  <div className="w-full p-6 md:w-1/3 lg:w-7/12 lg:flex-1"> {/* Adjusted column width for better balance */}
    <div className="h-full">
      <h3 className="tracking-widest mb-6 text-sm font-bold uppercase text-gray-300"> {/* Increased font weight and tracking */}
        {title}
      </h3>
      <ul>
        {links.map((item) => (
          <li key={item} className="mb-3"> {/* Reduced margin for tighter spacing */}
            <Link
              to="/"
              className="
                text-base 
                text-gray-400 
                hover:text-blue-400 
                transition-all duration-200 
                hover:translate-x-1 
                inline-block
              " // Added transform on hover
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Footer;
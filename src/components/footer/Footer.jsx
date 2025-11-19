import { Link } from "react-router-dom";
import Logo from "../Logo";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden py-12 bg-gray-900 border-t border-gray-700">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap -m-6">

          {/* Logo + Copyright */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="110px" />
              </div>

              <p className="text-sm text-gray-400 mt-4">
                © {new Date().getFullYear()} All Rights Reserved.  
                <span className="text-blue-400 font-medium"> DevUI</span>
              </p>
            </div>
          </div>

          {/* Company Section */}
          <FooterColumn
            title="Company"
            links={["Features", "Pricing", "Affiliate Program", "Press Kit"]}
          />

          {/* Support Section */}
          <FooterColumn
            title="Support"
            links={["Account", "Help", "Contact Us", "Customer Support"]}
          />

          {/* Legal Section */}
          <FooterColumn
            title="Legals"
            links={["Terms & Conditions", "Privacy Policy", "Licensing"]}
          />
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 opacity-20" />
    </footer>
  );
};

const FooterColumn = ({ title, links }) => (
  <div className="w-full p-6 md:w-1/2 lg:w-2/12">
    <div className="h-full">
      <h3 className="tracking-wide mb-6 text-sm font-semibold uppercase text-gray-400">
        {title}
      </h3>
      <ul>
        {links.map((item) => (
          <li key={item} className="mb-4">
            <Link
              to="/"
              className="text-base text-gray-300 hover:text-white transition-colors duration-200"
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

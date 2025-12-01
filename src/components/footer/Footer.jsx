
import Logo from '../Logo';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Linkedin, Github } from 'lucide-react';

// Placeholder Logo component (replace with your actual import)

const Footer = () => {
  return (
    <section className=" py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Main Card Container */}
      <div className="mx-auto max-w-7xl bg-white/10 rounded-[2.5rem] px-8 py-12 shadow-sm border border-gray-100 lg:px-16 lg:py-16">
         


        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-20">
          
          {/* Left Side: Brand & Socials */}
          <div className="w-full lg:w-1/3 flex flex-col justify-between">
            <div>
              <Logo width="140px" />
              <p className="mt-6 text-sm leading-relaxed text-gray-500 max-w-sm">
                MegaBlog empowers teams to transform raw data into clear, compelling visuals — making insights easier to share, understand, and act on.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-8">
              <SocialLink href="#" icon={<Twitter size={20} />} />
              <SocialLink href="#" icon={<Instagram size={20} />} />
              <SocialLink href="#" icon={<Linkedin size={20} />} />
              <SocialLink href="#" icon={<Github size={20} />} />
            </div>
          </div>

          {/* Right Side: Links Grid */}
          <div className="w-full lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
            <FooterColumn
              title="Product"
              links={["Features", "Pricing", "Integrations", "Changelog"]}
            />
            <FooterColumn
              title="Resources"
              links={["Documentation", "Tutorials", "Blog", "Support"]}
            />
            <FooterColumn
              title="Company"
              links={["About", "Careers", "Contact", "Partners"]}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-gray-100"></div>

        {/* Bottom Section: Copyright & Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} MegaBlog. All rights reserved.
          </p>

          <div className="flex gap-8">
            <LegalLink to="/privacy">Privacy Policy</LegalLink>
            <LegalLink to="/terms">Terms of Service</LegalLink>
            <LegalLink to="/cookies">Cookies Settings</LegalLink>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper Components for cleaner code

const FooterColumn = ({ title, links }) => (
  <div>
    <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link}>
          <Link
            to="#"
            className="text-gray-500 hover:text-gray-900 text-sm transition-colors duration-200"
          >
            {link}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const SocialLink = ({ href, icon }) => (
  <a
    href={href}
    className="text-gray-900 hover:text-gray-600 transition-colors duration-200"
    target="_blank"
    rel="noopener noreferrer"
  >
    {icon}
  </a>
);

const LegalLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-sm text-gray-500 hover:text-gray-900 underline-offset-4 hover:underline transition-all"
  >
    {children}
  </Link>
);

export default Footer;
import { Facebook, Twitter, Linkedin, Instagram, Mail, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-6 rounded-2xl">
      {/* Quick Links */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-1">
            <li><a href="#" className="hover:text-gray-400">Support</a></li>
            <li><a href="#" className="hover:text-gray-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-gray-400">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-gray-400">Help Center</a></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-400"><Facebook className="w-6 h-6" /></a>
          <a href="#" className="hover:text-gray-400"><Twitter className="w-6 h-6" /></a>
          <a href="#" className="hover:text-gray-400"><Linkedin className="w-6 h-6" /></a>
          <a href="#" className="hover:text-gray-400"><Instagram className="w-6 h-6" /></a>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 border-t border-gray-700 pt-4">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold">Subscribe to Our Newsletter</h3>
          <p className="text-sm text-gray-400">Get the latest updates and learning insights.</p>
        </div>
        <div className="flex mt-4 md:mt-0">
          <input type="email" placeholder="Enter your email" className="p-2 rounded-l-md text-black w-64" />
          <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r-md flex items-center">
            <Mail className="w-5 h-5 mr-1" /> Subscribe
          </button>
        </div>
      </div>

      {/* Call to Action (CTA) */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 border-t border-gray-700 pt-4">
        <button className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-md flex items-center text-white font-semibold">
          Continue Learning <ArrowRight className="w-5 h-5 ml-2" />
        </button>
        <button className="bg-purple-500 hover:bg-purple-600 px-6 py-2 rounded-md flex items-center text-white font-semibold mt-4 md:mt-0">
          Join the Community
        </button>
      </div>

      {/* Copyright */}
      <p className="text-center text-sm text-gray-400 mt-6">© 2025 Learno. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

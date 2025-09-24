import {
  TwitterIcon,
  GithubIcon,
  Mail,
  InstagramIcon,
  FacebookIcon,
} from "lucide-react";

export default function Footer({ darkMode }) {
  const iconClass = `w-7 h-7 hover:scale-125 transition-transform duration-300 ${
    darkMode
      ? "text-white hover:text-yellow-400"
      : "text-black hover:text-yellow-600"
  }`;

  return (
    <footer
      className={`text-center py-10 border-t shadow-[0_-3px_6px_rgba(0,0,0,0.4)] transition-colors duration-500
        ${darkMode
          ? "bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white border-yellow-600"
          : "bg-gradient-to-b from-yellow-200 via-yellow-100 to-yellow-200 text-black border-black"
        }`}
    >
      <h1 className="mb-6 text-xl sm:text-2xl font-semibold tracking-wide">
        Thank You For Shopping With Us!
      </h1>
      <h4
        className={`mb-4 text-base ${
          darkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        &copy; 2025 — CARS COLLECTION X VIRA NARULLITA
      </h4>
      <div className="flex flex-wrap justify-center gap-6">
        <FacebookIcon className={iconClass} />
        <InstagramIcon className={iconClass} />
        <TwitterIcon className={iconClass} />
        <Mail className={iconClass} />
        <GithubIcon className={iconClass} />
      </div>
    </footer>
  );
}

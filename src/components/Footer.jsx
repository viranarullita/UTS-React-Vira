import { TwitterIcon, GithubIcon, Mail, InstagramIcon, FacebookIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer>
      <h1>Thank You For Shopping With Us!</h1>
      <h4>&copy; 2025 — CARS COLLECTION X VIRA NARULLITA</h4>
      <hr />
      <div>
        <FacebookIcon />
        <InstagramIcon />
        <TwitterIcon />
        <Mail />
        <GithubIcon />
      </div>
    </footer>
  );
};

export default Footer;
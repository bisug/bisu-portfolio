import SocialIcons from "./SocialIcons";

function Footer() {
  return (
    <footer className="w-full px-5 sm:px-8 py-6 mt-20 border-t border-white/10 bg-bg">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
        <SocialIcons />
        <div className="text-center sm:text-right text-sm text-fun-gray">
          <a
            href="mailto:bisu.ghlan@gmail.com"
            className="inline-block py-1 hover:text-white transition-colors"
          >
            bisu.ghlan@gmail.com
          </a>
          <p className="text-xs pt-1">Based in Bhaktapur, Nepal</p>
        </div>
      </div>
      <div className="max-w-5xl w-full mx-auto mt-6 pt-3 flex items-center justify-center text-center border-t border-white/10">
        <p className="text-xs text-fun-gray">
          Made by{" "}
          <a
            href="mailto:bisu.ghlan@gmail.com"
            className="inline-block py-1 text-fun-gray-light font-medium"
          >
            Bisu Ghalan
          </a>
          {" — "}All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

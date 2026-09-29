import { COPYRIGHT_YEAR } from "@/data/global";

function Footer() {
  return (
    <footer className="w-full px-5 sm:px-8 pt-2 pb-6 mt-8">
      <p className="text-center text-xs text-fun-gray">
        Made by <strong className="text-white font-medium">Bisu Ghalan</strong> — © {COPYRIGHT_YEAR}
      </p>
    </footer>
  );
}

export default Footer;

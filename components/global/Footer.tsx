function Footer() {
  return (
    <footer className="w-full px-5 sm:px-8 pt-6 pb-8 mt-12 border-t border-white/5">
      <p className="text-center text-xs text-fun-gray tracking-wide">
        Made by <strong className="text-white font-medium">Bisu Ghalan</strong> · ©{" "}
        {new Date().getFullYear()}
      </p>
    </footer>
  );
}

export default Footer;

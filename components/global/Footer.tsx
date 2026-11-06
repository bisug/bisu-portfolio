function Footer() {
  return (
    <footer className="w-full px-5 sm:px-8 pt-6 pb-8 mt-12 border-t border-white/10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-center text-xs text-fun-gray tracking-wide">
          Made by{" "}
          <strong className="text-white font-medium">Bisu Ghalan</strong> · ©{" "}
          {new Date().getFullYear()}
        </p>
        <a
          href="#main-content"
          className="text-xs text-fun-gray hover:text-white transition-colors"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}

export default Footer;

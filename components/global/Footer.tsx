function Footer() {
  return (
    <footer className="page-shell mt-12 pt-6 pb-8 hairline-top">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-center text-xs text-faint tracking-wide">
          Made by <strong className="text-ink font-medium">Bisu Ghalan</strong>{" "}
          · © {new Date().getFullYear()}
        </p>
        <a
          href="#main-content"
          className="text-xs text-faint hover:text-ink transition-colors"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}

export default Footer;

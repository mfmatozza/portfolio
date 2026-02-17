export const Footer = () => {
  return (
    <footer id="contact" className="py-12 px-6 text-center">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">More Websites by Me</h3>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5">
            <a href="https://lineplanner.com" target="_blank" rel="dofollow" className="text-xs text-muted-foreground hover:text-primary transition-colors">LinePlanner</a>
            <a href="https://findthatlook.store" target="_blank" rel="dofollow" className="text-xs text-muted-foreground hover:text-primary transition-colors">FindThatLook</a>
            <a href="https://vinyl-vault.net" target="_blank" rel="dofollow" className="text-xs text-muted-foreground hover:text-primary transition-colors">Vinyl Vault</a>
            <a href="https://crazylaun.ch" target="_blank" rel="dofollow noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition-colors">CrazyLaunch</a>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          © 2026 Michele F. Matozza. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

import { Cart } from "./header-cart";
import { LanguageSelector } from "./header-language-selector";
import { Navigation } from "./header-navigation";
import { AccountSettings } from "./header-account";

export function Header() {
  return (
    <nav className="flex px-4 py-2 w-full top-0 left-0 right-0 z-50 shadow">
      <div className="md:min-w-6xl mx-auto flex justify-between items-center">
        <div>Icono</div>
        <div>
          <Navigation />
        </div>
        <div className="flex items-center space-x-10">
          <div>
            <Cart />
          </div>
          <div>
            <LanguageSelector />
          </div>
          <div>
            <AccountSettings />
          </div>
        </div>
      </div>
    </nav>
  );
}
import { Leaf, Code2, Info } from 'lucide-react';
import Settings from './Settings';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-9 h-9 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white text-lg tracking-tight">
              CO<span className="text-emerald-200">₂</span>rious
            </span>
          </a>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            <Settings />
            <a
              href="#about"
              className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
            >
              <span className="hidden sm:inline">About</span>
              <Info className="w-5 h-5 sm:hidden" />
            </a>
            <a
              href="https://github.com/SinghAbhishek04/co2rious"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
            >
              <span className="hidden sm:inline">GitHub</span>
              <Code2 className="w-5 h-5 sm:hidden" />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

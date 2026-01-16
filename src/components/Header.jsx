import { Leaf, Code2, Info } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-9 h-9 bg-green-600 rounded-lg group-hover:bg-green-700 transition-colors">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-slate-900 text-lg tracking-tight">
              CO<span className="text-green-600">₂</span>nvert
            </span>
          </a>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            <a
              href="#about"
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors duration-200"
            >
              <span className="hidden sm:inline">About</span>
              <Info className="w-5 h-5 sm:hidden" />
            </a>
            <a
              href="https://github.com/SinghAbhishek04/co2nvert"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors duration-200"
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

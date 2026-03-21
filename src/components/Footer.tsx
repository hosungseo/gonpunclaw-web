export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-bold text-gray-900">공픈클로</span>
          <span className="text-gray-300">|</span>
          <span className="text-xs text-gray-400 font-mono">v0.1.0</span>
        </div>
        <p className="text-xs text-gray-400 text-center">
          © 2026 서호성 · 행정안전부 조직국 · Built with OpenClaw + Claude
        </p>
      </div>
    </footer>
  );
}

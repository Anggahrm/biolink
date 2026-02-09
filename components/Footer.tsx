import { Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="text-center py-8 text-neo-text/60 text-sm">
      <a
        href="https://github.com/Anggahrm/biolink"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 hover:text-neo-primary transition-colors"
      >
        <Github className="w-4 h-4" />
        <span>Open Source on GitHub</span>
      </a>
    </footer>
  )
}

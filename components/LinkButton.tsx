import * as Icons from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface LinkButtonProps {
  title: string
  url: string
  icon: string
  color: string
  index: number
}

const iconMap: Record<string, LucideIcon> = {
  instagram: Icons.Instagram,
  twitter: Icons.Twitter,
  github: Icons.Github,
  linkedin: Icons.Linkedin,
  mail: Icons.Mail,
  globe: Icons.Globe,
  youtube: Icons.Youtube,
  tiktok: Icons.Music2,
  spotify: Icons.Music,
  dribbble: Icons.Dribbble,
  figma: Icons.Figma,
  link: Icons.Link,
  phone: Icons.Phone,
  map: Icons.MapPin,
  shop: Icons.ShoppingBag,
  book: Icons.BookOpen,
  code: Icons.Code,
  camera: Icons.Camera,
  heart: Icons.Heart,
  star: Icons.Star,
  zap: Icons.Zap,
  send: Icons.Send,
  message: Icons.MessageCircle,
  file: Icons.FileText,
  download: Icons.Download,
  external: Icons.ExternalLink,
}

export default function LinkButton({ title, url, icon, color, index }: LinkButtonProps) {
  const IconComponent = iconMap[icon.toLowerCase()] || Icons.Link
  const staggerClass = `stagger-${Math.min(index + 1, 6)}`
  
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`neo-link opacity-0 animate-stagger ${staggerClass}`}
      style={{ backgroundColor: color }}
    >
      <IconComponent className="w-6 h-6 text-white flex-shrink-0" />
      <span className="text-white">{title}</span>
    </a>
  )
}

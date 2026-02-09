import Image from 'next/image'

interface ProfileCardProps {
  name: string
  bio?: string | null
  avatarUrl?: string | null
}

export default function ProfileCard({ name, bio, avatarUrl }: ProfileCardProps) {
  return (
    <div className="flex flex-col items-center gap-4 animate-slide-up">
      <div className="relative">
        <div className="w-32 h-32 md:w-40 md:h-40 border-4 border-neo-border shadow-neo overflow-hidden bg-neo-primary transition-transform hover:scale-105">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={name}
              width={160}
              height={160}
              className="w-full h-full object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-neo-primary flex items-center justify-center">
              <span className="text-5xl font-display font-bold text-neo-border">
                {name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-neo-accent border-4 border-neo-border" />
      </div>
      
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-neo-text">
          {name}
        </h1>
        {bio && (
          <p className="text-lg text-neo-text/80 mt-2 max-w-md">
            {bio}
          </p>
        )}
      </div>
    </div>
  )
}

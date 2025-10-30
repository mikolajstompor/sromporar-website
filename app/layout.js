import './globals.css'

export const metadata = {
  title: 'Mikołaj Stompór — Art Is Life',
  description: 'Official website of Mikołaj Stompór - Artist, Painter, Musician',
  keywords: ['art', 'artist', 'painting', 'music', 'Mikołaj Stompór'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body className="min-h-screen font-inter">
        {children}
      </body>
    </html>
  )
}

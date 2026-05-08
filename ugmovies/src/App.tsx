import { useState } from 'react'
import { Play, Search, Star, Film, TrendingUp, Users } from 'lucide-react'

const featuredMovies = [
  {
    id: 1,
    title: "The Last Gorilla",
    year: 2025,
    rating: 4.8,
    genre: "Drama",
    poster: "https://images.unsplash.com/photo-1489599848839-66f2de5fd71f?w=300&h=450&fit=crop",
    description: "A gripping tale of conservation and courage in the Ugandan wilderness."
  },
  {
    id: 2,
    title: "Kampala Nights",
    year: 2024,
    rating: 4.5,
    genre: "Romance",
    poster: "https://images.unsplash.com/photo-1518770660479-435de28c6a5a?w=300&h=450&fit=crop",
    description: "Love blooms in the bustling streets of Uganda's capital."
  },
  {
    id: 3,
    title: "Queen of Katwe",
    year: 2016,
    rating: 4.9,
    genre: "Biography",
    poster: "https://images.unsplash.com/photo-1529139288-6a976eb927a3?w=300&h=450&fit=crop",
    description: "The inspiring true story of Phiona Mutesi, chess prodigy from Katwe."
  },
]

const categories = [
  { name: "Action", count: 45 },
  { name: "Drama", count: 78 },
  { name: "Comedy", count: 32 },
  { name: "Documentary", count: 23 },
  { name: "Romance", count: 28 },
]

export default function App() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0f0f0f]/90 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Film className="w-8 h-8 text-rose-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
              UgMovies
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/10 rounded-full border border-white/20 focus:border-rose-500 focus:outline-none text-sm w-64"
              />
            </div>
            <button className="px-4 py-2 bg-rose-600 hover:bg-rose-700 rounded-full text-sm font-medium transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1489599848839-66f2de5fd71f?w=1920&h=1080&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-xl">
            <span className="inline-block px-3 py-1 bg-rose-600 rounded-full text-sm font-medium mb-4">
              🎬 Ugandan Cinema
            </span>
            <h1 className="text-5xl font-bold mb-4 leading-tight">
              Discover the Best of Ugandan Cinema
            </h1>
            <p className="text-gray-300 text-lg mb-6">
              Stream authentic Ugandan movies, documentaries, and series. From Nollywood-inspired dramas to locally produced masterpieces.
            </p>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 rounded-lg font-medium transition-colors">
                <Play className="w-5 h-5" /> Start Watching
              </button>
              <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors border border-white/20">
                Browse Catalog
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-3 gap-8">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Film className="w-8 h-8 text-rose-500" />
            </div>
            <div className="text-3xl font-bold">200+</div>
            <div className="text-gray-400">Movies</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <TrendingUp className="w-8 h-8 text-rose-500" />
            </div>
            <div className="text-3xl font-bold">50K+</div>
            <div className="text-gray-400">Monthly Views</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Users className="w-8 h-8 text-rose-500" />
            </div>
            <div className="text-3xl font-bold">10K+</div>
            <div className="text-gray-400">Subscribers</div>
          </div>
        </div>
      </section>

      {/* Featured Movies */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" /> Featured Movies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredMovies.map((movie) => (
              <div 
                key={movie.id}
                className="group relative bg-[#1a1a1a] rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform"
              >
                <img 
                  src={movie.poster} 
                  alt={movie.title}
                  className="w-full h-[300px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-rose-600 rounded text-xs">{movie.genre}</span>
                      <span className="flex items-center gap-1 text-yellow-500 text-sm">
                        <Star className="w-4 h-4 fill-yellow-500" /> {movie.rating}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold">{movie.title}</h3>
                    <p className="text-gray-300 text-sm mt-1">{movie.description}</p>
                    <button className="mt-3 flex items-center gap-2 px-4 py-2 bg-rose-600 rounded-lg text-sm font-medium hover:bg-rose-700 transition-colors">
                      <Play className="w-4 h-4" /> Watch Now
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{movie.title}</h3>
                  <p className="text-gray-400 text-sm">{movie.year} • {movie.genre}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button 
                key={cat.name}
                className="px-4 py-2 bg-white/10 hover:bg-rose-600 rounded-full text-sm transition-colors border border-white/20"
              >
                {cat.name} <span className="text-gray-400">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f0f0f] border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Film className="w-6 h-6 text-rose-600" />
            <span className="text-xl font-bold">UgMovies</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2026 UgMovies. Celebrating Ugandan Cinema. Built by KAI Autonomous Intelligence.
          </p>
        </div>
      </footer>
    </div>
  )
}
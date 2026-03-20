export default function Header({ months, selected, onSelect }) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-stone-200 px-8 py-4 flex items-center justify-between gap-4 flex-wrap shadow-sm">
      <div className="font-black text-xl tracking-tight text-stone-800">
        rizz<span className="text-violet-500">$</span>budget
      </div>
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => onSelect('All')}
          className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
            selected === 'All'
              ? 'bg-violet-500 text-white shadow-sm'
              : 'text-stone-400 hover:text-stone-700 border border-stone-200'
          }`}
        >
          All
        </button>
        {months.map(m => (
          <button
            key={m}
            onClick={() => onSelect(m)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
              selected === m
                ? 'bg-violet-500 text-white shadow-sm'
                : 'text-stone-400 hover:text-stone-700 border border-stone-200'
            }`}
          >
            {m}
          </button>
        ))}
      </div>
    </header>
  )
}
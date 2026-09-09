import { useRef } from 'react'

function formatPeriod(period) {
  if (!period || period === 'All') return 'All'
  const [year, month] = period.split('-')
  const date = new Date(year, parseInt(month) - 1)
  return `${date.toLocaleString('default', { month: 'short' })} ${year}`
}

export default function Header({ periods, selected, onSelect, onImport, onExport, onClear }) {
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      onImport(file)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-stone-200 px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
      <div className="font-black text-xl tracking-tight text-stone-800 flex items-center gap-2">
        rizz<span className="text-violet-500">$</span>budget
      </div>
      
      <div className="flex gap-2 flex-wrap justify-center overflow-x-auto max-w-full pb-2 md:pb-0 scrollbar-hide">
        <button
          onClick={() => onSelect('All')}
          className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap ${
            selected === 'All'
              ? 'bg-violet-500 text-white shadow-sm'
              : 'text-stone-400 hover:text-stone-700 border border-stone-200 bg-white'
          }`}
        >
          All
        </button>
        {periods.map(p => (
          <button
            key={p}
            onClick={() => onSelect(p)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap ${
              selected === p
                ? 'bg-violet-500 text-white shadow-sm'
                : 'text-stone-400 hover:text-stone-700 border border-stone-200 bg-white'
            }`}
          >
            {formatPeriod(p)}
          </button>
        ))}
      </div>

      <div className="flex gap-2 items-center">
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept=".xlsx,.xls,.csv" 
          className="hidden" 
        />
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 border border-stone-200 hover:border-stone-300 rounded-lg transition-colors bg-white shadow-sm"
          title="Import Excel File"
        >
          ↓ Import
        </button>
        <button 
          onClick={onExport}
          className="px-3 py-1.5 text-xs font-bold text-violet-600 hover:text-violet-700 border border-violet-200 hover:border-violet-300 bg-violet-50 rounded-lg transition-colors shadow-sm"
          title="Export merged data as Excel"
        >
          ↑ Export Backup
        </button>
      </div>
    </header>
  )
}
import { useState } from 'react'
import { getColor } from '../utils/categories'

export default function TransactionList({ transactions, onDelete, onEditStart }) {
  const [catFilter, setCatFilter] = useState('All')

  const activeCats = ['All', ...new Set(transactions.map(t => t.category))]
  const filtered = catFilter === 'All'
    ? transactions
    : transactions.filter(t => t.category === catFilter)

  return (
    <div className="bg-white border border-stone-100 rounded-2xl p-5 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <p className="text-xs text-stone-400 uppercase tracking-widest">Transactions</p>
        <span className="text-xs font-mono text-stone-400">{filtered.length} entries</span>
      </div>
      
      <div className="flex gap-2 flex-wrap mb-4 pb-2 border-b border-stone-100">
        {activeCats.map(c => (
          <button key={c} onClick={() => setCatFilter(c)}
            className={`px-3 py-1 rounded-full text-xs font-mono border transition-all ${
              catFilter === c
                ? 'border-transparent text-white font-bold shadow-sm'
                : 'border-stone-200 text-stone-400 hover:text-stone-700 hover:border-stone-300 bg-stone-50'
            }`}
            style={catFilter === c ? { background: getColor(c) } : {}}
          >
            {c}
          </button>
        ))}
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2" style={{ maxHeight: '600px' }}>
        {filtered.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center py-12 text-stone-400">
            <span className="text-4xl mb-3 opacity-20">🛒</span>
            <p className="text-sm font-medium">No transactions found.</p>
            <p className="text-xs mt-1">Try changing the period or category filter.</p>
          </div>
        )}
        <div className="space-y-1">
          {filtered.map(t => (
            <div key={t.id}
              className="flex items-center gap-3 py-3 border-b border-stone-50 last:border-none hover:bg-stone-50 px-3 rounded-xl transition-colors group">
              <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: getColor(t.category) }} />
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-stone-700 truncate">{t.description}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-xs text-stone-400 font-mono">{t.date}</p>
                  <span className="w-1 h-1 rounded-full bg-stone-200"></span>
                  <p className="text-xs text-stone-500">{t.category}</p>
                  {t.source === 'manual' && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-stone-200"></span>
                      <span className="text-[10px] uppercase tracking-wider text-violet-400 font-bold bg-violet-50 px-1.5 py-0.5 rounded">Manual</span>
                    </>
                  )}
                </div>
              </div>
              
              <span className="text-sm font-bold text-stone-800 shrink-0 tabular-nums">
                ${t.amount.toFixed(2)}
              </span>
              
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 w-16 justify-end">
                {t.source === 'manual' && (
                  <>
                    <button
                      onClick={() => onEditStart(t)}
                      className="text-stone-400 hover:text-violet-500 transition-colors p-1"
                      title="Edit"
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => onDelete(t.id)}
                      className="text-stone-400 hover:text-rose-500 transition-colors p-1"
                      title="Delete"
                    >
                      ×
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
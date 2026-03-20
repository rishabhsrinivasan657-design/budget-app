import { useState } from 'react'
import { getColor } from '../utils/categories'

export default function TransactionList({ transactions, onDelete }) {
  const [catFilter, setCatFilter] = useState('All')

  const activeCats = ['All', ...new Set(transactions.map(t => t.category))]
  const filtered = catFilter === 'All'
    ? transactions
    : transactions.filter(t => t.category === catFilter)

  return (
    <div className="bg-white border border-stone-100 rounded-2xl p-5 shadow-sm">
      <p className="text-xs text-stone-400 uppercase tracking-widest mb-4">Transactions</p>
      <div className="flex gap-2 flex-wrap mb-4">
        {activeCats.map(c => (
          <button key={c} onClick={() => setCatFilter(c)}
            className={`px-3 py-1 rounded-full text-xs font-mono border transition-all ${
              catFilter === c
                ? 'border-transparent text-white font-bold shadow-sm'
                : 'border-stone-200 text-stone-400 hover:text-stone-700 hover:border-stone-300'
            }`}
            style={catFilter === c ? { background: getColor(c) } : {}}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="max-h-96 overflow-y-auto">
        {filtered.length === 0 && (
          <p className="text-stone-400 text-sm text-center py-8">No transactions found.</p>
        )}
        {filtered.map(t => (
          <div key={t.id}
            className="flex items-center gap-3 py-3 border-b border-stone-100 last:border-none hover:bg-stone-50 px-2 rounded-xl transition-colors group">
            <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: getColor(t.category) }} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-stone-700 truncate">{t.description}</p>
              <p className="text-xs text-stone-400">{t.date} · {t.category}
                {t.source === 'manual' && (
                  <span className="ml-2 text-violet-400">· manual</span>
                )}
              </p>
            </div>
            <span className="text-sm font-bold text-rose-500 shrink-0">-${t.amount.toFixed(2)}</span>
            {t.source === 'manual' && (
              <button
                onClick={() => onDelete(t.id)}
                className="opacity-0 group-hover:opacity-100 text-stone-300 hover:text-rose-400 transition-all text-xl leading-none shrink-0"
                title="Delete"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
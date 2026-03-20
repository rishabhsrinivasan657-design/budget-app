export default function KPICards({ transactions }) {
  const total = transactions.reduce((s, t) => s + t.amount, 0)
  const count = transactions.length

  const bycat = {}
  transactions.forEach(t => {
    bycat[t.category] = (bycat[t.category] || 0) + t.amount
  })
  const topCat = Object.entries(bycat).sort((a, b) => b[1] - a[1])[0]
  const avgTxn = count ? total / count : 0

  const cards = [
    { label: 'Total Spent',  value: `$${total.toFixed(2)}`,   sub: `${count} transactions`, accent: 'text-violet-600', bg: 'bg-violet-50',  border: 'border-violet-100' },
    { label: 'Top Category', value: topCat ? topCat[0] : '—', sub: topCat ? `$${topCat[1].toFixed(2)}` : '', accent: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-100' },
    { label: 'Transactions', value: count,                     sub: 'this period',           accent: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { label: 'Avg per Txn',  value: `$${avgTxn.toFixed(2)}`,  sub: 'average spend',         accent: 'text-amber-600',  bg: 'bg-amber-50',   border: 'border-amber-100' },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map(c => (
        <div key={c.label} className={`${c.bg} border ${c.border} rounded-2xl p-5`}>
          <p className="text-xs text-stone-400 uppercase tracking-widest mb-2">{c.label}</p>
          <p className={`text-2xl font-black ${c.accent}`}>{c.value}</p>
          <p className="text-xs text-stone-400 mt-1">{c.sub}</p>
        </div>
      ))}
    </div>
  )
}
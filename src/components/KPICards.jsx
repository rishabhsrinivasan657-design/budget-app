export default function KPICards({ transactions }) {
  const total = transactions.reduce((s, t) => s + t.amount, 0)
  const count = transactions.length

  const bycat = {}
  transactions.forEach(t => {
    bycat[t.category] = (bycat[t.category] || 0) + t.amount
  })
  
  const sortedCats = Object.entries(bycat).sort((a, b) => b[1] - a[1])
  const topCat = sortedCats.length > 0 ? sortedCats[0] : null
  const avgTxn = count ? total / count : 0

  const cards = [
    { 
      label: 'Total Spent',  
      value: `$${total.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,   
      sub: `${count} transactions`, 
      accent: 'text-violet-600', 
      bg: 'bg-violet-50',  
      border: 'border-violet-100',
      icon: '💸'
    },
    { 
      label: 'Top Category', 
      value: topCat ? topCat[0] : '—', 
      sub: topCat ? `$${topCat[1].toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} spent` : 'No data', 
      accent: 'text-rose-500', 
      bg: 'bg-rose-50', 
      border: 'border-rose-100',
      icon: '🔥'
    },
    { 
      label: 'Transactions', 
      value: count.toLocaleString(),                     
      sub: 'in this period',           
      accent: 'text-emerald-600', 
      bg: 'bg-emerald-50', 
      border: 'border-emerald-100',
      icon: '🧾'
    },
    { 
      label: 'Avg per Txn',  
      value: `$${avgTxn.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,  
      sub: 'average spend',         
      accent: 'text-amber-600',  
      bg: 'bg-amber-50',   
      border: 'border-amber-100',
      icon: '📊'
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map(c => (
        <div key={c.label} className={`${c.bg} border ${c.border} rounded-2xl p-5 relative overflow-hidden group hover:shadow-md transition-shadow`}>
          <div className="relative z-10">
            <p className="text-xs text-stone-500 uppercase tracking-widest mb-1.5 font-medium">{c.label}</p>
            <p className={`text-2xl font-black ${c.accent} tracking-tight`}>{c.value}</p>
            <p className="text-xs text-stone-400 mt-1.5 font-medium">{c.sub}</p>
          </div>
          <div className="absolute -bottom-4 -right-4 text-7xl opacity-[0.07] group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300">
            {c.icon}
          </div>
        </div>
      ))}
    </div>
  )
}
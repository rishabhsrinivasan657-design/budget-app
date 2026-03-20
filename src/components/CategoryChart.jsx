import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { getColor } from '../utils/categories'

export default function CategoryChart({ transactions }) {
  const bycat = {}
  transactions.forEach(t => {
    bycat[t.category] = (bycat[t.category] || 0) + t.amount
  })
  const data = Object.entries(bycat)
    .map(([name, value]) => ({ name, value: parseFloat(value.toFixed(2)) }))
    .sort((a, b) => b.value - a.value)

  const total = data.reduce((s, d) => s + d.value, 0)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
      {/* Bar chart */}
      <div className="bg-white border border-stone-100 rounded-2xl p-5 shadow-sm">
        <p className="text-xs text-stone-400 uppercase tracking-widest mb-4">Spending by Category</p>
        <div className="space-y-3">
          {data.map(d => (
            <div key={d.name} className="flex items-center gap-3">
              <span className="text-xs w-24 shrink-0 text-stone-600">{d.name}</span>
              <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${(d.value / total) * 100}%`, background: getColor(d.name) }}
                />
              </div>
              <span className="text-xs text-stone-500 w-16 text-right">${d.value.toFixed(0)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pie chart */}
      <div className="bg-white border border-stone-100 rounded-2xl p-5 shadow-sm">
        <p className="text-xs text-stone-400 uppercase tracking-widest mb-4">Breakdown</p>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%"
              innerRadius={55} outerRadius={90} paddingAngle={2}>
              {data.map(d => (
                <Cell key={d.name} fill={getColor(d.name)} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: '#fff', border: '1px solid #e7e5e4', borderRadius: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
              formatter={(v) => [`$${v.toFixed(2)}`, '']}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
          {data.slice(0, 6).map(d => (
            <div key={d.name} className="flex items-center gap-1.5 text-xs text-stone-500">
              <span className="w-2 h-2 rounded-sm inline-block" style={{ background: getColor(d.name) }} />
              {d.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const MONTH_ORDER = ['August','September','October','November','December','January','February','March']

export default function TrendChart({ transactions }) {
  const byMonth = {}
  transactions.forEach(t => {
    if (!t.month) return
    byMonth[t.month] = (byMonth[t.month] || 0) + t.amount
  })

  const data = MONTH_ORDER
    .filter(m => byMonth[m])
    .map(m => ({ month: m.slice(0, 3), total: parseFloat(byMonth[m].toFixed(2)) }))

  return (
    <div className="bg-white border border-stone-100 rounded-2xl p-5 mb-6 shadow-sm">
      <p className="text-xs text-stone-400 uppercase tracking-widest mb-4">Monthly Trend</p>
      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f4" />
          <XAxis dataKey="month" tick={{ fill: '#a8a29e', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#a8a29e', fontSize: 11 }} axisLine={false} tickLine={false}
            tickFormatter={v => `$${v}`} />
          <Tooltip
            contentStyle={{ background: '#fff', border: '1px solid #e7e5e4', borderRadius: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
            formatter={(v) => [`$${v.toFixed(2)}`, 'Spent']}
          />
          <Line type="monotone" dataKey="total" stroke="#7c3aed"
            strokeWidth={2.5} dot={{ fill: '#7c3aed', r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

function formatPeriodShort(period) {
  if (!period) return ''
  const [year, month] = period.split('-')
  const date = new Date(year, parseInt(month) - 1)
  return `${date.toLocaleString('default', { month: 'short' })} '${year.slice(2)}`
}

export default function TrendChart({ transactions }) {
  const byPeriod = {}
  
  transactions.forEach(t => {
    if (!t.period) return
    byPeriod[t.period] = (byPeriod[t.period] || 0) + t.amount
  })

  // Sort periods chronologically
  const sortedPeriods = Object.keys(byPeriod).sort((a, b) => a.localeCompare(b))

  const data = sortedPeriods.map(p => ({ 
    period: formatPeriodShort(p), 
    fullPeriod: p,
    total: parseFloat(byPeriod[p].toFixed(2)) 
  }))

  return (
    <div className="bg-white border border-stone-100 rounded-2xl p-5 mb-6 shadow-sm">
      <p className="text-xs text-stone-400 uppercase tracking-widest mb-4">Monthly Trend</p>
      
      {data.length === 0 ? (
        <div className="h-40 flex items-center justify-center text-stone-400 text-sm">
          No data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f4" vertical={false} />
            <XAxis 
              dataKey="period" 
              tick={{ fill: '#a8a29e', fontSize: 11 }} 
              axisLine={false} 
              tickLine={false} 
              dy={10}
            />
            <YAxis 
              tick={{ fill: '#a8a29e', fontSize: 11 }} 
              axisLine={false} 
              tickLine={false}
              tickFormatter={v => `$${v}`} 
            />
            <Tooltip
              contentStyle={{ background: '#fff', border: '1px solid #e7e5e4', borderRadius: 12, boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}
              formatter={(v) => [`$${v.toFixed(2)}`, 'Spent']}
              labelStyle={{ color: '#78716c', fontWeight: 'bold', marginBottom: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="total" 
              stroke="#8b5cf6"
              strokeWidth={3} 
              dot={{ fill: '#fff', stroke: '#8b5cf6', strokeWidth: 2, r: 4 }} 
              activeDot={{ r: 6, fill: '#8b5cf6', stroke: '#fff' }} 
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
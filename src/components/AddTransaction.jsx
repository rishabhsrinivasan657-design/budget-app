import { useState } from 'react'
import { CATEGORIES } from '../utils/categories'

const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December']

export default function AddTransaction({ onAdd }) {
  const today = new Date().toISOString().split('T')[0]
  const [form, setForm] = useState({ date: today, description: '', category: 'Groceries', amount: '' })
  const [saved, setSaved] = useState(false)

  function handle(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function submit(e) {
    e.preventDefault()
    if (!form.description || !form.amount) return
    const [, monthIdx] = form.date.split('-').map(Number)
    const month = MONTHS[monthIdx - 1]
    onAdd({ ...form, amount: parseFloat(form.amount), month })
    setForm({ date: today, description: '', category: 'Groceries', amount: '' })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const inputCls = "bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-800 font-mono outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all w-full"

  return (
    <div className="bg-white border border-stone-100 rounded-2xl p-5 mb-6 shadow-sm">
      <p className="text-xs text-stone-400 uppercase tracking-widest mb-4">Add Transaction</p>
      <form onSubmit={submit} className="grid grid-cols-2 md:grid-cols-5 gap-3 items-end">
        <div>
          <label className="text-xs text-stone-400 mb-1 block">Date</label>
          <input name="date" type="date" value={form.date} onChange={handle} className={inputCls} />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs text-stone-400 mb-1 block">Description</label>
          <input name="description" type="text" value={form.description} onChange={handle}
            placeholder="e.g. Lidl groceries" className={inputCls} />
        </div>
        <div>
          <label className="text-xs text-stone-400 mb-1 block">Category</label>
          <select name="category" value={form.category} onChange={handle} className={inputCls}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-stone-400 mb-1 block">Amount ($)</label>
          <div className="flex gap-2">
            <input name="amount" type="number" step="0.01" min="0" value={form.amount}
              onChange={handle} placeholder="0.00" className={inputCls} />
            <button type="submit"
              className="bg-violet-500 hover:bg-violet-400 text-white px-4 rounded-xl text-sm font-bold transition-colors shrink-0 shadow-sm">
              {saved ? '✓' : '+'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
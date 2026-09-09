import { useState, useEffect } from 'react'
import { CATEGORIES } from '../utils/categories'

export default function AddTransaction({ onAdd, onEdit, editingTxn, onCancelEdit }) {
  const today = new Date().toISOString().split('T')[0]
  
  const defaultForm = { date: today, description: '', category: 'Groceries', amount: '' }
  const [form, setForm] = useState(defaultForm)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (editingTxn) {
      setForm({
        date: editingTxn.date || today,
        description: editingTxn.description || '',
        category: editingTxn.category || 'Groceries',
        amount: editingTxn.amount || ''
      })
    } else {
      setForm(defaultForm)
    }
  }, [editingTxn, today])

  function handle(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function submit(e) {
    e.preventDefault()
    if (!form.description || !form.amount) return
    
    const payload = { ...form, amount: parseFloat(form.amount) }
    
    if (editingTxn) {
      onEdit(editingTxn.id, payload)
      onCancelEdit()
    } else {
      onAdd(payload)
    }
    
    setForm(defaultForm)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const inputCls = "bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-800 font-mono outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all w-full"

  return (
    <div className="bg-white border border-stone-100 rounded-2xl p-5 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <p className="text-xs text-stone-400 uppercase tracking-widest">
          {editingTxn ? 'Edit Transaction' : 'Add Transaction'}
        </p>
        {editingTxn && (
          <button 
            onClick={onCancelEdit}
            className="text-xs text-stone-400 hover:text-stone-700 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
      
      <form onSubmit={submit} className="flex flex-col gap-4">
        <div>
          <label className="text-xs text-stone-500 mb-1 block font-medium">Date</label>
          <input name="date" type="date" value={form.date} onChange={handle} className={inputCls} required />
        </div>
        
        <div>
          <label className="text-xs text-stone-500 mb-1 block font-medium">Description</label>
          <input name="description" type="text" value={form.description} onChange={handle}
            placeholder="e.g. Lidl groceries" className={inputCls} required />
        </div>
        
        <div>
          <label className="text-xs text-stone-500 mb-1 block font-medium">Category</label>
          <select name="category" value={form.category} onChange={handle} className={inputCls}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        
        <div>
          <label className="text-xs text-stone-500 mb-1 block font-medium">Amount ($)</label>
          <input name="amount" type="number" step="0.01" min="0" value={form.amount}
            onChange={handle} placeholder="0.00" className={inputCls} required />
        </div>
        
        <button type="submit"
          className="bg-violet-500 hover:bg-violet-600 text-white w-full py-3 rounded-xl text-sm font-bold transition-colors shadow-sm mt-2 flex items-center justify-center gap-2">
          {saved ? '✓ Saved' : (editingTxn ? 'Save Changes' : '+ Add Expense')}
        </button>
      </form>
    </div>
  )
}
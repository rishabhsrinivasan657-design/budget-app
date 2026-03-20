import { useState, useMemo } from 'react'
import { useTransactions } from './hooks/useTransactions'
import Header from './components/Header'
import KPICards from './components/KPICards'
import CategoryChart from './components/CategoryChart'
import TrendChart from './components/TrendChart'
import AddTransaction from './components/AddTransaction'
import TransactionList from './components/TransactionList'

const MONTH_ORDER = ['August','September','October','November','December','January','February','March','April','May','June','July']

export default function App() {
  const { transactions, loading, addTransaction, deleteTransaction } = useTransactions()
  const [selectedMonth, setSelectedMonth] = useState('All')

  const months = useMemo(() => {
    const seen = new Set(transactions.map(t => t.month).filter(Boolean))
    return MONTH_ORDER.filter(m => seen.has(m))
  }, [transactions])

  const filtered = useMemo(() => {
    if (selectedMonth === 'All') return transactions
    return transactions.filter(t => t.month === selectedMonth)
  }, [transactions, selectedMonth])

  if (loading) return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <p className="text-stone-400 font-mono text-sm animate-pulse">Loading your budget...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <Header months={months} selected={selectedMonth} onSelect={setSelectedMonth} />
      <main className="max-w-6xl mx-auto px-6 py-8">
        <KPICards transactions={filtered} />
        <TrendChart transactions={transactions} />
        <CategoryChart transactions={filtered} />
        <AddTransaction onAdd={addTransaction} />
        <TransactionList transactions={filtered} onDelete={deleteTransaction} />
      </main>
    </div>
  )
}
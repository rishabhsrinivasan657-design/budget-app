import { useState, useMemo } from 'react'
import { useTransactions } from './hooks/useTransactions'
import Header from './components/Header'
import KPICards from './components/KPICards'
import CategoryChart from './components/CategoryChart'
import TrendChart from './components/TrendChart'
import AddTransaction from './components/AddTransaction'
import TransactionList from './components/TransactionList'

export default function App() {
  const { 
    transactions, 
    loading, 
    addTransaction,
    editTransaction, 
    deleteTransaction,
    handleImport,
    handleExport,
    clearManualTransactions
  } = useTransactions()
  
  const [selectedPeriod, setSelectedPeriod] = useState('All')
  const [editingTxn, setEditingTxn] = useState(null)

  const periods = useMemo(() => {
    const seen = new Set(transactions.map(t => t.period).filter(Boolean))
    // Sort descending (newest first)
    return Array.from(seen).sort((a, b) => b.localeCompare(a))
  }, [transactions])

  const filtered = useMemo(() => {
    if (selectedPeriod === 'All') return transactions
    return transactions.filter(t => t.period === selectedPeriod)
  }, [transactions, selectedPeriod])

  if (loading) return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <p className="text-stone-400 font-mono text-sm animate-pulse">Loading your budget...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 pb-20">
      <Header 
        periods={periods} 
        selected={selectedPeriod} 
        onSelect={setSelectedPeriod}
        onImport={handleImport}
        onExport={handleExport}
        onClear={clearManualTransactions}
      />
      <main className="max-w-6xl mx-auto px-6 py-8">
        <KPICards transactions={filtered} />
        <TrendChart transactions={transactions} />
        <CategoryChart transactions={filtered} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <AddTransaction 
              onAdd={addTransaction} 
              onEdit={editTransaction}
              editingTxn={editingTxn}
              onCancelEdit={() => setEditingTxn(null)}
            />
          </div>
          <div className="lg:col-span-2">
            <TransactionList 
              transactions={filtered} 
              onDelete={deleteTransaction}
              onEditStart={setEditingTxn}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
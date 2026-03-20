import { useState, useEffect } from 'react'
import { loadTransactions } from '../utils/parseExcel'

const LS_KEY = 'budget_manual_txns'

export function useTransactions() {
  const [excelTxns, setExcelTxns] = useState([])
  const [manualTxns, setManualTxns] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_KEY)) || [] }
    catch { return [] }
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTransactions().then(data => {
      setExcelTxns(data)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(manualTxns))
  }, [manualTxns])

  const all = [...excelTxns, ...manualTxns].sort((a, b) =>
    new Date(b.date) - new Date(a.date)
  )

  function addTransaction(txn) {
    setManualTxns(prev => [{
      ...txn,
      id: `m-${Date.now()}`,
      source: 'manual',
    }, ...prev])
  }

  function deleteTransaction(id) {
    setManualTxns(prev => prev.filter(t => t.id !== id))
  }

  return { transactions: all, loading, addTransaction, deleteTransaction }
}
import { useState, useEffect } from 'react'
import { loadTransactions, exportToExcel } from '../utils/parseExcel'

const LS_KEY = 'budget_manual_txns'

function getPeriodFromDateString(dateStr) {
  if (!dateStr) return ''
  const parts = dateStr.split('-')
  if (parts.length >= 2) {
    return `${parts[0]}-${parts[1]}`
  }
  return ''
}

export function useTransactions() {
  const [excelTxns, setExcelTxns] = useState([])
  const [manualTxns, setManualTxns] = useState(() => {
    try { 
      const data = JSON.parse(localStorage.getItem(LS_KEY)) || [] 
      // Backward compatibility: ensure old manual transactions have period and month
      return data.map(t => {
        if (!t.period && t.date) {
          t.period = getPeriodFromDateString(t.date)
        }
        if (!t.month && t.date) {
          t.month = new Date(t.date).toLocaleString('default', { month: 'long', timeZone: 'UTC' })
        }
        return t
      })
    }
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
    const dateObj = new Date(txn.date)
    const month = dateObj.toLocaleString('default', { month: 'long', timeZone: 'UTC' })
    const period = getPeriodFromDateString(txn.date)
    
    setManualTxns(prev => [{
      ...txn,
      id: `m-${Date.now()}`,
      source: 'manual',
      month,
      period
    }, ...prev])
  }

  function editTransaction(id, updatedTxn) {
    const dateObj = new Date(updatedTxn.date)
    const month = dateObj.toLocaleString('default', { month: 'long', timeZone: 'UTC' })
    const period = getPeriodFromDateString(updatedTxn.date)
    
    setManualTxns(prev => prev.map(t => t.id === id ? {
      ...t,
      ...updatedTxn,
      month,
      period
    } : t))
  }

  function deleteTransaction(id) {
    setManualTxns(prev => prev.filter(t => t.id !== id))
  }

  function clearManualTransactions() {
    setManualTxns([])
  }

  async function handleImport(file) {
    setLoading(true)
    try {
      const data = await loadTransactions(file)
      setExcelTxns(data)
    } catch (e) {
      console.error("Failed to import file", e)
      alert("Failed to parse Excel file. Please ensure it's a valid XLSX.")
    } finally {
      setLoading(false)
    }
  }

  function handleExport() {
    exportToExcel(all)
  }

  return { 
    transactions: all, 
    loading, 
    addTransaction, 
    editTransaction,
    deleteTransaction,
    clearManualTransactions,
    handleImport,
    handleExport
  }
}
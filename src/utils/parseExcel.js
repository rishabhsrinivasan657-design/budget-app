import * as XLSX from 'xlsx'

// Helper to get YYYY-MM from a Date object or string
function getPeriodFromDateString(dateStr) {
  if (!dateStr) return ''
  const parts = dateStr.split('-')
  if (parts.length >= 2) {
    return `${parts[0]}-${parts[1]}`
  }
  return ''
}

export async function loadTransactions(fileOrUrl = '/Rishabh_Budget.xlsx') {
  let buf
  if (typeof fileOrUrl === 'string') {
    const res = await fetch(fileOrUrl)
    buf = await res.arrayBuffer()
  } else {
    buf = await fileOrUrl.arrayBuffer()
  }
  
  const wb = XLSX.read(new Uint8Array(buf), { type: 'array' })
  const sheetName = wb.SheetNames.includes('Transactions') ? 'Transactions' : wb.SheetNames[0]
  const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheetName])

  return rows
    .filter(r => r.Description && r.Amount && !isNaN(r.Amount))
    .map((r, i) => {
      let dateStr = ''
      if (typeof r.Date === 'number') {
        const d = XLSX.SSF.parse_date_code(r.Date)
        dateStr = `${d.y}-${String(d.m).padStart(2,'0')}-${String(d.d).padStart(2,'0')}`
      } else if (r.Date) {
        // Handle native JS Date objects or ISO strings
        const d = new Date(r.Date)
        if (!isNaN(d.getTime())) {
          dateStr = d.toISOString().split('T')[0]
        } else {
          dateStr = String(r.Date).split('T')[0]
        }
      }
      
      const period = getPeriodFromDateString(dateStr)
      const monthName = dateStr ? new Date(dateStr).toLocaleString('default', { month: 'long', timeZone: 'UTC' }) : String(r.Month || '').trim()

      return {
        id: `xl-${Date.now()}-${i}`,
        date: dateStr,
        period: period, // e.g., "2024-08"
        month: monthName, // e.g., "August"
        category: String(r.Category || r.category || 'Other').trim(),
        description: String(r.Description || r.description || '').trim(),
        amount: parseFloat(r.Amount || r.amount) || 0,
        source: 'excel',
      }
    })
}

export function exportToExcel(transactions) {
  const wsData = transactions.map(t => ({
    Date: t.date,
    Category: t.category,
    Description: t.description,
    'Type (Income/Expense)': 'Expense',
    Amount: t.amount,
    Month: t.month
  }))

  const ws = XLSX.utils.json_to_sheet(wsData)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Transactions')
  
  // Generate download
  XLSX.writeFile(wb, `Budget_Export_${new Date().toISOString().split('T')[0]}.xlsx`)
}
import * as XLSX from 'xlsx'

export async function loadTransactions() {
  const res = await fetch('/Rishabh_Budget.xlsx')
  const buf = await res.arrayBuffer()
  const wb = XLSX.read(new Uint8Array(buf), { type: 'array' })
  const rows = XLSX.utils.sheet_to_json(wb.Sheets['Transactions'])

  return rows
    .filter(r => r.Description && r.Amount && !isNaN(r.Amount))
    .map((r, i) => {
      let dateStr = ''
      if (typeof r.Date === 'number') {
        const d = XLSX.SSF.parse_date_code(r.Date)
        dateStr = `${d.y}-${String(d.m).padStart(2,'0')}-${String(d.d).padStart(2,'0')}`
      } else if (r.Date) {
        dateStr = String(r.Date).split('T')[0]
      }
      return {
        id: `xl-${i}`,
        date: dateStr,
        month: String(r.Month || r.month || '').trim(),
        category: String(r.Category || r.category || 'Other').trim(),
        description: String(r.Description || r.description || '').trim(),
        amount: parseFloat(r.Amount || r.amount) || 0,
        source: 'excel',
      }
    })
}
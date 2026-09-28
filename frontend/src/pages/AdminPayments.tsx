import { useRef, useState } from 'react'
import { adminDate, adminMembers, adminPayments, adminRevenue, money } from '../data/admin'
import './adminPayments.css'

type Payment = typeof adminPayments[number]
export function AdminPayments() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [selected, setSelected] = useState<Payment | null>(null)
  const [message, setMessage] = useState('')
  const dialog = useRef<HTMLDialogElement>(null)
  const member = adminMembers.find(item => item.id === selected?.memberId)
  const visible = adminPayments.filter(payment => (status === 'all' || payment.status === status) && `${payment.id} ${adminMembers.find(item => item.id === payment.memberId)?.name} ${payment.memberId}`.toLowerCase().includes(search.trim().toLowerCase()))
  const totalFor = (value: Payment['status']) => adminPayments.filter(item => item.status === value).reduce((sum, item) => sum + item.amount, 0)
  function download() {
    if (!selected || !member || selected.status === 'Failed') return
    const text = [
      'FORM — SAMPLE INVOICE PREVIEW', 'FICTIONAL DEMO — NOT A VALID INVOICE OR RECEIPT',
      `Sample reference: DEMO-${selected.id}`, `Transaction: ${selected.id}`, `Date: ${adminDate(selected.date)}`,
      `Fictional member: ${member.name} (${member.id})`, `Sample email: ${member.email}`,
      `Description: ${member.plan} membership — September 2026 sample`,
      `Sample amount: NGN ${selected.amount.toLocaleString('en-NG')}`, `Sample status: ${selected.status}`,
      `Sample refund: NGN ${selected.status === 'Refunded' ? selected.amount.toLocaleString('en-NG') : '0'}`,
      `Sample net collected: NGN ${selected.status === 'Paid' ? selected.amount.toLocaleString('en-NG') : '0'}`,
      'Actual amount charged by this demo: NGN 0',
      'No payment was processed. No tax, billing, or legal invoice is issued. This file is a portfolio sample only.',
    ].join('\n')
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url; link.download = `FORM-SAMPLE-${selected.id}.txt`; link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    setMessage('Sample text download requested. This is not an issued invoice or receipt.')
  }
  return <>
    <p>Read-only September 2026 sample transactions. These records are separate from checkout simulations. No real money or invoices are involved.</p>
    <section className="admin-metrics" aria-label="All sample payment totals"><div><p>Net collected · sample</p><strong>{money(adminRevenue)}</strong><span>{adminPayments.filter(item => item.status === 'Paid').length} paid records</span></div><div><p>Refunded · sample</p><strong>{money(totalFor('Refunded'))}</strong><span>{adminPayments.filter(item => item.status === 'Refunded').length} fully refunded record · excluded from net</span></div><div><p>Failed attempts · sample</p><strong>{money(totalFor('Failed'))}</strong><span>{adminPayments.filter(item => item.status === 'Failed').length} failed attempt · nothing collected</span></div></section>
    <div className="admin-filters"><label>Search transactions<input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Transaction ID, member name or ID" /></label><label>Payment status<select value={status} onChange={event => setStatus(event.target.value)}><option value="all">All statuses</option>{['Paid', 'Refunded', 'Failed'].map(value => <option key={value}>{value}</option>)}</select></label><button className="text-link" onClick={() => { setSearch(''); setStatus('all') }}>Reset filters</button></div>
    <p className="admin-result-count" role="status">{visible.length} matching transactions · summary totals always cover all records</p>
    {visible.length ? <div className="admin-table-scroll" role="region" aria-label="Sample payments; scroll horizontally on small screens" tabIndex={0}><table className="admin-table"><caption>Sample transaction history · amounts in NGN</caption><thead><tr>{['Transaction', 'Member', 'Date', 'Amount', 'Status', 'Details'].map(value => <th scope="col" key={value}>{value}</th>)}</tr></thead><tbody>{visible.map(payment => <tr key={payment.id}><th scope="row">{payment.id}</th><td><a href={`#/admin/members/${payment.memberId}`}>{adminMembers.find(item => item.id === payment.memberId)?.name}</a></td><td>{adminDate(payment.date)}</td><td>{money(payment.amount)}</td><td>{payment.status}</td><td><button className="text-link" onClick={() => { setSelected(payment); setMessage(''); dialog.current?.showModal() }} aria-label={`View ${payment.id}`}>View details</button></td></tr>)}</tbody></table></div> : <div className="member-empty"><h2>No matching transactions.</h2><p>Try another name or transaction ID, or reset the filters.</p></div>}
    <dialog ref={dialog} className="class-dialog payment-preview" aria-labelledby="payment-preview-title" onClose={() => setSelected(null)}><button className="button" autoFocus onClick={() => dialog.current?.close()}>Close details</button>{selected && member && <><p className="invoice-demo-label">Fictional demo · not a valid invoice or receipt</p><h2 id="payment-preview-title">{selected.status === 'Failed' ? 'Failed transaction' : 'Sample invoice preview'}</h2><p>{selected.id} · {adminDate(selected.date)}</p><dl className="admin-facts"><dt>Fictional member</dt><dd>{member.name} · {member.id}</dd><dt>Sample description</dt><dd>{member.plan} membership · September 2026</dd><dt>Recorded amount</dt><dd>{money(selected.amount)}</dd><dt>Sample payment status</dt><dd>{selected.status}</dd><dt>Sample refund</dt><dd>{money(selected.status === 'Refunded' ? selected.amount : 0)}</dd><dt>Sample net collected</dt><dd>{money(selected.status === 'Paid' ? selected.amount : 0)}</dd></dl><p>{selected.status === 'Failed' ? 'This sample attempt failed. No invoice preview is available because no payment was collected.' : selected.status === 'Refunded' ? 'This sample payment was fully refunded; its net contribution is zero.' : 'This is a preview of a fictional paid membership record.'}</p><p>No real payment was processed. This preview does not establish a tax invoice, billing agreement or amount owed.</p>{selected.status !== 'Failed' && <button className="button button-dark" onClick={download}>Download sample text</button>}<p role="status">{message}</p></>}</dialog>
  </>
}

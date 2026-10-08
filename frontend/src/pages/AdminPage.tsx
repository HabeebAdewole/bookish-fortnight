import { AdminPayments } from './AdminPayments'
import { AdminTrainers } from './AdminTrainers'
import { AdminSchedule } from './AdminSchedule'
import { adminDate, adminMembers, adminPayments, adminRevenue, attendancePeriods, money, visitTotal } from '../data/admin'
import './admin.css'

export function AdminPage({ path, query }: { path: string; query: string }) {
  const overview = path === '/admin'
  const payments = path === '/admin/payments'
  const staff = path === '/admin/trainers'
  const schedule = path === '/admin/schedule'
  const directory = path === '/admin/members'
  const member = adminMembers.find(item => path === `/admin/members/${item.id}`)
  const params = new URLSearchParams(query)
  const search = params.get('search') ?? ''
  const status = ['Active', 'Paused', 'Cancelled'].includes(params.get('status') ?? '') ? params.get('status')! : ''
  const plan = ['Foundation', 'Rhythm', 'Everyday'].includes(params.get('plan') ?? '') ? params.get('plan')! : ''
  const members = adminMembers.filter(item => (!status || item.status === status) && (!plan || item.plan === plan) && `${item.name} ${item.email} ${item.id}`.toLowerCase().includes(search.trim().toLowerCase()))
  function filter(key: string, value: string) {
    const next = new URLSearchParams(query)
    if (value) next.set(key, value); else next.delete(key)
    const nextHash = `#/admin/members${next.size ? `?${next}` : ''}`
    if (key === 'search') { history.replaceState(null, '', nextHash); window.dispatchEvent(new HashChangeEvent('hashchange')) }
    else window.location.hash = nextHash
  }
  const weekly = attendancePeriods.map((_, index) => adminMembers.reduce((sum, item) => sum + item.visits[index], 0))
  return <div className="admin-area page-width">

    <nav className="member-nav" aria-label="Admin navigation"><a href="#/admin" aria-current={overview ? 'page' : undefined}>Overview</a><a href="#/admin/members" aria-current={directory || member ? 'page' : undefined}>Members</a><a href="#/admin/schedule" aria-current={schedule ? 'page' : undefined}>Schedule</a><a href="#/admin/trainers" aria-current={staff ? 'page' : undefined}>Trainers</a><a href="#/admin/payments" aria-current={payments ? 'page' : undefined}>Payments</a><a href="#/member">Member space</a><a href="#home">Back to FORM</a></nav>
    <header className="member-heading"><div><p className="section-caption">Club operations</p><h1 tabIndex={-1}>{payments ? 'EVERY PAYMENT, IN VIEW.' : staff ? 'THE PEOPLE BEHIND THE WORK.' : schedule ? 'MAKE ROOM TO MOVE.' : overview ? 'THE CLUB AT A GLANCE.' : directory ? 'PEOPLE MAKE FORM.' : member ? member.name : 'MEMBER NOT FOUND.'}</h1><p>{payments ? 'Transactions and invoice previews.' : staff ? 'Trainer details and weekly assignments.' : schedule ? 'Plan the recurring week. Add, adjust or cancel sessions.' : overview ? 'A September snapshot of membership, payments and attendance.' : directory ? 'Explore members by name, plan or membership status.' : member ? `${member.id} · Member profile` : 'This member record could not be found.'}</p></div></header>
    {payments && <AdminPayments />}
    {staff && <AdminTrainers />}
    {schedule && <AdminSchedule />}
    {overview && <>
      <section className="admin-metrics" aria-label="September totals"><div><p>Total members</p><strong>{adminMembers.length}</strong><span>{adminMembers.filter(item => item.status === 'Active').length} active memberships</span></div><div><p>Net collected · September</p><strong>{money(adminRevenue)}</strong><span>Paid records only; refunded/failed excluded</span></div><div><p>Recorded check-ins</p><strong>{weekly.reduce((sum, count) => sum + count, 0)}</strong><span>1–27 September · all members</span></div></section>
      <div className="admin-overview-grid"><section className="admin-panel"><h2>Attendance through September</h2><p>The final period covers six days.</p><div className="admin-bars" role="img" aria-label={weekly.map((value, index) => `${attendancePeriods[index]}: ${value} check-ins`).join('; ')}>{weekly.map((value, index) => <div key={index}><span>{value}</span><div style={{ height: `${value / Math.max(...weekly, 1) * 150}px` }} /><small>{attendancePeriods[index]}</small></div>)}</div><details><summary>View attendance data</summary><table className="admin-table"><caption>Check-ins by period</caption><thead><tr><th scope="col">Period</th><th scope="col">Check-ins</th></tr></thead><tbody>{weekly.map((value, index) => <tr key={index}><th scope="row">{attendancePeriods[index]}</th><td>{value}</td></tr>)}</tbody></table></details></section>
      <section className="admin-panel"><h2>Membership mix</h2><p>All eight records, including paused and cancelled memberships.</p><ul className="admin-mix">{['Foundation', 'Rhythm', 'Everyday'].map(name => <li key={name}><a href={`#/admin/members?plan=${name}`}>{name}</a><strong>{adminMembers.filter(item => item.plan === name).length}</strong></li>)}</ul><a className="text-link" href="#/admin/members">Explore member directory</a></section></div>
      <section className="admin-panel admin-recent"><h2>Newest members</h2><ul className="admin-member-list">{[...adminMembers].sort((a, b) => b.joined.localeCompare(a.joined)).slice(0, 3).map(item => <li key={item.id}><a href={`#/admin/members/${item.id}`}>{item.name}</a><span>{item.plan} · joined {adminDate(item.joined)}</span></li>)}</ul></section>
    </>}
    {directory && <>
      <div className="admin-filters"><label htmlFor="admin-search">Search members<input id="admin-search" type="search" placeholder="Name, email or member ID" value={search} onChange={event => filter('search', event.target.value)} /></label><label htmlFor="admin-status">Status<select id="admin-status" value={status} onChange={event => filter('status', event.target.value)}><option value="">All statuses</option>{['Active', 'Paused', 'Cancelled'].map(value => <option key={value}>{value}</option>)}</select></label><label htmlFor="admin-plan">Plan<select id="admin-plan" value={plan} onChange={event => filter('plan', event.target.value)}><option value="">All plans</option>{['Foundation', 'Rhythm', 'Everyday'].map(value => <option key={value}>{value}</option>)}</select></label><a className="text-link" href="#/admin/members">Reset filters</a></div>
      <p className="admin-result-count" role="status">{members.length} of {adminMembers.length} members</p>
      {members.length ? <div className="admin-table-scroll" role="region" aria-label="Member directory; scroll horizontally on small screens" tabIndex={0}><table className="admin-table"><caption>Member directory · select a name to view details</caption><thead><tr>{['Member', 'Plan', 'Status', 'Joined', 'September visits'].map(value => <th key={value} scope="col">{value}</th>)}</tr></thead><tbody>{members.map(item => <tr key={item.id}><th scope="row"><a href={`#/admin/members/${item.id}`}>{item.name}</a><small>{item.id} · {item.email}</small></th><td>{item.plan}</td><td><span className="admin-status">{item.status}</span></td><td>{adminDate(item.joined)}</td><td>{visitTotal(item)}</td></tr>)}</tbody></table></div> : <div className="member-empty"><h2>No matching members.</h2><p>Try another name or change the plan and status filters.</p><a className="button button-dark" href="#/admin/members">Clear all filters</a></div>}
    </>}
    {member && <>
      <a className="text-link" href="#/admin/members">Back to members</a><div className="admin-detail-grid"><section className="admin-panel"><div className="admin-avatar" aria-hidden="true">{member.name.split(' ').map(part => part[0]).join('')}</div><h2>Member details</h2><dl className="admin-facts"><dt>Email</dt><dd>{member.email}</dd><dt>Membership</dt><dd>{member.plan} · {member.status}</dd><dt>Joined</dt><dd>{adminDate(member.joined)}</dd><dt>September check-ins</dt><dd>{visitTotal(member)}</dd></dl></section><section className="admin-panel"><h2>Attendance record</h2><table className="admin-table"><caption>Visits through 27 September</caption><thead><tr><th scope="col">Period</th><th scope="col">Visits</th></tr></thead><tbody>{member.visits.map((value, index) => <tr key={index}><th scope="row">{attendancePeriods[index]}</th><td>{value}</td></tr>)}</tbody></table><h2 className="admin-payment-title">September payment</h2>{adminPayments.filter(payment => payment.memberId === member.id).map(payment => <div className="admin-payment" key={payment.id}><p><strong>{money(payment.amount)}</strong> · {payment.status}</p><p>{payment.id} · {adminDate(payment.date)}</p></div>)}</section></div>
    </>}
    {!payments && !staff && !schedule && !overview && !directory && !member && <a className="button button-dark" href="#/admin/members">Return to member directory</a>}
  </div>
}

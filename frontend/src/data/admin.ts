export type AdminMember = {
  id: string; name: string; email: string; plan: 'Foundation' | 'Rhythm' | 'Everyday'
  status: 'Active' | 'Paused' | 'Cancelled'; joined: string; visits: number[]
}
export const adminMembers: AdminMember[] = [
  { id: 'FM-1001', name: 'Ada Bello', email: 'ada@example.com', plan: 'Rhythm', status: 'Active', joined: '2026-06-12', visits: [2, 1, 2, 1] },
  { id: 'FM-1002', name: 'Tunde Akin', email: 'tunde@example.com', plan: 'Everyday', status: 'Active', joined: '2026-07-03', visits: [3, 3, 2, 3] },
  { id: 'FM-1003', name: 'Zainab Musa', email: 'zainab@example.com', plan: 'Foundation', status: 'Active', joined: '2026-08-15', visits: [1, 1, 1, 1] },
  { id: 'FM-1004', name: 'Emeka Obi', email: 'emeka@example.com', plan: 'Rhythm', status: 'Paused', joined: '2026-05-21', visits: [2, 1, 0, 0] },
  { id: 'FM-1005', name: 'Sade Cole', email: 'sade@example.com', plan: 'Everyday', status: 'Active', joined: '2026-09-02', visits: [2, 3, 3, 2] },
  { id: 'FM-1006', name: 'Ibrahim Lawal', email: 'ibrahim@example.com', plan: 'Foundation', status: 'Cancelled', joined: '2026-04-10', visits: [1, 0, 0, 0] },
  { id: 'FM-1007', name: 'Nneka Okoro', email: 'nneka@example.com', plan: 'Rhythm', status: 'Active', joined: '2026-09-08', visits: [0, 2, 2, 1] },
  { id: 'FM-1008', name: 'Dami George', email: 'dami@example.com', plan: 'Foundation', status: 'Paused', joined: '2026-08-01', visits: [1, 1, 0, 0] },
]
export const adminPayments = [
  { id: 'PAY-101', memberId: 'FM-1001', date: '2026-09-01', amount: 40000, status: 'Paid' },
  { id: 'PAY-102', memberId: 'FM-1002', date: '2026-09-01', amount: 60000, status: 'Paid' },
  { id: 'PAY-103', memberId: 'FM-1003', date: '2026-09-01', amount: 25000, status: 'Paid' },
  { id: 'PAY-104', memberId: 'FM-1004', date: '2026-09-01', amount: 40000, status: 'Paid' },
  { id: 'PAY-105', memberId: 'FM-1005', date: '2026-09-02', amount: 60000, status: 'Paid' },
  { id: 'PAY-106', memberId: 'FM-1006', date: '2026-09-01', amount: 25000, status: 'Refunded' },
  { id: 'PAY-107', memberId: 'FM-1007', date: '2026-09-08', amount: 40000, status: 'Paid' },
  { id: 'PAY-108', memberId: 'FM-1008', date: '2026-09-01', amount: 25000, status: 'Failed' },
] as const
export const attendancePeriods = ['1–7 Sep', '8–14 Sep', '15–21 Sep', '22–27 Sep']
export const money = (amount: number) => `₦${amount.toLocaleString('en-NG')}`
export const visitTotal = (member: AdminMember) => member.visits.reduce((sum, count) => sum + count, 0)
export const adminRevenue = adminPayments.reduce((sum, payment) => sum + (payment.status === 'Paid' ? payment.amount : 0), 0)
export const adminDate = (date: string) => new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`))

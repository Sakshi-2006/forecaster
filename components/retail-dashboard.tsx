'use client'

import { useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Boxes,
  ChevronDown,
  CircleHelp,
  Download,
  LayoutDashboard,
  Menu,
  PackageCheck,
  PanelLeft,
  RefreshCw,
  Search,
  Settings2,
  ShoppingCart,
  Sparkles,
  Store,
  Truck,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const forecastData = [
  { week: 'Aug 05', actual: 980, forecast: 950 },
  { week: 'Aug 12', actual: 1120, forecast: 1080 },
  { week: 'Aug 19', actual: 1040, forecast: 1060 },
  { week: 'Aug 26', actual: 1210, forecast: 1190 },
  { week: 'Sep 02', actual: 1280, forecast: 1260 },
  { week: 'Sep 09', actual: 1370, forecast: 1340 },
  { week: 'Sep 16', actual: null, forecast: 1410 },
  { week: 'Sep 23', actual: null, forecast: 1460 },
  { week: 'Sep 30', actual: null, forecast: 1530 },
]

const categoryData = [
  { name: 'Beverages', sales: 42100, share: 31 },
  { name: 'Staples', sales: 32800, share: 24 },
  { name: 'Personal care', sales: 28400, share: 21 },
  { name: 'Snacks', sales: 19600, share: 15 },
  { name: 'Household', sales: 12400, share: 9 },
]

const recommendations = [
  { sku: 'BEV-1042', product: 'Sparkling water 12pk', category: 'Beverages', stock: 18, reorder: 42, order: 96, days: 2, status: 'Critical' },
  { sku: 'STP-2088', product: 'Basmati rice 5kg', category: 'Staples', stock: 32, reorder: 28, order: 60, days: 4, status: 'Order soon' },
  { sku: 'PC-3017', product: 'Daily shampoo 400ml', category: 'Personal care', stock: 44, reorder: 36, order: 72, days: 6, status: 'Order soon' },
  { sku: 'SNK-1144', product: 'Sea salt crisps', category: 'Snacks', stock: 86, reorder: 34, order: 0, days: 12, status: 'Healthy' },
  { sku: 'HH-5510', product: 'Laundry detergent 2L', category: 'Household', stock: 24, reorder: 31, order: 48, days: 3, status: 'Order soon' },
]

const kpis = [
  { label: 'Forecast accuracy', value: '92.4%', change: '+4.8%', note: 'vs. last period', icon: Sparkles, tone: 'teal' },
  { label: 'Stockout risk', value: '8.6%', change: '-2.1%', note: 'vs. last period', icon: AlertTriangle, tone: 'amber' },
  { label: 'Inventory value', value: '$284.6k', change: '-6.4%', note: 'working capital', icon: Boxes, tone: 'blue' },
  { label: 'Fill rate', value: '96.8%', change: '+1.7%', note: 'service level', icon: PackageCheck, tone: 'violet' },
]

function StatusBadge({ status }: { status: string }) {
  const classes = status === 'Critical' ? 'bg-red-50 text-red-700 ring-red-200' : status === 'Healthy' ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-amber-50 text-amber-700 ring-amber-200'
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${classes}`}>{status}</span>
}

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && <button aria-label="Close navigation" className="fixed inset-0 z-30 bg-slate-950/30 lg:hidden" onClick={onClose} />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col border-r border-slate-200 bg-white transition-transform lg:static lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-[76px] items-center justify-between border-b border-slate-100 px-6">
          <div className="flex items-center gap-2.5"><div className="flex size-9 items-center justify-center rounded-xl bg-[#103b45] text-white"><Store size={18} /></div><div><div className="text-sm font-bold tracking-tight text-slate-900">Meridian</div><div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Retail intelligence</div></div></div>
          <button className="text-slate-400 lg:hidden" onClick={onClose} aria-label="Close navigation"><X size={18} /></button>
        </div>
        <div className="px-4 py-6">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Workspace</p>
          <nav className="flex flex-col gap-1" aria-label="Main navigation">
            {[['Overview', LayoutDashboard], ['Forecasts', LineChart], ['Inventory', Boxes], ['Orders', ShoppingCart]].map(([label, Icon], index) => <button key={label as string} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium ${index === 0 ? 'bg-[#e8f4f2] text-[#0f5863]' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}><Icon size={17} />{label as string}{label === 'Orders' && <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500">12</span>}</button>)}
          </nav>
          <p className="px-3 pb-2 pt-8 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Manage</p>
          <nav className="flex flex-col gap-1"><button className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-50"><Truck size={17} />Suppliers</button><button className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-50"><Settings2 size={17} />Settings</button></nav>
        </div>
        <div className="mt-auto p-4"><div className="rounded-2xl bg-[#f3f8f7] p-4"><div className="mb-3 flex size-8 items-center justify-center rounded-lg bg-white text-[#277581] shadow-sm"><CircleHelp size={16} /></div><p className="text-xs font-semibold text-slate-800">Need a hand?</p><p className="mt-1 text-[11px] leading-4 text-slate-500">Learn how Meridian turns forecasts into actions.</p><button className="mt-3 text-[11px] font-bold text-[#277581]">View guide <span aria-hidden="true">→</span></button></div><div className="mt-5 flex items-center gap-3 px-2"><div className="flex size-8 items-center justify-center rounded-full bg-[#d9e9e6] text-xs font-bold text-[#17616b]">AM</div><div className="min-w-0"><p className="truncate text-xs font-semibold text-slate-800">Alex Morgan</p><p className="text-[10px] text-slate-400">Operations lead</p></div><ChevronDown className="ml-auto text-slate-400" size={15} /></div></div>
      </aside>
    </>
  )
}

export function RetailDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [range, setRange] = useState('Last 8 weeks')
  const [synced, setSynced] = useState(false)
  const [filter, setFilter] = useState('All categories')
  const filteredRecommendations = useMemo(() => filter === 'All categories' ? recommendations : recommendations.filter((item) => item.category === filter), [filter])
  return (
    <div className="min-h-screen bg-[#f7f9fa] text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="min-w-0 flex-1">
          <header className="flex h-[76px] items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8"><div className="flex items-center gap-3"><button className="text-slate-500 lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open navigation"><Menu size={20} /></button><div><p className="text-xs font-medium text-slate-400">Monday, September 16, 2024</p><h1 className="text-lg font-bold tracking-tight text-slate-900">Good morning, Alex</h1></div></div><div className="flex items-center gap-2 sm:gap-4"><button className="hidden rounded-lg p-2 text-slate-400 hover:bg-slate-50 sm:block" aria-label="Search"><Search size={18} /></button><button className="relative rounded-lg p-2 text-slate-400 hover:bg-slate-50" aria-label="Notifications"><Bell size={18} /><span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-[#e37b5c]" /></button><div className="hidden h-6 w-px bg-slate-200 sm:block" /><button className="flex items-center gap-2 text-sm font-semibold text-slate-700"><div className="flex size-8 items-center justify-center rounded-full bg-[#d9e9e6] text-xs font-bold text-[#17616b]">AM</div><span className="hidden md:block">Alex Morgan</span><ChevronDown size={15} className="text-slate-400" /></button></div></header>
          <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 lg:px-10"><div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#277581]"><span className="size-1.5 rounded-full bg-[#3fa496]" />Live workspace</div><h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Operations overview</h2><p className="mt-1 text-sm text-slate-500">A clear view of demand, inventory health, and what needs your attention.</p></div><div className="flex items-center gap-2"><Button variant="outline" className="h-9 border-slate-200 bg-white text-xs text-slate-600" onClick={() => { setSynced(true); setTimeout(() => setSynced(false), 1800) }}><RefreshCw data-icon="inline-start" className={synced ? 'animate-spin' : ''} />{synced ? 'Synced' : 'Sync data'}</Button><Button className="h-9 bg-[#103b45] text-xs text-white hover:bg-[#165664]"><Download data-icon="inline-start" />Export report</Button></div></div>
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{kpis.map(({ label, value, change, note, icon: Icon, tone }) => <article key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.02)]"><div className="flex items-start justify-between"><div className={`flex size-9 items-center justify-center rounded-xl ${tone === 'teal' ? 'bg-[#e5f4f1] text-[#277581]' : tone === 'amber' ? 'bg-[#fff4df] text-[#b87526]' : tone === 'blue' ? 'bg-[#eaf1fb] text-[#4d7fb8]' : 'bg-[#f0edfb] text-[#7661a9]'}`}><Icon size={17} /></div><span className={`flex items-center text-xs font-bold ${change.startsWith('+') ? 'text-emerald-600' : 'text-emerald-600'}`}>{change.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{change}</span></div><p className="mt-4 text-xs font-medium text-slate-500">{label}</p><div className="mt-1 flex items-baseline gap-2"><p className="text-2xl font-bold tracking-tight text-slate-900">{value}</p><span className="text-[11px] text-slate-400">{note}</span></div></article>)}</section>
            <section className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_1fr]"><article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start"><div><h3 className="text-sm font-bold text-slate-900">Demand forecast</h3><p className="mt-1 text-xs text-slate-500">Total unit demand across all stores and categories</p></div><select aria-label="Forecast range" value={range} onChange={(e) => setRange(e.target.value)} className="h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-600 outline-none"><option>Last 8 weeks</option><option>Last 12 weeks</option><option>Last 6 months</option></select></div><div className="mt-6 h-[260px] w-full"><ResponsiveContainer width="100%" height="100%"><AreaChart data={forecastData} margin={{ top: 5, right: 8, left: -22, bottom: 0 }}><defs><linearGradient id="forecastFill" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3fa496" stopOpacity={0.2} /><stop offset="95%" stopColor="#3fa496" stopOpacity={0} /></linearGradient></defs><CartesianGrid vertical={false} stroke="#edf1f2" /><XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} /><YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} /><Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12 }} /><Area type="monotone" dataKey="forecast" stroke="#277581" strokeWidth={2.5} fill="url(#forecastFill)" strokeDasharray="5 4" connectNulls /><Area type="monotone" dataKey="actual" stroke="#103b45" strokeWidth={2.5} fill="transparent" /></AreaChart></ResponsiveContainer></div><div className="mt-2 flex items-center justify-center gap-5 text-[11px] text-slate-500"><span className="flex items-center gap-2"><i className="size-2 rounded-full bg-[#103b45]" />Actual demand</span><span className="flex items-center gap-2"><i className="size-2 rounded-full bg-[#3fa496]" />Forecast</span></div></article><article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"><div className="flex items-start justify-between"><div><h3 className="text-sm font-bold text-slate-900">Sales by category</h3><p className="mt-1 text-xs text-slate-500">Revenue contribution this period</p></div><button className="text-xs font-semibold text-[#277581]">View all</button></div><div className="mt-5 h-[218px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={categoryData} layout="vertical" margin={{ left: 0, right: 15, top: 0, bottom: 0 }}><XAxis type="number" hide /><YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} tick={{ fontSize: 10, fill: '#64748b' }} /><Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12 }} formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Sales']} /><Bar dataKey="sales" fill="#4b9d93" radius={[0, 5, 5, 0]} barSize={18} /></BarChart></ResponsiveContainer></div><div className="mt-1 flex items-center justify-between border-t border-slate-100 pt-3 text-xs"><span className="text-slate-500">Total revenue</span><span className="font-bold text-slate-900">$135.3k <span className="ml-1 font-medium text-emerald-600">+8.2%</span></span></div></article></section>
            <section className="mt-5 rounded-2xl border border-slate-200 bg-white"><div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:p-6"><div><div className="flex items-center gap-2"><h3 className="text-sm font-bold text-slate-900">Replenishment recommendations</h3><span className="rounded-full bg-[#fff0e8] px-2 py-0.5 text-[10px] font-bold text-[#c56845]">4 actions</span></div><p className="mt-1 text-xs text-slate-500">Prioritized by stockout risk and expected demand</p></div><div className="flex items-center gap-2"><select aria-label="Filter category" value={filter} onChange={(e) => setFilter(e.target.value)} className="h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-600 outline-none"><option>All categories</option>{categoryData.map((item) => <option key={item.name}>{item.name}</option>)}</select><Button variant="ghost" size="sm" className="hidden text-xs text-slate-500 sm:flex">View inventory <ArrowUpRight data-icon="inline-end" /></Button></div></div><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-xs"><thead className="bg-slate-50/70 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-400"><tr><th className="px-6 py-3 font-semibold">Product</th><th className="px-4 py-3 font-semibold">On hand</th><th className="px-4 py-3 font-semibold">Reorder point</th><th className="px-4 py-3 font-semibold">Suggested order</th><th className="px-4 py-3 font-semibold">Cover</th><th className="px-6 py-3 font-semibold">Status</th></tr></thead><tbody className="divide-y divide-slate-100">{filteredRecommendations.map((item) => <tr key={item.sku} className="hover:bg-slate-50/70"><td className="px-6 py-4"><div className="flex items-center gap-3"><div className="flex size-8 items-center justify-center rounded-lg bg-[#edf5f4] text-[#277581]"><PackageCheck size={15} /></div><div><p className="font-semibold text-slate-800">{item.product}</p><p className="mt-0.5 text-[10px] text-slate-400">{item.sku} · {item.category}</p></div></div></td><td className="px-4 py-4 font-semibold text-slate-700">{item.stock} units</td><td className="px-4 py-4 text-slate-600">{item.reorder} units</td><td className="px-4 py-4 font-semibold text-[#277581]">{item.order ? `${item.order} units` : '—'}</td><td className="px-4 py-4 text-slate-600">{item.days} days</td><td className="px-6 py-4"><StatusBadge status={item.status} /></td></tr>)}</tbody></table></div></section>
            <footer className="flex flex-col justify-between gap-2 py-6 text-[11px] text-slate-400 sm:flex-row"><span>Meridian Retail Intelligence · Data refreshed 4 min ago</span><span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-emerald-500" />All systems operational</span></footer>
          </div>
        </main>
      </div>
    </div>
  )
}

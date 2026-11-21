import React from 'react'
import { motion } from 'framer-motion'
import {
  Wallet,
  LayoutDashboard,
  Receipt,
  Target,
  PiggyBank,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  ChevronLeft,
  ChevronRight,
  User,
  ArrowUpRight,
  ArrowLeft,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Button from '../ui/Button'

export default function Sidebar({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
  onOpenAddModal,
  onNavigate,
}) {
  const { user, logout } = useAuth()

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: Receipt },
    { id: 'budgets', label: 'Budgets', icon: Target },
    { id: 'savings', label: 'Savings Goals', icon: PiggyBank },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const handleTabClick = (id) => {
    setActiveTab(id)
    if (mobileOpen) setMobileOpen(false)
  }

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between p-4 bg-dark-surface">
      {/* Brand & Collapse */}
      <div>
        <div className="flex items-center justify-between pb-5 mb-3 border-b border-dark-border">
          <div className="flex items-center gap-3 overflow-hidden cursor-pointer" onClick={() => handleTabClick('overview')}>
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm shrink-0 border border-emerald-400/20">
              <Wallet className="w-4 h-4" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-sm text-text-main tracking-tight leading-none">WalletWise</span>
                <span className="text-[10px] text-text-muted uppercase tracking-wider mt-1 font-medium">Personal Finance</span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded-md text-text-muted hover:text-text-main hover:bg-white/[0.05] transition-colors"
          >
            {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Quick Add Expense Action */}
        <div className="my-3">
          <Button
            variant="primary"
            onClick={() => onOpenAddModal('expense')}
            className={`w-full ${collapsed ? 'px-0 justify-center' : 'justify-center'}`}
          >
            <Plus className="w-3.5 h-3.5 shrink-0" />
            {!collapsed && <span>Record Expense</span>}
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm'
                    : 'text-text-secondary hover:text-text-main hover:bg-white/[0.04] border border-transparent'
                } ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400' : 'text-text-muted'}`} />
                {!collapsed && <span>{item.label}</span>}
                {isActive && !collapsed && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400" />
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* User Info & Logout Footer */}
      <div className="pt-3 border-t border-dark-border space-y-1.5">
        <div
          onClick={() => handleTabClick('settings')}
          className={`flex items-center gap-2.5 p-2 rounded-lg hover:bg-white/[0.04] cursor-pointer transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-dark-subtle border border-dark-border text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-medium text-text-main truncate">{user?.name || 'Account'}</p>
              <p className="text-[10px] text-text-muted truncate">{user?.email || ''}</p>
            </div>
          )}
        </div>

        {onNavigate && (
          <button
            onClick={() => onNavigate('landing')}
            className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-text-muted hover:text-text-main hover:bg-white/[0.04] transition-colors ${
              collapsed ? 'justify-center' : ''
            }`}
            title="Back to Landing Page"
          >
            <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
            {!collapsed && <span>Home Website</span>}
          </button>
        )}

        <button
          onClick={logout}
          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
          title="Sign Out"
        >
          <LogOut className="w-3.5 h-3.5 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:block fixed top-0 left-0 bottom-0 z-30 bg-dark-surface border-r border-dark-border transition-all duration-200 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-64 bg-dark-surface border-r border-dark-border z-10">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  )
}

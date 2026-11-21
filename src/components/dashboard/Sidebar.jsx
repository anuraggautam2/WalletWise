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
    <div className="flex flex-col h-full justify-between p-4">
      {/* Brand & Collapse */}
      <div>
        <div className="flex items-center justify-between pb-6 mb-2 border-b border-dark-border">
          <div className="flex items-center gap-3 overflow-hidden cursor-pointer" onClick={() => handleTabClick('overview')}>
            <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center text-white shadow-fintech-glow-blue shrink-0">
              <Wallet className="w-5 h-5" />
            </div>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col"
              >
                <span className="font-bold text-base text-text-main tracking-tight leading-none">WalletWise</span>
                <span className="text-[10px] text-text-muted uppercase tracking-widest mt-1">Student Finance</span>
              </motion.div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-text-muted hover:text-text-main hover:bg-dark-card-elevated transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Quick Add Expense Action */}
        <div className="my-4">
          <Button
            variant="primary"
            onClick={() => onOpenAddModal('expense')}
            className={`w-full ${collapsed ? 'px-0 justify-center' : 'justify-center'} shadow-md`}
          >
            <Plus className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Add Expense</span>}
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all relative ${
                  isActive
                    ? 'bg-brand-blue/15 text-brand-blue-light border border-brand-blue/30 shadow-sm'
                    : 'text-text-secondary hover:text-text-main hover:bg-white/5 border border-transparent'
                } ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-brand-blue-light' : 'text-text-muted'}`} />
                {!collapsed && <span>{item.label}</span>}
                {isActive && !collapsed && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-blue"
                  />
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* User Info & Logout Footer */}
      <div className="pt-4 border-t border-dark-border space-y-2">
        <div
          onClick={() => handleTabClick('settings')}
          className={`flex items-center gap-3 p-2 rounded-xl hover:bg-dark-card-elevated cursor-pointer transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-dark-secondary border border-dark-border text-text-main flex items-center justify-center font-bold text-xs shrink-0">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-semibold text-text-main truncate">{user?.name || 'Student User'}</p>
              <p className="text-[10px] text-text-muted truncate">{user?.email || ''}</p>
            </div>
          )}
        </div>

        {onNavigate && (
          <button
            onClick={() => onNavigate('landing')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 mb-1 rounded-xl text-xs font-semibold text-text-muted hover:text-text-main hover:bg-dark-card transition-colors ${
              collapsed ? 'justify-center' : ''
            }`}
            title="Back to Landing Page"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Back to Website</span>}
          </button>
        )}

        <button
          onClick={logout}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
          title="Sign Out"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:block fixed top-0 left-0 bottom-0 z-30 bg-dark-secondary border-r border-dark-border transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-[#060A14]/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-72 bg-dark-secondary border-r border-dark-border z-10">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  )
}

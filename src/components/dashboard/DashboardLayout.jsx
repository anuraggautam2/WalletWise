import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import OverviewTab from './OverviewTab'
import TransactionsTab from './TransactionsTab'
import BudgetsTab from './BudgetsTab'
import AnalyticsTab from './AnalyticsTab'
import SettingsTab from './SettingsTab'
import AddTransactionModal from './AddTransactionModal'
import AddBudgetModal from './AddBudgetModal'
import Toast from '../ui/Toast'

export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Transaction Modal State
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [defaultTxType, setDefaultTxType] = useState('expense')
  const [editingTransaction, setEditingTransaction] = useState(null)

  // Budget Modal State
  const [addBudgetModalOpen, setAddBudgetModalOpen] = useState(false)

  const handleOpenAddModal = (type = 'expense') => {
    setEditingTransaction(null)
    setDefaultTxType(type)
    setAddModalOpen(true)
  }

  const handleEditTransaction = (tx) => {
    setEditingTransaction(tx)
    setDefaultTxType(tx.type)
    setAddModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-dark-bg text-text-main flex font-sans selection:bg-brand-blue-glow selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
        onOpenAddModal={handleOpenAddModal}
      />

      {/* Main App Canvas */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          sidebarCollapsed ? 'md:pl-20' : 'md:pl-64'
        }`}
      >
        {/* Topbar Header */}
        <Topbar
          activeTab={activeTab}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onOpenAddModal={handleOpenAddModal}
        />

        {/* Tab Content Canvas with Animated Transition */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {activeTab === 'overview' && (
                <OverviewTab
                  onOpenAddModal={handleOpenAddModal}
                  onNavigateTab={(tab) => setActiveTab(tab)}
                />
              )}
              {activeTab === 'transactions' && (
                <TransactionsTab
                  onOpenAddModal={handleOpenAddModal}
                  onEditTransaction={handleEditTransaction}
                />
              )}
              {activeTab === 'budgets' && (
                <BudgetsTab
                  onOpenAddBudgetModal={() => setAddBudgetModalOpen(true)}
                />
              )}
              {activeTab === 'analytics' && <AnalyticsTab />}
              {activeTab === 'settings' && <SettingsTab />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Add / Edit Transaction Modal */}
      <AddTransactionModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        initialData={editingTransaction}
        defaultType={defaultTxType}
      />

      {/* Add / Edit Budget Modal */}
      <AddBudgetModal
        isOpen={addBudgetModalOpen}
        onClose={() => setAddBudgetModalOpen(false)}
      />

      {/* Toast Notification Container */}
      <Toast />
    </div>
  )
}

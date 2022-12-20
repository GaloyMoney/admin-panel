import Dashboard from "../components/dashboard"
import AccountDetails from "../components/account"
import TransactionDetails from "../components/transactions"

export const dashboardRoutes = [
  {
    name: "Dashboard",
    icon: "HomeIcon",
    path: "/",
    showInSidebar: false,
    component: () => <Dashboard />,
  },
  {
    name: "Account details",
    icon: "PeopleIcon",
    path: "/account",
    showInSidebar: true,
    component: () => <AccountDetails />,
  },
  {
    name: "Transactions",
    icon: "TransactionsIcon",
    path: "/transactions",
    showInSidebar: true,
    component: () => <TransactionDetails />,
  },
]

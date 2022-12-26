import AccountDetails from "../components/account"
import TransactionDetails from "../components/transactions"

export const dashboardRoutes = [
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

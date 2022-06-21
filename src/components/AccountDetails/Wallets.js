import React from "react"
import PropTypes from "prop-types"

const defaultData = {
  owner: {
    phone: "+11111111111",
  },
  username: "username",
  level: "ONE",
  status: "ACTIVE",
  title: "title",
  coordinates: {
    latitude: "13.4972747",
    longitude: "-89.4435569",
  },
  createdAt: 1633992340,
}

function Wallets({ accountDetails, update, loading = false, updating = false }) {
  const data = accountDetails || defaultData
  const usdWalletActive = accountDetails?.wallets?.some((e) => e.walletCurrency === "USD")
  let emptyClass =
    data.username === defaultData.username || loading ? "filter blur-sm" : ""
  emptyClass = emptyClass + (loading ? " animate-pulse" : "")

  return (
    <div className="shadow p-6 min-w-0 rounded-lg shadow-xs overflow-hidden bg-white">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="mb-4 font-semibold text-gray-600">BTC Wallet</p>
          <p className={`text-gray-600 ${emptyClass}`}>CREATED</p>
        </div>
        <div>
          <p className="mb-4 font-semibold text-gray-600">USD Wallet</p>
          <p className={`text-gray-600 ${emptyClass}`}>
            {usdWalletActive ? (
              <span>CREATED</span>
            ) : (
              <button
                onClick={update}
                disabled={updating}
                className={`text-sm bg-green-500 hover:bg-green-700 text-white font-bold p-2 border border-green-700 rounded disabled:opacity-50`}
              >
                {updating ? "Updating..." : "Add Account"}
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

Wallets.propTypes = {
  accountDetails: PropTypes.object,
  update: PropTypes.func,
  updating: PropTypes.bool,
  loading: PropTypes.bool,
}

export default Wallets

import { LightningInvoice } from "../../generated"
import { formatDate } from "../../utils"

const emptyInvoice = {
  createdAt: 0,
  confirmedAt: 0,
  description: "----------------------------------------------------------------",
  expiresAt: 0,
  isSettled: false,
  received: 0,
  request: "lnbc1000000000000000000000000000000000000000000000000000000000000",
  secretPreImage: "0000000000000000000000000000000000000000000000000000000000000000",
}

type Props = {
  invoice: LightningInvoice
  loading: boolean
}

const LnInvoice: React.FC<Props> = ({ invoice, loading = false }) => {
  const data = invoice || emptyInvoice
  let emptyClass = data === emptyInvoice || loading ? "filter blur-sm" : ""
  emptyClass = emptyClass + (loading ? " animate-pulse" : "")

  return (
    <div className="shadow p-6 min-w-0 rounded-lg shadow-xs overflow-hidden bg-white grid grid-cols-3 gap-4">
      <div>
        <p className="mb-4 font-semibold text-gray-600">Settled</p>
        <p className={`text-gray-600 ${emptyClass}`}>{data.isSettled ? "Yes" : "No"}</p>
      </div>
      <div>
        <p className="mb-4 font-semibold text-gray-600">Amount</p>
        <p className={`text-gray-600 ${emptyClass}`}>{data.received || 0}</p>
      </div>
      <div>
        <p className="mb-4 font-semibold text-gray-600">Memo</p>
        <p className={`text-gray-600 break-all ${emptyClass}`}>
          {data.description || "--"}
        </p>
      </div>
      <div>
        <p className="mb-4 font-semibold text-gray-600">Created At</p>
        <p className={`text-gray-600 ${emptyClass}`}>{formatDate(data.createdAt)}</p>
      </div>
      <div>
        <p className="mb-4 font-semibold text-gray-600">Confirmed At</p>
        <p className={`text-gray-600 ${emptyClass}`}>
          {data.confirmedAt ? formatDate(data.confirmedAt) : "--"}
        </p>
      </div>
      <div>
        <p className="mb-4 font-semibold text-gray-600">Expires At</p>
        <p className={`text-gray-600 ${emptyClass}`}>
          {data.expiresAt ? formatDate(data.expiresAt) : "--"}
        </p>
      </div>
      <div className="col-span-3">
        <p className="mb-4 font-semibold text-gray-600">Secret</p>
        <p className={`text-gray-600 break-all ${emptyClass}`}>{data.secretPreImage}</p>
      </div>
      <div className="col-span-3">
        <p className="mb-4 font-semibold text-gray-600">Request</p>
        <p className={`text-gray-600 break-all ${emptyClass}`}>{data.request || "--"}</p>
      </div>
    </div>
  )
}

export default LnInvoice

import {
  TransactionsByHashDocument,
  TransactionsByHashQuery,
} from "../../../../generated"

import TransactionList from "../../../../components/transactions/list"
import { getClient } from "../../../graphql-rsc"

export default async function TransactionDetails({ params }: { params: { id: string } }) {
  const id = params.id

  const data = await getClient().query<TransactionsByHashQuery>({
    query: TransactionsByHashDocument,
    variables: { hash: id },
  })

  const txs = data.data.transactionsByHash

  return (
    <>
      <h1 className="mx-6 mt-6 text-2xl font-semibold text-gray-700">
        Transaction details
      </h1>
      <div className="grid gap-6 mb-8 md:grid-cols-1 p-6">
        {data && <TransactionList transactions={txs} />}
      </div>
    </>
  )
}

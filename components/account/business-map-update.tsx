"use client"

import { useState, useEffect } from "react"

const isValidLatitude = (latitude: number) =>
  isFinite(latitude) && Math.abs(latitude) <= 90
const isValidLongitude = (longitude: number) =>
  isFinite(longitude) && Math.abs(longitude) <= 180
const isValidTitle = (title: string) => title.length >= 3
const isValidBusinessInfo = ({
  title,
  latitude,
  longitude,
}: {
  title: string
  latitude: number
  longitude: number
}) => isValidLatitude(latitude) && isValidLongitude(longitude) && isValidTitle(title)

// FIXME: Combine types
type AccountDetails = {
  title: string
  coordinates: {
    latitude: number | ""
    longitude: number | ""
  }
}

type AccountInfo = {
  title: string
  longitude: number | ""
  latitude: number | ""
}

const BusinessMapUpdate: React.FC<{
  accountDetails: AccountDetails
  update: (info: AccountInfo) => void
  updating: boolean
  loading: boolean
}> = ({ accountDetails, update, updating = false, loading = false }) => {
  const data = accountDetails

  const [title, setTitle] = useState(data?.title || "")
  const [latitude, setLatitude] = useState<number | "">(data?.coordinates?.latitude || "")
  const [longitude, setLongitude] = useState<number | "">(
    data?.coordinates?.longitude || "",
  )

  let emptyClass = loading ? "filter blur-sm animate-pulse" : ""

  useEffect(() => {
    setTitle(data?.title || "")
    setLatitude(data?.coordinates?.latitude || "")
    setLongitude(data?.coordinates?.longitude || "")
  }, [data])

  const submit = async (event: any) => {
    event.preventDefault()

    const businessInfo = {
      title,
      longitude: Number(longitude),
      latitude: Number(latitude),
    }

    if (isValidBusinessInfo(businessInfo)) {
      return update && update(businessInfo)
    }

    alert("Invalid business info")
  }

  return (
    <div className="shadow p-6 min-w-0 rounded-lg shadow-xs overflow-hidden bg-white grid grid-cols-1 gap-4">
      <form className="grid grid-cols-2 gap-4" onSubmit={submit}>
        <div>
          <label htmlFor="latitude" className="font-semibold text-gray-600">
            Latitude
          </label>
          <input
            id="latitude"
            required
            type="text"
            placeholder="Enter longitude"
            value={latitude}
            onChange={(e) =>
              setLatitude(e.target.value !== "" ? Number(e.target.value) : "")
            }
            disabled={!!emptyClass}
            className={`${emptyClass} ${
              latitude !== "" && !isValidLatitude(latitude) && "border-red-500"
            } mt-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 focus:outline-none focus:shadow-outline`}
          />
        </div>
        <div>
          <label htmlFor="longitude" className="font-semibold text-gray-600">
            Longitude
          </label>
          <input
            id="longitude"
            required
            type="text"
            placeholder="Enter longitude"
            value={longitude}
            onChange={(e) =>
              setLongitude(e.target.value !== "" ? Number(e.target.value) : "")
            }
            disabled={!!emptyClass}
            className={`${emptyClass} ${
              longitude !== "" && !isValidLongitude(longitude) && "border-red-500"
            } mt-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 focus:outline-none focus:shadow-outline`}
          />
        </div>
        <div>
          <label htmlFor="title" className="font-semibold text-gray-600">
            Title
          </label>
          <input
            id="title"
            required
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={!!emptyClass}
            className={`${emptyClass} ${
              title && !isValidTitle(title) && "border-red-500"
            } mt-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 focus:outline-none focus:shadow-outline`}
          />
        </div>
        <div className={`${emptyClass} flex items-end justify-end`}>
          <button
            type="submit"
            disabled={!title || !latitude || !longitude}
            className="mb-0 w-full bg-blue-400 hover:bg-blue-500 text-white font-bold p-2 my-4 border border-blue-500 rounded disabled:opacity-50"
          >
            {updating ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default BusinessMapUpdate

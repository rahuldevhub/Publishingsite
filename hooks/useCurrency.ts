"use client"
import { useState, useEffect } from "react"

type Currency = "INR" | "USD"

export function useCurrency() {
  const [currency, setCurrency] = useState<Currency>("INR")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => {
        if (data.country_code !== "IN") {
          setCurrency("USD")
        }
      })
      .catch(() => {
        // Default to INR on error
        setCurrency("INR")
      })
      .finally(() => setLoading(false))
  }, [])

  return { currency, loading }
}

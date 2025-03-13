"use client";

import { useEffect, useState } from "react";

type History = {
  id: string
  date: string
  balance: string
  category: string
  category_detail: string
  payment_source: string
  deposit_destination: string
  item: string
  memo: string
  store: string
  currency: string
  income: number
  payment: number
  transfer: number
};

export default function Home() {
  const [histories, setHistories] = useState<History[]>([]);

  useEffect(() => {
    fetch("/api/get-history")
      .then((res) => res.json())
      .then((data) => setHistories(data))
    ;
  }, []);

  return (
    <div>
      <h1>履歴</h1>
      <ul>
        {histories.map((history) => (
          <li key={history.id}>{history.date} - {history.balance}</li>
        ))}
      </ul>
    </div>
  )
}
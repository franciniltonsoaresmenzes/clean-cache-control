export interface SavePurchases {
  save: (purchases: Array<PurchasesModel>) => Promise<void>
}

namespace SavePurchases {
  export type PurchasesModel = {
    id: string
    date: Date
    value: number
  }
}


import { PurchasesModel } from "@/domain/model"

export interface LoadPurchases {
  loadAll: () => Promise<LoadPurchases.Result[]>
}

export namespace LoadPurchases {
  export type Result = PurchasesModel
}


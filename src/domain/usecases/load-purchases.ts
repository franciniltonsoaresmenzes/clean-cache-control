import { PurchasesModel } from "@/domain/model"

export interface LoadPurchases {
  loadAll: () => Promise<ResultPurchases.Result>
}

export namespace ResultPurchases {
  export type Result = PurchasesModel
}


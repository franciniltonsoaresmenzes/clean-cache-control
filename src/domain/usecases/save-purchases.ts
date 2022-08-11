import { PurchasesModel } from "@/domain/model"

export interface SavePurchases {
  save: (purchases: Array<SavePurchases.Params>) => Promise<void>
}

export namespace SavePurchases {
  export type Params = PurchasesModel 
}


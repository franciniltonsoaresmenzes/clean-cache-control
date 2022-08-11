import { mockPurchases, CacheStoreSpy } from '@/data/test'
import { LocalLoadPurchases } from '@/data/usecases'


type SutTypes = {
  sut: LocalLoadPurchases
  cacheStore: CacheStoreSpy
}

const makeSut = (timestamp = new Date()): SutTypes => {
   const cacheStore = new CacheStoreSpy()
   const sut = new LocalLoadPurchases(cacheStore, timestamp)
   return {
     sut,
     cacheStore
   }
}


describe('LocalSavePurchases', () => {
 test('Should not delete or insert cache on sut.init', () => {

   const { cacheStore } = makeSut()
   expect(cacheStore.Actions).toEqual([])
 })
})


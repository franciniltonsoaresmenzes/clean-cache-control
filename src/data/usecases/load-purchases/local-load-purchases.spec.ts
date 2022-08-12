import { CacheStoreSpy } from '@/data/test'
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

 test('Should call correct key on load', async () => {

   const { cacheStore, sut } = makeSut()
   await sut.loadAll()
   expect(cacheStore.Actions).toEqual([CacheStoreSpy.Action.fetch])
   expect(cacheStore.fetchKey).toBe('purchases')
 })

 test('Should return empty list load fails', async () => {

   const { cacheStore, sut } = makeSut()
   cacheStore.simulateFetchError()
   const purchases = await sut.loadAll()
   expect(cacheStore.Actions).toEqual([CacheStoreSpy.Action.fetch, CacheStoreSpy.Action.delete])
   expect(cacheStore.deleteKey).toBe('purchases')
   expect(purchases).toEqual([])
 })
})


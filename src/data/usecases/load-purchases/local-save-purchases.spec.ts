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

 test('Should not insert new cache if delete fails', async () => {
   const { cacheStore, sut } = makeSut()
   cacheStore.simulateDeleteError()
   const promise = sut.save(mockPurchases())

   expect(cacheStore.Actions).toEqual([CacheStoreSpy.Action.delete])
   await expect(promise).rejects.toThrow()
 })

 test('Should insert new cache if delete succeeds', async () => {
   const timestamp = new Date()
   const { cacheStore, sut } = makeSut(timestamp)
   const purchases = mockPurchases()
   const promise = sut.save(purchases)

   expect(cacheStore.Actions).toEqual([CacheStoreSpy.Action.delete, CacheStoreSpy.Action.insert])
   expect(cacheStore.insertKey).toBe('purchases')
   expect(cacheStore.deleteKey).toBe('purchases')
   expect(cacheStore.insertValues).toEqual({
     timestamp,
     value: purchases
   })
   await expect(promise).resolves.toBeFalsy()
 })

 test('Should throw if insert throws', async () => {
   const { cacheStore, sut } = makeSut()
   cacheStore.simulateInsertError()
   const promise = sut.save(mockPurchases())

   expect(cacheStore.Actions).toEqual([CacheStoreSpy.Action.delete, CacheStoreSpy.Action.insert])
   await expect(promise).rejects.toThrow()
 })
})


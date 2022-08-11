import { mockPurchases, CacheStoreSpy } from '@/data/test'
import { LocalSavePurchases } from '@/data/usecases'


type SutTypes = {
  sut: LocalSavePurchases
  cacheStore: CacheStoreSpy
}

const makeSut = (): SutTypes => {
   const cacheStore = new CacheStoreSpy()
   const sut = new LocalSavePurchases(cacheStore)
   return {
     sut,
     cacheStore
   }
}


describe('LocalSavePurchases', () => {
 test('Should not delete or insert cache on sut.init', () => {

   const { cacheStore } = makeSut()
   expect(cacheStore.message).toEqual([])
 })

 test('Should delete old cache on sut.init', async () => {
   const { cacheStore, sut } = makeSut()
   await sut.save(mockPurchases())

   expect(cacheStore.message).toEqual([CacheStoreSpy.message.delete, CacheStoreSpy.message.insert])
   expect(cacheStore.deleteKey).toBe('purchases')
 })

 test('Should not insert new cache if delete fails', async () => {
   const { cacheStore, sut } = makeSut()
   cacheStore.simulateDeleteError()
   const promise = sut.save(mockPurchases())

   expect(cacheStore.message).toEqual([CacheStoreSpy.message.delete])
   await expect(promise).rejects.toThrow()
 })

 test('Should insert new cache if delete succeeds', async () => {
   const { cacheStore, sut } = makeSut()
   const purchases = mockPurchases()
   await sut.save(purchases)

   expect(cacheStore.message).toEqual([CacheStoreSpy.message.delete, CacheStoreSpy.message.insert])
   expect(cacheStore.insertKey).toBe('purchases')
   expect(cacheStore.insertValues).toEqual(purchases)
 })

 test('Should throw if insert throws', async () => {
   const { cacheStore, sut } = makeSut()
   cacheStore.simulateInsertError()
   const promise = sut.save(mockPurchases())

   expect(cacheStore.message).toEqual([CacheStoreSpy.message.delete, CacheStoreSpy.message.insert])
   await expect(promise).rejects.toThrow()
 })
})


import { CacheStoreSpy, mockPurchases } from '@/data/test'
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

 test('Should return empty list load fails', async () => {

   const { cacheStore, sut } = makeSut()
   cacheStore.simulateFetchError()
   const purchases = await sut.loadAll()
   expect(cacheStore.Actions).toEqual([CacheStoreSpy.Action.fetch, CacheStoreSpy.Action.delete])
   expect(purchases).toEqual([])
 })


 test('Should return an empty list if cache is empty', async () => {
   const currentDate = new Date()
   const timestamp = new Date(currentDate)
   timestamp.setDate(timestamp.getDate() - 3)
   timestamp.setSeconds(timestamp.getSeconds() + 1)
   const { cacheStore, sut } = makeSut(currentDate)
   cacheStore.fetchResult = {
     timestamp,
     value: [] 
   }
   const purchases = await sut.loadAll()
   expect(cacheStore.fetchKey).toBe('purchases')
   expect(cacheStore.Actions).toEqual([CacheStoreSpy.Action.fetch])
   expect(purchases).toEqual([])
 })

 test('Should return a list of purchases if cache is less than 3 days old', async () => {
   const currentDate = new Date()
   const timestamp = new Date(currentDate)
   timestamp.setDate(timestamp.getDate() - 3)
   timestamp.setSeconds(timestamp.getSeconds() + 1)
   const { cacheStore, sut } = makeSut(currentDate)
   cacheStore.fetchResult = {
     timestamp,
     value: mockPurchases()
   }
   const purchases = await sut.loadAll()
   expect(cacheStore.fetchKey).toBe('purchases')
   expect(cacheStore.Actions).toEqual([CacheStoreSpy.Action.fetch])
   expect(purchases).toEqual(cacheStore.fetchResult.value)
 })

 test('Should return a list of purchases if cache is more than 3 days old', async () => {
   const currentDate = new Date()
   const timestamp = new Date(currentDate)
   timestamp.setDate(timestamp.getDate() - 3)
   timestamp.setSeconds(timestamp.getSeconds() - 1)

   const { cacheStore, sut } = makeSut(currentDate)
   cacheStore.fetchResult = {
     timestamp,
     value: mockPurchases()
   }
   const purchases = await sut.loadAll()
   expect(cacheStore.fetchKey).toBe('purchases')
   expect(cacheStore.deleteKey).toBe('purchases')
   expect(cacheStore.Actions).toEqual([CacheStoreSpy.Action.fetch, CacheStoreSpy.Action.delete])
   expect(purchases).toEqual([])
 })
 
 test('Should return a list of purchases if cache is 3 days old', async () => {
   const currentDate = new Date()
   const timestamp = new Date(currentDate)
   timestamp.setDate(timestamp.getDate() - 3)

   const { cacheStore, sut } = makeSut(currentDate)
   cacheStore.fetchResult = {
     timestamp,
     value: mockPurchases()
   }
   const purchases = await sut.loadAll()
   expect(cacheStore.fetchKey).toBe('purchases')
   expect(cacheStore.deleteKey).toBe('purchases')
   expect(cacheStore.Actions).toEqual([CacheStoreSpy.Action.fetch, CacheStoreSpy.Action.delete])
   expect(purchases).toEqual([])
 })
})


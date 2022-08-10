class SavePurchases {
  constructor(private readonly cacheStore: CacheStore) {}

  async save(): Promise<void> {
    this.cacheStore.delete()
  }
}

interface CacheStore {
  delete:() => void

}

class CacheStoreSpy implements CacheStore {
  deleteCallsCount = 0

  delete(): void {
    this,this.deleteCallsCount++
  }

}



describe('LocalSavePurchases', () => {
 test('Should not delete cache on sut.init', () => {
   const cacheStore = new CacheStoreSpy()
   new SavePurchases(cacheStore)

   expect(cacheStore.deleteCallsCount).toBe(0)
 })

 test('Should delete old cache on sut.init', async () => {
   const cacheStore = new CacheStoreSpy()
   const sut = new SavePurchases(cacheStore)
   await sut.save()

   expect(cacheStore.deleteCallsCount).toBe(1)
 })
})


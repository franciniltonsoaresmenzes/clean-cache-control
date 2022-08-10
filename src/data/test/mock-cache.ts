import { CacheStore } from '@/data/protocols/cache/'
import { SavePurchases } from '@/domain/usecases'

export class CacheStoreSpy implements CacheStore {
  message: Array<CacheStoreSpy.message> = []
  deleteKey: string
  insertKey: string
  insertValues: Array<SavePurchases.Params> = []

  delete(key: string): void {
    this.deleteKey = key
    this.message.push(CacheStoreSpy.message.delete)
  }
  insert(key: string, value: any): void {
    this.insertKey = key
    this.insertValues = value
    this.message.push(CacheStoreSpy.message.insert)
  }
  simulateDeleteError(): void {
   jest.spyOn(CacheStoreSpy.prototype, 'delete').mockImplementationOnce( ()=> { 
    this.message.push(CacheStoreSpy.message.delete)
    throw new Error() 
   })
  }
  simulateInsertError(): void {
   jest.spyOn(CacheStoreSpy.prototype, 'insert').mockImplementationOnce( ()=> { 
    this.message.push(CacheStoreSpy.message.insert)
    throw new Error() 
   })
  }
}

export namespace CacheStoreSpy {
  export enum message {
    delete,
    insert
  }
}

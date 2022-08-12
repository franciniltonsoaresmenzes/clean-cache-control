import { CacheStore } from '@/data/protocols/cache/'
import { SavePurchases } from '@/domain/usecases'

export class CacheStoreSpy implements CacheStore {
  Actions: Array<CacheStoreSpy.Action> = []
  deleteKey: string
  insertKey: string
  fetchKey: string
  insertValues: Array<SavePurchases.Params> = []
  fetchResult: any 

  fetch(key: string): any {
    this.fetchKey = key
    this.Actions.push(CacheStoreSpy.Action.fetch)
    return this.fetchResult
  }
  delete(key: string): void {
    this.deleteKey = key
    this.Actions.push(CacheStoreSpy.Action.delete)
  }
  insert(key: string, value: any): void {
    this.insertKey = key
    this.insertValues = value
    this.Actions.push(CacheStoreSpy.Action.insert)
  }
  replace(key: string, value: any): void {
    this.delete(key)
    this.insert(key, value)
   }
  simulateDeleteError(): void {
   jest.spyOn(CacheStoreSpy.prototype, 'delete').mockImplementationOnce( ()=> { 
    this.Actions.push(CacheStoreSpy.Action.delete)
    throw new Error() 
   })
  }
  simulateInsertError(): void {
   jest.spyOn(CacheStoreSpy.prototype, 'insert').mockImplementationOnce( ()=> { 
    this.Actions.push(CacheStoreSpy.Action.insert)
    throw new Error() 
   })
  }
  simulateFetchError(): void {
   jest.spyOn(CacheStoreSpy.prototype, 'fetch').mockImplementationOnce( ()=> { 
    this.Actions.push(CacheStoreSpy.Action.fetch)
    throw new Error() 
   })
  }
}

export namespace CacheStoreSpy {
  export enum Action {
    delete,
    insert,
    fetch
  }
}

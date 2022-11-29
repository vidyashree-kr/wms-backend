export interface Inventories{
    inventory: Inventory[]
  }
  
  interface Inventory{
      art_id: string
      name: string
      stock: string
    }
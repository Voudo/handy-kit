import {
  addItem,
  addItemIfNotExists,
  addItems,
  findBy, removeFindBy, removeItemById, replaceItem, serializeObject, setAllItems, setItem, updateFind, updateFindBy, updateItem,
} from '../../src/utilities/dataHelpers'

describe('dataHelpers', () => {
  it('should find items in a list of items by passed in conditions', () => {
    const items = ['1', '12', '123']
    expect(findBy((item: any) => item.length > 2)(items)).toEqual('123')
  })

  describe('removeFindBy', () => {
    it('should remove items that match the given conditions', () => {
      const items = ['1', '12', '123']
      expect(removeFindBy(items, (item: any) => item.length < 2)).toEqual(['1'])
    })

    it('should return the existing items if a match is not found', () => {
      const items = ['1', '12', '123']
      expect(removeFindBy(items, (item: any) => item === 'a value that does not exist')).toEqual(items)
    })
  })

  describe('updateFindBy', () => {
    it('should update an item that matches the given conditions', () => {
      const items = [
        { id: '1', title: 'Title 1', age: 10 },
        { id: '12', title: 'Title 12', age: 20 },
        { id: '123', title: 'Title 123', age: 30 },
      ]

      const newItem = { id: '1', title: 'Updated title!' }

      expect(updateFindBy(newItem)(items, (item: any) => item.age === 10)).toEqual(
        [
          newItem,
          items[1],
          items[2],
        ],
      )
    })

    it('should return the existing list of items if a match is not found', () => {
      const items = [
        { id: '1', title: 'Title 1', age: 10 },
        { id: '12', title: 'Title 12', age: 20 },
        { id: '123', title: 'Title 123', age: 30 },
      ]

      const newItem = { id: '1', title: 'Updated title!' }

      expect(updateFindBy(newItem)(items, (item: any) => item.age === 40)).toEqual(items)
    })
  })

  describe('updateFind', () => {
    it('should update an item with the matching key', () => {
      const items = [
        { id: '1', title: 'Title 1' },
        { id: '12', title: 'Title 12' },
        { id: '123', title: 'Title 123' },
      ]

      const newItem = { id: '123', title: 'Updated title!' }

      expect(updateFind(newItem, 'id')(items)).toEqual([
        items[0],
        items[1],
        newItem,
      ])
    })

    it('should return the existing list of items if a match is not found', () => {
      const items = [
        { id: '1', title: 'Title 1' },
        { id: '12', title: 'Title 12' },
        { id: '123', title: 'Title 123' },
      ]

      const newItem = { id: '1234', title: 'Updated title!' }

      expect(updateFind(newItem, 'id')(items)).toEqual(items)
    })
  })

  it('should add an item to a list of items', () => {
    const items = {
      titles: [
        { id: '1', title: 'Title 1' },
        { id: '12', title: 'Title 12' },
        { id: '123', title: 'Title 123' },
      ],
    }

    const newItem = { id: '1234', title: 'Updated title!' }

    addItem(newItem)(items, 'titles')
    expect(items.titles).toEqual([
      { id: '1', title: 'Title 1' },
      { id: '12', title: 'Title 12' },
      { id: '123', title: 'Title 123' },
      newItem,
    ])
  })

  describe('addItemIfNotExists', () => {
    it('should add an item if it does NOT already exist', () => {
      const items = {
        titles: [
          { id: '1', title: 'Title 1' },
          { id: '12', title: 'Title 12' },
          { id: '123', title: 'Title 123' },
        ],
      }

      const newItem = { id: '1234', title: 'Updated title!' }

      addItemIfNotExists(newItem, (existingItem: any) => existingItem.id === newItem.id)(items, 'titles')
      expect(items).toEqual({
        titles: [
          { id: '1', title: 'Title 1' },
          { id: '12', title: 'Title 12' },
          { id: '123', title: 'Title 123' },
          newItem,
        ],
      })
    })

    it('should NOT add an item if it DOES already exist', () => {
      const items = {
        titles: [
          { id: '1', title: 'Title 1' },
          { id: '12', title: 'Title 12' },
          { id: '123', title: 'Title 123' },
        ],
      }

      const newItem = { id: '123', title: 'Updated title!' }

      addItemIfNotExists(newItem, (existingItem: any) => existingItem.id === newItem.id)(items, 'titles')
      expect(items).toEqual({
        titles: [
          { id: '1', title: 'Title 1' },
          { id: '12', title: 'Title 12' },
          { id: '123', title: 'Title 123' },
        ],
      })
    })
  })

  it('should add items to a list of items', () => {
    const itemState = {
      titles: [
        { id: '1', title: 'Title 1' },
        { id: '12', title: 'Title 12' },
        { id: '123', title: 'Title 123' },
      ],
    }

    const newItems = [
      { id: '1234', title: 'Title 1234' },
      { id: '12345', title: 'Title 12345' },
    ]

    addItems(newItems)(itemState, 'titles')
    expect(itemState).toEqual({
      titles: [
        { id: '1', title: 'Title 1' },
        { id: '12', title: 'Title 12' },
        { id: '123', title: 'Title 123' },
        { id: '1234', title: 'Title 1234' },
        { id: '12345', title: 'Title 12345' },
      ],
    })
  })

  it('should update an objects key value with a single value', () => {
    const itemState = {
      author: 'An authors name',
      titles: [
        { id: '1', title: 'Title 1' },
        { id: '12', title: 'Title 12' },
        { id: '123', title: 'Title 123' },
      ],
    }

    const newItem = 'New author'

    setItem(newItem)(itemState, 'author')

    expect(itemState).toEqual({
      author: 'New author',
      titles: itemState.titles,
    })
  })

  it('should update an objects key value with a list of values', () => {
    const itemState = {
      titles: [
        { id: '1', title: 'Title 1' },
        { id: '12', title: 'Title 12' },
        { id: '123', title: 'Title 123' },
      ],
    }

    const newItems = [
      { id: '1234', title: 'Title 1234' },
      { id: '12345', title: 'Title 12345' },
    ]

    setAllItems(newItems)(itemState, 'titles')

    expect(itemState.titles).toEqual(newItems)
  })

  it('should remove an item from a list of items by its ID', () => {
    const itemState = {
      titles: [
        { id: '1', title: 'Title 1' },
        { id: '12', title: 'Title 12' },
        { id: '123', title: 'Title 123' },
      ],
    }

    removeItemById('123')(itemState, 'titles')

    expect(itemState).toEqual({
      titles: [
        { id: '1', title: 'Title 1' },
        { id: '12', title: 'Title 12' },
      ],
    })
  })

  it('should an value in an object for a given key', () => {
    const itemState = {
      titles: [
        { id: '1', title: 'Title 1' },
        { id: '12', title: 'Title 12' },
        { id: '123', title: 'Title 123' },
      ],
    }

    const newItem = {
      id: '123',
      title: 'A new title!',
    }

    updateItem(newItem)(itemState, 'titles')

    expect(itemState.titles).toEqual([
      { id: '1', title: 'Title 1' },
      { id: '12', title: 'Title 12' },
      newItem,
    ])
  })

  it('should replace an item with the passed in value', () => {
    const itemState = {
      titles: [
        { id: '1', title: 'Title 1' },
        { id: '12', title: 'Title 12' },
        { id: '123', title: 'Title 123' },
      ],
    }

    const initialState = { titles: [] }

    replaceItem(initialState)(itemState)

    expect(itemState).toEqual({
      titles: [],
    })
  })

  describe('serializeObject', () => {
    it('should update all key/values with new values', () => {
      const objectToMerge = {
        a: 'new text a',
        b: 'new text b',
        nested: {
          c: 'next text c',
        },
      }
      const existingObject = {
        a: 'old',
        b: 'old',
        nested: {
          c: 'old',
        },
      }

      expect(serializeObject(objectToMerge, existingObject)).toEqual(objectToMerge)
    })

    it('should not add a key/value that is not in the existing object', () => {
      const objectToMerge = { a: 'new text a', b: 'new text b', c: 'new text c' }
      const existingObject = { a: 'old', b: 'old' }

      const mergedObject = serializeObject(objectToMerge, existingObject)

      expect(mergedObject.c).toBeUndefined()
    })
  })
})

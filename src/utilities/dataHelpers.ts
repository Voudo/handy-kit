import {
  assign, keys, includes, reduce, set,
} from 'lodash'
import {
  assoc, findIndex, insert, propEq, update,
} from 'ramda'

export const findBy = (conditions: any) => (items: any[]) => items.find(conditions)

export const removeFindBy = (items: any[], conditions: any) => {
  const indexForExistingItem = findIndex(conditions)(items)

  return indexForExistingItem >= 0
    ? items.splice(indexForExistingItem, 1)
    : items
}

export const updateFindBy = (newItem: any) => (items: any[], conditions: any) => {
  const indexForExistingItem = findIndex(conditions)(items)

  return indexForExistingItem >= 0
    ? update(indexForExistingItem, newItem, items)
    : items
}

export const updateFind = (newItem: any, newItemKey = 'id') => (items: any[]) => {
  const indexForExistingItem = findIndex(
    (item: any) => item[newItemKey] === newItem[newItemKey],
  )(items)

  return indexForExistingItem >= 0
    ? update(indexForExistingItem, newItem, items)
    : items
}

export const addItem = (item: any) => (items: any, key: string): void => {
  set(items, key, insert(items[key].length, item, items[key]))
}

export const addItemIfNotExists = (newItem: any, conditions: any) => (items: { [key: string]: any }, key: string): void => {
  const foundItem = findBy(conditions)(items[key])

  !foundItem && set(items, key, insert(items[key].length, newItem, items[key]))
}

export const addItems = (newItems: any) => (items: { [key: string]: any }, key: string): void => {
  set(items, key, [...items[key], ...newItems])
}

export const setItem = (item: any) => (items: { [key: string]: any }, key: string): void => {
  set(items, key, item)
}

export const setAllItems = (newItems: any[]) => (items: { [key: string]: any }, key: string): void => {
  set(items, key, newItems)
}

export const removeItemById = (itemId: string) => (items: { [key: string]: any }, key: string): void => {
  const itemIndex = findIndex(
    (item: any) => item.id === itemId,
  )(items[key])

  itemIndex >= 0 && items[key].splice(itemIndex, 1)
}

export const updateItem = (item: any) => (items: { [key: string]: any }, key: string): void => {
  const updated = updateFind(item)(items[key])

  set(items, key, updated)
}

export const updateItems = (newItems: any[]) => (existingItems: { [key: string]: any }, key: string): void => {
  newItems.forEach((item) => {
    updateItem(item)(existingItems, key)
  })
}

export const replaceItem = (item: any) => (items: { [key: string]: any }) => {
  assign(items, item)
}

export const serializeObject = (objectToMerge: any, existingObject: any) => {
  const filteredObject = (filteredValues: any, value: any, key: string) => (
    includes(keys(existingObject), key)
      ? assoc(key, value, filteredValues)
      : filteredValues
  )

  const onlyValidObjectKeyValues = reduce(
    objectToMerge,
    filteredObject,
    {},
  )

  return onlyValidObjectKeyValues
}

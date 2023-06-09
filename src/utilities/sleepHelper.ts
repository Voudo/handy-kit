const sleep = async (milliseconds: number, result?: any): Promise<void | any> => new Promise((resolve) => {
  setTimeout(() => resolve(result), milliseconds)
})

export default sleep

export const AsyncQueue = () => {
  let promise: Promise<any> = Promise.resolve()
  return <T>(asyncFunction: () => T): Promise<T> =>
    (promise = promise.then(
      () => asyncFunction(),
      error => {
        promise = Promise.resolve()
        throw error
      },
    ))
}

export const getData = (data, query, pagination = false) => {
  if (!data) {
    return
  }

  if (pagination) {
    const {
      [query]: { docs: result },
    } = data

    return result
  }

  const result = data[query]

  return result
}

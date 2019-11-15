export default async resolve => {
  const value = await resolve()

  return value.toString().toUpperCase()
}

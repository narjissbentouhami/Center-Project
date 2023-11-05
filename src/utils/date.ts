// formate from time format to readable format
export const formatTime = (time: any) => {
  const date = new Date(time)
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} à ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

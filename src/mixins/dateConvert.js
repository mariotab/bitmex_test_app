export const dateConvert = {
  methods: {
    dateConvert: date => {
      const myDate = new Date(date)
      return `${myDate.getFullYear()}-${myDate.getMonth() < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1}-${myDate.getDate()} ${myDate.getHours()}:${myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes()}`
    }
  }
}

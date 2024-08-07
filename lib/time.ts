import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import weekday from 'dayjs/plugin/weekday'

export const formatToRelativeTime = (date: string | number | Date) => {
    dayjs.extend(relativeTime)
    dayjs.extend(weekday)

    const now = dayjs()
    let dayjsDate = dayjs(date)

    //this assumes that the date is in unix milliseconds
    if (typeof date === 'number') {
        dayjsDate = dayjs.unix(date)
    }

    // Check if the date is the same day
    if (dayjsDate.isSame(now, 'day')) {
        return dayjsDate.fromNow()
    }

    // Check if the date is within the last 7 days
    if (dayjsDate.isAfter(now.subtract(7, 'days'))) {
        return dayjsDate.format('dddd') // Returns the day of the week
    }

    // For dates more than 7 days ago, return the date in "MMM DD, YYYY" format
    return dayjsDate.format('MMM DD, YYYY')
}

export const formatToTime = (date: string | number | Date) => {
    dayjs.extend(relativeTime)
    dayjs.extend(weekday)

    if (!date) {
        return ''
    }

    const dayjsDate = dayjs(date)
    return dayjsDate.format('h:mm A')
}

export const formatToMonthDay = (date: string | number | Date) => {
    dayjs.extend(relativeTime)
    dayjs.extend(weekday)
    let dayjsDate = dayjs(date)

    if (!date) {
        return ''
    }

    // convert to integer
    if (typeof date === 'string') {
        dayjsDate = dayjs(parseInt(date))
    }

    //this assumes that the date is in unix milliseconds
    if (typeof date === 'number') {
        dayjsDate = dayjs.unix(date)
    }

    return dayjsDate.format('MMM DD')
}

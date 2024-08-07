import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatTwilioChannelName(
    input: string | null,
    userId: number,
): number | null {
    if (!input) return null
    const parts = input.split('_')

    if (parts.length < 3) {
        return null
    }

    const part1 = parseInt(parts[1], 10)
    const part2 = parseInt(parts[2], 10)

    if (isNaN(part1) || isNaN(part2)) {
        console.error('Invalid channel name', input)
        return null
    }

    if (part1 === userId) {
        return part2
    }

    return part1
}

export const getPrivatePhoneNumber = (phoneNumber: string) => {
    let formattedPhoneNum = ''
    const phoneNumberLength = phoneNumber.length
    const firstFourDigits = phoneNumber.substring(0, 6)
    const lastTwoDigits = phoneNumber.substring(
        phoneNumber.length - 2,
        phoneNumber.length,
    )

    formattedPhoneNum = firstFourDigits
    let x: number = 0
    for (x = 0; x <= phoneNumberLength - 9; x++) {
        formattedPhoneNum += '*'
    }

    formattedPhoneNum += lastTwoDigits

    return formattedPhoneNum
}

export const trimExtraSpaces = (value: string) => {
    return value.replace(/\s+/g, ' ').trim()
}

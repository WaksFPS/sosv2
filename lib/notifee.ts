import notifee from '@notifee/react-native'

interface Notification {
    title: string
    body: string
}

export const defaultNotification = async (props: Notification) => {
    await notifee.displayNotification({
        title: props.title,
        body: props.body,
        android: {
            channelId: 'default',
        },
    })
}

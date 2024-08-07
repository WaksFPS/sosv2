const { withAndroidManifest, AndroidConfig } = require('@expo/config-plugins')

const { getMainApplicationOrThrow } = AndroidConfig.Manifest

module.exports = function withAndroidRNCallKeep(config) {
    return withAndroidManifest(config, async (config) => {
        const mainApplication = getMainApplicationOrThrow(config.modResults)

        // Add service
        mainApplication['service'] = mainApplication['service'] || []
        mainApplication['service'].push({
            $: {
                'android:name': 'io.wazo.callkeep.VoiceConnectionService',
                'android:permission':
                    'android.permission.BIND_TELECOM_CONNECTION_SERVICE',
                'android:foregroundServiceType': 'camera|microphone|phoneCall',
                'android:exported': 'false',
            },
            'intent-filter': [
                {
                    action: [
                        {
                            $: {
                                'android:name':
                                    'android.telecom.ConnectionService',
                            },
                        },
                    ],
                },
            ],
        })

        return config
    })
}

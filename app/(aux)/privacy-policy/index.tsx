import { WebView } from 'react-native-webview'

export const PrivacyPolicy = () => {
    return (
        <WebView
            source={{
                uri: 'https://app.termly.io/policy-viewer/policy.html?policyUUID=22a56335-00f5-46f9-95de-3b86cd1f1990',
            }}
        />
    )
}

export default PrivacyPolicy

import { WebView } from 'react-native-webview'

export const TermsAndCondition = () => {
    return (
        <WebView
            source={{
                uri: 'https://app.termly.io/document/terms-of-service/c5d79f92-1d5d-4c6d-a204-97d45b515570',
            }}
        />
    )
}

export default TermsAndCondition

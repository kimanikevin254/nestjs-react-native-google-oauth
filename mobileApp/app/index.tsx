import { useUserStore } from '@/store/user'
import { Redirect } from 'expo-router'

export default function Index() {
    const accessToken = useUserStore(state => state.accessToken)

    if(!accessToken) { return <Redirect href='/(auth)' /> }

    if(accessToken) { return <Redirect href='/(app)' /> }
}
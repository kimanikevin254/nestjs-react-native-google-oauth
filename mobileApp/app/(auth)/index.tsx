import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useUserStore } from '@/store/user';
import { useShallow } from 'zustand/react/shallow'
import { useRouter } from 'expo-router';

const redirectTo = AuthSession.makeRedirectUri()

export default function SignIn() {
  const navigation = useRouter()

  const setAccessToken = useUserStore((state) => state.setAccessToken)

  const handleLogin = async () => {
    try {
      const res = await WebBrowser.openAuthSessionAsync(
        'https://nestjs-react-native-google-oauth.onrender.com/api/auth/google/login',
        redirectTo
      )
      console.log(res);
      if(res.type === 'success'){
        // Extract the token from the URL
        const url = res.url
        const accessTokenMatch = url.match(/access_token=([^&]*)/)
        const access = accessTokenMatch ? accessTokenMatch[1] : null

        if(access){
          setAccessToken(access)
          navigation.replace('/(app)')
        }
      }
    } catch (error) {
      ToastAndroid.show('Something went wrong', ToastAndroid.LONG)
    }
  }

  return (
    <SafeAreaView
     style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
     }}
    >
      <TouchableOpacity
        onPress={() => handleLogin()}
        style={{
          paddingHorizontal: 18,
          paddingVertical: 8,
          backgroundColor: 'blue'
        }}
      >
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold'
          }}
        >Sign in with Google</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
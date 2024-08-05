import { View, Text, ToastAndroid, ActivityIndicator, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState, useCallback, Dispatch, SetStateAction } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useUserStore } from '@/store/user';
import { useShallow } from 'zustand/react/shallow';
import { useRouter } from 'expo-router';

const fetchUserData = async (
  accessToken: string, 
  setUser: any,
  setIsUserLoading: Dispatch<SetStateAction<boolean>>
): Promise<void> => {
  try {
    setIsUserLoading(true);
    const { data } = await axios.get('https://nestjs-react-native-google-oauth.onrender.com/api/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    setUser(data);
  } catch (error) {
    ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
  } finally {
    setIsUserLoading(false);
  }
};

export default function Home() {
  const [isUserLoading, setIsUserLoading] = useState(false);

  const navigation = useRouter()

  const { accessToken, user, setUser, logout } = useUserStore(
    useShallow(state => ({
      accessToken: state.accessToken,
      user: state.user,
      setUser: state.setUser,
      logout: state.logout
    }))
  );

  const handleLogout = () => {
    logout()
    navigation.replace('/(auth)')
  }

  const loadUserData = useCallback(() => {
    if (accessToken && !user) {
      fetchUserData(accessToken, setUser, setIsUserLoading);
    }
  }, [accessToken, user, setUser]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {isUserLoading ? (
          <ActivityIndicator />
        ) : (
          user && (
            <View style={styles.userContainer}>
              <Image source={{ uri: user?.picture }} style={styles.profileImage} />
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
              <Text style={styles.userJoinedDate}>Date joined: {new Date(user?.createdAt).toDateString()}</Text>
              <TouchableOpacity onPress={() => handleLogout()} style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Log out</Text>
              </TouchableOpacity>
            </View>
          )
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  userContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    objectFit: 'cover'
  },
  userName: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  },
  userEmail: {
    textAlign: 'center'
  },
  userJoinedDate: {
    textAlign: 'center'
  },
  logoutButton: {
    backgroundColor: 'red',
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginTop: 20
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

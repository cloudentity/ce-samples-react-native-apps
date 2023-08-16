import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import Container from './components/Container';
import {RootNavigationStack} from './navigation';
import axios from 'axios';
import Keychain from 'react-native-keychain';
import Snackbar from 'react-native-snackbar';

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 20,
  },
  url: {
    marginBottom: 20,
    color: '#646F75',
  },
  error: {
    color: '#8E3A59',
  },
});

function ResourceDetailsScreen() {
  const route = useRoute<RouteProp<RootNavigationStack>>();
  const resource = route.params?.resource;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function fetchData() {
    const credentials = await Keychain.getGenericPassword();
    if (resource && credentials && credentials.password) {
      axios
        .get(resource.url, {
          headers: {
            authorization: `Bearer ${credentials}`,
          },
        })
        .then(response => {
          setData(response.data);
        })
        .catch(err => {
          const errorMessage = err.message ?? 'Failed to fetch resource';
          setError(errorMessage);
          Snackbar.show({
            text: errorMessage,
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#8E3A59',
            textColor: 'white',
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.content}>
          <Text style={styles.url}>{resource?.url}</Text>
          {error && <Text style={styles.error}>{error}</Text>}
          {data && <Text>{JSON.stringify(data, null, 2)}</Text>}
        </View>
      )}
    </Container>
  );
}

export default ResourceDetailsScreen;

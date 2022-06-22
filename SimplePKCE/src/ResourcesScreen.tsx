import axios from 'axios';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Button from './components/Button';
import Container from './components/Container';

const styles = StyleSheet.create({
  item: {
    marginBottom: 16,
  },
});

const resources = [
  {
    scope: 'openid',
    title: 'Transfer',
    // url: 'http://localhost:8080/banking/transfer',
    url: 'https://gorest.co.in/public/v2/users/2906',
  },
  {
    scope: 'email',
    title: 'Balance',
    url: 'http://localhost:8080/banking/balance',
  },
  {
    scope: 'profile',
    title: 'Profile',
    url: 'http://localhost:8080/pets/pet/1',
  },
  {
    scope: 'phone',
    title: 'Phone',
    url: 'http://localhost:8080/pets/pet/2',
  },
];

function ResourcesScreen({scopes}: {scopes: string[]}) {
  const filteredResources = resources.filter(resource =>
    scopes.includes(resource.scope),
  );

  async function handlePress(resource: typeof resources[0]) {
    const response = await axios.get(resource.url);
    console.log(response.data);
  }

  return (
    <Container>
      {filteredResources.map(resource => (
        <View style={styles.item} key={resource.scope}>
          <Button
            onPress={() => handlePress(resource)}
            label={resource.title}
          />
        </View>
      ))}
    </Container>
  );
}

export default ResourcesScreen;

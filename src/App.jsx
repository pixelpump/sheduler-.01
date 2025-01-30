import React, { useState, useEffect } from 'react';
import { Button, Box, Heading, List, ListItem, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, useDisclosure } from '@chakra-ui/react';
import { fetchProperties, fetchUsers, fetchCrews, addProperty, addUser, addCrew } from './api';

function App() {
  const [role, setRole] = useState(null);
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [crews, setCrews] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newProperty, setNewProperty] = useState('');

  useEffect(() => {
    if (role === 'Operations Manager') {
      fetchProperties().then(setProperties);
      fetchUsers().then(setUsers);
      fetchCrews().then(setCrews);
    }
  }, [role]);

  const handleLogin = (role) => {
    setRole(role);
  };

  const handleAddProperty = async () => {
    await addProperty({ name: newProperty });
    setProperties(await fetchProperties());
    setNewProperty('');
    onClose();
  };

  return (
    <Box p={4}>
      {!role ? (
        <Box textAlign="center">
          <Heading mb={4}>Login</Heading>
          <Button colorScheme="teal" onClick={() => handleLogin('Operations Manager')} m={2}>Operations Manager</Button>
          <Button colorScheme="teal" onClick={() => handleLogin('Supervisor')} m={2}>Supervisor</Button>
          <Button colorScheme="teal" onClick={() => handleLogin('Gardener')} m={2}>Gardener</Button>
        </Box>
      ) : (
        <Box>
          <Heading mb={4}>{role} Scheduler</Heading>
          {role === 'Operations Manager' && (
            <Box>
              <Heading size="md" mt={4}>Properties</Heading>
              <Button colorScheme="teal" onClick={onOpen} mb={4}>Add Property</Button>
              <List spacing={3}>
                {properties.map(p => <ListItem key={p._id}>{p.name}</ListItem>)}
              </List>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Add New Property</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <FormControl>
                      <FormLabel>Property Name</FormLabel>
                      <Input value={newProperty} onChange={(e) => setNewProperty(e.target.value)} />
                    </FormControl>
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleAddProperty}>
                      Save
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <Heading size="md" mt={4}>Users</Heading>
              <List spacing={3}>
                {users.map(u => <ListItem key={u._id}>{u.name} ({u.role})</ListItem>)}
              </List>
              <Heading size="md" mt={4}>Crews</Heading>
              <List spacing={3}>
                {crews.map(c => <ListItem key={c._id}>{c.supervisor} with {c.gardeners.join(', ')}</ListItem>)}
              </List>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default App;

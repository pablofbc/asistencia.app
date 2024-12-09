import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { useCameraPermissions } from "expo-camera";
import { View, Text, SafeAreaView, Pressable, TouchableOpacity, Alert, TextInput, StatusBar, Platform } from "react-native";
import { Icon } from 'react-native-paper';


export default function App() {
    const [data, setData] = useState({});
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [permission, requestPermission] = useCameraPermissions();
    const isPermissionGranted = Boolean(permission?.granted);

    // Guardar datos en AsyncStorage
  const saveData = async () => {
    try {
      const data = { id, name };
      await AsyncStorage.setItem('userData', JSON.stringify(data));
      Alert.alert('¡Éxito!', 'Los datos se han guardado correctamente.');
    } catch (error) {
      Alert.alert('Error', 'No se pudieron guardar los datos.');
    }
  };

  // Recuperar datos de AsyncStorage
  const loadData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('userData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setId(parsedData.id);
        setName(parsedData.name);
        Alert.alert('Datos cargados', `DNI: ${parsedData.id}, Nombre: ${parsedData.name}`);
      } else {
        Alert.alert('Sin datos', 'No hay datos guardados.');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los datos.');
    }
  };

  return (
    <SafeAreaView className='h-full bg-[#828aa1] '>
    <View >
      <StatusBar className={Platform.OS=='android' ? "bg-[#828aa1] text-light": "bg-[#B4CEED] text-dark"} />
      <View className='flex-row justify-center bg-[#4b68b0] items-center py-4 m-4 rounded-xl'>
        <Icon
              source="account"
              size={25} color="#f8f4ef"
            />
        <Text className='text-[#f8f4ef] font-semibold text-2xl'>CUENTA</Text>
      </View>
      <View className='bg-[#828aa1] flex-row justify-center p-4 gap-10'>
        <Text className='text-2xl font-bold text-[#f8f4ef] mt-3' >DNI:</Text>
        <TextInput
          className='bg-[#f8f4ef] border-2 border-black rounded-lg h-12'
          value={id}
          onChangeText={setId}
          placeholder="Introduce el DNI"
        />
      </View>
      <View className='bg-[#828aa1] flex-row justify-center p-4 gap-10'>
        <Text className='text-2xl font-bold text-[#f8f4ef] mt-3'>Nombre:</Text>
        <TextInput
          className='bg-[#f8f4ef] border-2 border-black rounded-lg h-12'
          value={name}
          onChangeText={setName}
          placeholder="Introduce el nombre"
        />
      </View>
      <View className='items-center bg-[#828aa1] py-4'>
        {/* <TouchableOpacity className='bg-[#4b68b0] w-44 h-12 rounded-md justify-center border-2 border-[#f8f4ef]' onPress={saveData}>
          <Text className='text-[#f8f4ef] text-xl text-center'>Guardar</Text>
        </TouchableOpacity> */}
        <TouchableOpacity className='flex-row justify-center pt-1.5 bg-[#4b68b0] w-44 h-12 rounded-md border-2 border-[#f8f4ef]' onPress={saveData}>
          <Icon
              source="content-save"
              size={25} color="#f8f4ef"
            />
          <Text className="text-[#f8f4ef] text-xl text-center ml-2">Guardar</Text>
        </TouchableOpacity>
      </View>
      <View className='items-center bg-[#828aa1] py-4'>
        {/* <TouchableOpacity className='bg-[#4b68b0] w-44 h-12 rounded-md justify-center border-2 border-[#f8f4ef]' onPress={loadData}>
          <Text className='text-[#f8f4ef] text-xl text-center'>Mostrar</Text>
        </TouchableOpacity> */}
        <TouchableOpacity className='flex-row justify-center pt-1.5 bg-[#4b68b0] w-44 h-12 rounded-md border-2 border-[#f8f4ef]' onPress={loadData}>
          <Icon
              source="file-document-edit-outline"
              size={25} color="#f8f4ef"
            />
          <Text className="text-[#f8f4ef] text-xl text-center ml-2">Mostrar</Text>
        </TouchableOpacity>
      </View>
      <View className='flex-row justify-center bg-[#4b68b0] items-center py-4 m-4 rounded-xl'>
        <Icon
              source="cog"
              size={25} color="#f8f4ef"
            />
        <Text className='text-[#f8f4ef] font-semibold text-2xl'>CONFIGURACION</Text>
      </View>
      <View className='items-center bg-[#828aa1] py-4'>
        {/* <TouchableOpacity className='bg-[#4b68b0] w-56 h-12 rounded-md justify-center border-2 border-[#f8f4ef]' onPress={requestPermission}>
          <Text className='text-[#f8f4ef] text-xl text-center'>Permiso uso Camara</Text>
        </TouchableOpacity> */}
        <TouchableOpacity className='flex-row justify-center pt-1.5 bg-[#4b68b0] w-64 h-12 rounded-md border-2 border-[#f8f4ef]' onPress={requestPermission}>
          <Icon
              source="camera"
              size={25} color="#f8f4ef"
            />
          <Text className="text-[#f8f4ef] text-xl text-center ml-2">Permiso uso Camara</Text>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
}
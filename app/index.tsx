import { View, Text, SafeAreaView, Pressable, TouchableOpacity, Alert, StatusBar, Image, Platform } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
//import { useCameraPermissions } from "expo-camera";
import { fetchSheetData, updateSheet, readCell} from '../app/utils/googleSheetUtils';
import React, { useEffect, useState } from "react";
//import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  //const [permission, requestPermission] = useCameraPermissions();

  //const isPermissionGranted = Boolean(permission?.granted);

   // Parámetros de la ruta para recibir el QR
   const { scannedData } = useLocalSearchParams();
   const [qrCodeData, setQrCodeData] = useState<string | null>(null);
   const [qrData, setQrData] = useState<Record<string, string | boolean> | null>(null); 
   const [cellValue, setCellValue] = useState<string | null>(null); 

     // Función para obtener fecha y hora actual en formato DD/MM/YYYY
    const getCurrentDateTime = () => {
    const now = new Date();
    const date = `${String(now.getDate()).padStart(2, "0")}/${String(
      now.getMonth() + 1
    ).padStart(2, "0")}/${now.getFullYear()}`; // DD/MM/YYYY
    const time = now.toTimeString().split(" ")[0]; // HH:MM:SS
    return { date, hour: time };
    };
 
   useEffect(() => {
    // Almacenar el QR recibido
    if (scannedData) {
      if (typeof scannedData === 'string') {
        setQrCodeData(scannedData);
      } else if (Array.isArray(scannedData) && scannedData.length > 0) {
        setQrCodeData(scannedData[0]);
      } else {
        setQrCodeData(null); // O maneja el caso de array vacío como prefieras
      }
    }
  }, [scannedData]);

  useEffect(() => {
    const fetchData = async () => {
      const value = await readCell("config", "A1");
      setCellValue(value);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (scannedData) {
      try {
        const parsedData = JSON.parse(scannedData as string); // Parsear JSON
        const { date, hour } = getCurrentDateTime();

        // Completar con fecha y hora actuales
        const enrichedData = {
          ...parsedData,
          date: parsedData.date || date,
          hour: parsedData.hour || hour,
        };

        setQrData(enrichedData);
      } catch (error) {
        console.error("Error al parsear JSON:", error);
      }
    }
  }, [scannedData]);

  const renderTable = () => {
    if (!qrData) return null;

    return (
      <View className="mt-4 px-4">
        <Text className="text-lg font-bold text-[#4b68b0] mb-4">Datos Escaneados</Text>
        <View className="bg-white shadow rounded-md">
          {/* Encabezados */}
          <View className="flex-row bg-[#4b68b0] py-2 px-4">
            <Text className="flex-1 font-semibold text-[#f8f4ef]">Campo</Text>
            <Text className="flex-1 font-semibold text-[#f8f4ef]">Valor</Text>
          </View>
          {/* Filas */}
          {Object.entries(qrData).map(([key, value], index) => (
            <View
              key={index}
              className={`flex-row py-2 px-4 ${index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}`}
            >
              <Text className="flex-1 text-gray-800">{key}</Text>
              <Text className="flex-1 text-gray-800">{String(value)}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const logst = () => {
    //console.log(permission);
    //console.log(isPermissionGranted);
    console.log("Config: ", cellValue);
  };

  return (
    <SafeAreaView className='flex-1 h-full bg-[#828aa1]'>   
    <StatusBar className={Platform.OS=='android' ? "bg-[#828aa1] text-light": "bg-[#B4CEED] text-dark"} /> 
     <View className='bg-[#4b68b0] items-center py-4 m-4 rounded-xl'>       
         <Text className='text-[#f8f4ef] font-semibold text-2xl'>
           ASISTENCIA
         </Text>            
     </View>
     {/* <View className='bg-slate-500 items-center'>
       <TouchableOpacity className='bg-blue-200 px-3 py-1 rounded-full' onPress={requestPermission}>
         <Text className='text-blue-800 font-semibold text-2xl'>Request Permissions</Text>
       </TouchableOpacity>
       <Link href={"/scanner"} asChild>
           <Pressable disabled={!isPermissionGranted} className='bg-blue-200 px-3 py-1 rounded-full mt-10'>
             <Text className='text-blue-800 font-semibold text-2xl'>
               Scan Code
             </Text>
           </Pressable>
        </Link>
     </View> */}
     {/* <View className='bg-blue-500 items-center'>
      <TouchableOpacity className='bg-blue-200 px-3 py-1 rounded-full' onPress={logst}>
         <Text className='text-blue-800 font-semibold text-2xl'>logs</Text>
       </TouchableOpacity>
     </View> */}
     <View className='flex-1 bg-[#f8f4ef] m-4 rounded-lg'>
        {/* <Link href={"/login"} asChild>
           <Pressable className='bg-blue-200 px-3 py-1 rounded-full mt-4 mb-4'>
             <Text className='text-blue-800 font-semibold text-2xl'>
               Login
             </Text>
           </Pressable>
        </Link> */}
        {/* {qrCodeData && (
        <View className="items-center">
          <Text className="text-green-800 font-semibold text-lg">
            QR Escaneado: {qrCodeData}
          </Text>
        </View>
        )} */}
        {renderTable()}
      </View>
      <View className=' bg-[#828aa1] items-center py-4'>
        <Link href={"/scanner"} asChild>
          <TouchableOpacity className="bg-[#4b68b0] border-2 rounded-full border-[#f8f4ef] p-4 " >
            <Image className="bg-[#4b68b0] w-20 h-20" 
              source={require("../app/assets/qrscan_white.png")} />
          </TouchableOpacity>
        </Link>
      </View>     
      <View className='flex-row justify-center gap-10  bg-[#828aa1] px-3 py-1 mb-4'>
      <Link href={"/login"} asChild>
        <TouchableOpacity className='bg-[#4b68b0] w-44 h-12 rounded-md justify-center border-2 border-[#f8f4ef]'>
          <Text className="text-[#f8f4ef] text-xl text-center">Login</Text>
        </TouchableOpacity> 
      </Link>
        <TouchableOpacity className='bg-[#4b68b0] w-44 h-12 rounded-md justify-center border-2 border-[#f8f4ef]'>
          <Text className="text-[#f8f4ef] text-xl text-center">Consulta</Text>
        </TouchableOpacity>
      </View>
   </SafeAreaView>
  );
}


import { View, Text, StyleSheet, SafeAreaView, Pressable, TouchableOpacity } from "react-native";
import { Link, Stack } from "expo-router";
import { useCameraPermissions } from "expo-camera";

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();

  const isPermissionGranted = Boolean(permission?.granted);

  const logst = () => {
    console.log(permission);
    console.log(isPermissionGranted);
  };

  return (
    <SafeAreaView className='h-full bg-[#B4CEED] '>      
     <View className='pt-12 items-center'>
       <View className='bg-blue-200 px-3 py-1 rounded-full'>
         <Text className='text-blue-800 font-semibold text-2xl'>
           Asistencia
         </Text>
       </View>      
     </View>
     <View className='pt-12 items-center'>
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
     </View>
     <View className='pt-12 items-center'>
     <TouchableOpacity className='bg-blue-200 px-3 py-1 rounded-full' onPress={logst}>
         <Text className='text-blue-800 font-semibold text-2xl'>logs</Text>
       </TouchableOpacity>
     </View>
   </SafeAreaView>
  );
}


import { View, Text, ScrollView, Image, Alert } from "react-native";
import { images } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUserAuth, getAccount } from "../../lib/appwrite";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    pass: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (!form.username || !form.pass || !form.email)
        Alert.alert("Error", "Completa todos los campos");
      await createUserAuth(form);
      const resp = await getAccount();
      console.log("resp", resp?.community);
      if (!resp.community) {
        router.replace("/selectCommunity");
      } else {
        router.replace("/home");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <Image
            source={images.logo_home}
            resizeMode="cover"
            className="w-[350px] h-[42px] p-0 m-0 -left-4"
          />
          <Text className="text-sm text-white text-semibold mt-4 font-psemibold">
            Completa los siguientes campos registrarte
          </Text>
          <FormField
            title="Nombre de usuario"
            placeholder="Hasbulla"
            value={form?.username}
            handleChangeText={(e) =>
              setForm((prev) => ({ ...prev, username: e }))
            }
            otherStyles="mt-7"
          />
          <FormField
            title="Email"
            placeholder="John@doe.cl"
            value={form?.email}
            handleChangeText={(e) => setForm((prev) => ({ ...prev, email: e }))}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Contraseña"
            placeholder="*****"
            value={form?.pass}
            handleChangeText={(e) => setForm((prev) => ({ ...prev, pass: e }))}
            otherStyles="mt-7"
            keyboardType="password"
          />
          <CustomButton
            title="Registrarme"
            handlePress={handleSubmit}
            containerStyles="mt-7"
            isLoading={isLoading}
          />
          <View className="pt-5 justify-center flex-row gap-2">
            <Text className="text-sm text-gray-100 font-pregular">
              Ya tienes una cuenta?
            </Text>
            <Link
              className="text-md font-psemibold text-secondary-100"
              href="/sign-in"
            >
              Ingresa aquí
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;


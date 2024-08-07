import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton } from '@/components/shared/back-button';
import { Button } from '@/components/shared/button';
import { Input } from '@/components/shared/input';
import TextScalable from '@/components/shared/text-scale';
import { updateUserFieldApi } from '@/services/endpoints/user';
import { MyLocationType, myLocationSchema } from '@/services/endpoints/user/schema';
import { authAtom } from '@/store/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { router, Stack } from 'expo-router';
import { useAtomValue } from 'jotai';
import { useCountries, useStates, useCities, useLocationByPostalCode } from '@/services/external/useLocationData';
import { Picker } from '@react-native-picker/picker';

const MyLocation = () => {
    const auth = useAtomValue(authAtom);
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedState, setSelectedState] = useState<string>('');
    const [postalCode, setPostalCode] = useState<string>('');

    const { data: countries, isLoading: isLoadingCountries } = useCountries();
    const { data: states, isLoading: isLoadingStates } = useStates(selectedCountry);
    const { data: cities, isLoading: isLoadingCities } = useCities(selectedState);
    const { data: locationData } = useLocationByPostalCode(postalCode);

    const myLocationForm = useForm<MyLocationType>({
        mode: 'all',
        resolver: zodResolver(myLocationSchema),
    });

    useEffect(() => {
        if (locationData) {
            myLocationForm.setValue('state', locationData.adminName1);
            myLocationForm.setValue('city', locationData.placeName);
        }
    }, [locationData, myLocationForm]);

    const handleNext = (data: MyLocationType) => {
        updateLocationMu.mutate(data);
    };

    const updateLocationMu = useMutation({
        mutationFn: (data: MyLocationType) =>
            updateUserFieldApi({
                user_id: auth.user.userId,
                who_updated: auth.user.userId,
                upd_mode: 'USER_ADDRESS',
                ...data,
                latitude: 0,
                longitude: 0,
            }),
        onSuccess: () => {
            router.push({
                pathname: 'sign-up/questionnaire/my-hometown',
                params: {
                    ...myLocationForm.getValues(),
                },
            });
        },
        onError: () => {
            Alert.alert('Error', 'An error occurred');
        },
    });

    useEffect(() => {
        console.log('Countries:', countries);
        console.log('States:', states);
        console.log('Cities:', cities);
    }, [countries, states, cities]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            contentContainerStyle={{ flex: 1 }}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView className="flex-1 mx-4 items-center justify-between">
                    <Stack.Screen
                        options={{
                            title: 'About yourself',
                            headerStyle: {
                                backgroundColor: 'transparent',
                            },
                            headerTitleStyle: {
                                color: '#F37335',
                                fontSize: 24,
                                fontWeight: 'bold',
                            },
                            headerLeft: () => <BackButton />,
                        }}
                    />
                    <View className="flex-1 w-full items-center justify-center">
                        <View>
                            <TextScalable fontSize={25} fontClassname="font-bold text-center text-sos-gray pt-10">
                                My Location
                            </TextScalable>
                            <TextScalable fontSize={17} fontClassname="text-center text-sos-gray font-medium pb-10">
                                (Used to find people nearby)
                            </TextScalable>
                        </View>
                        <View className="w-full">
                            <Controller
                                control={myLocationForm.control}
                                name="country"
                                render={({ field }) => (
                                    <Picker
                                        selectedValue={field.value}
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                            setSelectedCountry(value);
                                        }}
                                    >
                                        <Picker.Item label="Select Country" value="" />
                                        {countries?.map((country) => (
                                            <Picker.Item key={country.geonameId} label={country.countryName} value={country.countryCode} />
                                        ))}
                                    </Picker>
                                )}
                            />
                            <Controller
                                control={myLocationForm.control}
                                name="zip_code"
                                render={({ field }) => (
                                    <Input
                                        containerClassName="my-1"
                                        placeholder="Postal Code"
                                        value={field.value}
                                        onChangeText={(value) => {
                                            field.onChange(value);
                                            setPostalCode(value);
                                        }}
                                        onBlur={field.onBlur}
                                    />
                                )}
                            />
                            <Controller
                                control={myLocationForm.control}
                                name="state"
                                render={({ field }) => (
                                    <Picker
                                        selectedValue={field.value}
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                            setSelectedState(value);
                                        }}
                                    >
                                        <Picker.Item label="Select State" value="" />
                                        {states?.map((state) => (
                                            <Picker.Item key={state.geonameId} label={state.name} value={state.adminCode1} />
                                        ))}
                                    </Picker>
                                )}
                            />
                            <Controller
                                control={myLocationForm.control}
                                name="city"
                                render={({ field }) => (
                                    <Picker
                                        selectedValue={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <Picker.Item label="Select City" value="" />
                                        {cities?.map((city) => (
                                            <Picker.Item key={city.geonameId} label={city.name} value={city.geonameId} />
                                        ))}
                                    </Picker>
                                )}
                            />
                        </View>
                    </View>
                    <View className="w-full">
                        <Button
                            onPress={myLocationForm.handleSubmit(handleNext)}
                            isLoading={updateLocationMu.isPending}
                            disabled={
                                updateLocationMu.isPending ||
                                !myLocationForm.formState.isValid ||
                                !myLocationForm.formState.isDirty
                            }
                        >
                            Next
                        </Button>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default MyLocation;

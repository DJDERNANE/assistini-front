/** @format */

import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Radio,
    RadioGroup,
    Select,
    Stack,
    Text,
    useToast,
    Image,
    InputGroup,
    InputLeftAddon,
    HStack,
    VStack,
    Checkbox,
    Textarea,
    FormErrorMessage,
    SimpleGrid,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Images } from "../constants";
import NavbarWelcome from "../layout/NavbarWelcome";

const RequestPrestateurPage = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [specialites, setSpecialites] = useState([]);
    const [loadingSpecialites, setLoadingSpecialites] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        // Step 1 - Basic Information
        fullName: "",
        email: "",
        phone: "",
        cabinName: "",
        address: "",
        location: "",
        desc: "",
        clinicType: "",
        categoryId: "",
        speIds: [], // Array of selected specialite IDs

        // Step 2 - Professional Information
        argument_num: "",
        id_fascial: "",
        logo: null, // Single logo file

        // Step 3 - Documents
        files: [], // Array of files

        // Consent data
        consentInfoExact: false,
        consentCGU: false,
    });

    // Fetch categories on component mount
    useEffect(() => {
        fetchCategories();
    }, []);

    // Fetch specialites when category changes
    useEffect(() => {
        if (formData.categoryId) {
            fetchSpecialites(formData.categoryId);
        } else {
            setSpecialites([]);
            setFormData((prev) => ({ ...prev, speIds: [] }));
        }
    }, [formData.categoryId]);

    const fetchCategories = async () => {
        try {
            const response = await fetch(
                process.env.REACT_APP_URL_API + "/categories"
            );
            if (response.ok) {
                const data = await response.json();
                setCategories(data?.data);
            } else {
                throw new Error("Failed to fetch categories");
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast({
                title: "Erreur",
                description: "Impossible de charger les catégories",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const fetchSpecialites = async (categoryId) => {
        setLoadingSpecialites(true);
        try {
            const response = await fetch(
                `${process.env.REACT_APP_URL_API}/specialties/specialtiesofcategory?catId=${categoryId}`
            );
            if (response.ok) {
                const data = await response.json();
                setSpecialites(data?.data);
            } else {
                throw new Error("Failed to fetch specialites");
            }
        } catch (error) {
            console.error("Error fetching specialites:", error);
            toast({
                title: "Erreur",
                description: "Impossible de charger les spécialités",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoadingSpecialites(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error for this field
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const handleSpecialiteChange = (speId, isChecked) => {
        setFormData((prev) => ({
            ...prev,
            speIds: isChecked
                ? [...prev.speIds, speId]
                : prev.speIds.filter((id) => id !== speId),
        }));
    };

    const handleFileUpload = (e, fieldName) => {
        const files = Array.from(e.target.files);

        if (fieldName === "logo") {
            // Single file for logo
            setFormData((prev) => ({ ...prev, logo: files[0] || null }));
        } else if (fieldName === "files") {
            // Multiple files for documents
            setFormData((prev) => ({
                ...prev,
                files: [...prev.files, ...files],
            }));
        }
    };

    const removeFile = (fieldName, index = null) => {
        if (fieldName === "logo") {
            setFormData((prev) => ({ ...prev, logo: null }));
        } else if (fieldName === "files" && index !== null) {
            setFormData((prev) => ({
                ...prev,
                files: prev.files.filter((_, i) => i !== index),
            }));
        }
    };

    const validateStep = (stepNumber) => {
        const newErrors = {};

        if (stepNumber === 1) {
            if (!formData.fullName.trim())
                newErrors.fullName = "Le nom complet est requis";
            if (!formData.email.trim()) newErrors.email = "L'email est requis";
            if (!formData.phone.trim())
                newErrors.phone = "Le téléphone est requis";
            if (!formData.cabinName.trim())
                newErrors.cabinName = "Le nom du cabinet est requis";
            if (!formData.address.trim())
                newErrors.address = "L'adresse est requise";
            if (!formData.location.trim())
                newErrors.location = "La localisation est requise";
            if (!formData.desc.trim())
                newErrors.desc = "La description est requise";
            if (!formData.clinicType)
                newErrors.clinicType = "Le type de clinique est requis";
            if (!formData.categoryId)
                newErrors.categoryId = "La catégorie est requise";
            if (formData.speIds.length === 0)
                newErrors.speIds = "Au moins une spécialité est requise";
        }

        if (stepNumber === 2) {
            if (!formData.argument_num.trim())
                newErrors.argument_num = "Le numéro d'agrément est requis";
            if (!formData.id_fascial.trim())
                newErrors.id_fascial = "L'ID fiscal est requis";
        }

        if (stepNumber === 3) {
            if (!formData.consentInfoExact || !formData.consentCGU) {
                newErrors.consent = "Vous devez accepter les conditions";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(step)) {
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = async () => {
        if (!validateStep(3)) return;

        setIsLoading(true);

        try {
            const submitData = new FormData();

            // Add text fields
            Object.keys(formData).forEach((key) => {
                if (key !== "logo" && key !== "files" && key !== "speIds") {
                    submitData.append(key, formData[key]);
                }
            });

            console.log("#####", formData.speIds);
            // Add specialite IDs as JSON
            submitData.append("speIds", JSON.stringify(formData.speIds));

            // Add logo file
            if (formData.logo) {
                submitData.append("logo", formData.logo);
            }

            // Add document files
            formData.files.forEach((file, index) => {
                submitData.append("files", file);
            });

            const response = await fetch(
                process.env.REACT_APP_URL_API + "/providers/create",
                {
                    method: "POST",
                    body: submitData,
                    // headers: {
                    //     Authorization: `Bearer ${localStorage.getItem(
                    //         "accessToken"
                    //     )}`,
                    // },
                }
            );

            if (response.ok) {
                toast({
                    title: "Demande envoyée avec succès!",
                    description:
                        "Merci pour votre patience. Notre équipe vous répondra dans les plus brefs délais.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });

                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                throw new Error("Erreur lors de l'envoi de la demande");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast({
                title: "Erreur",
                description:
                    error,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <Box bg="white" p={8} borderRadius="lg" boxShadow="md">
                        <Heading as="h2" size="md" mb={6}>
                            Informations générales
                        </Heading>
                        <Text mb={6}>
                            Remplissez vos informations personnelles et
                            professionnelles
                        </Text>

                        <Stack spacing={6}>
                            
                            <SimpleGrid
                                columns={{ base: 1, md: 2 }}
                                spacing={4}
                            >
                                <FormControl
                                    isRequired
                                    isInvalid={errors.fullName}
                                >
                                    <FormLabel>Nom complet</FormLabel>
                                    <Input
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="Votre nom complet"
                                    />
                                    <FormErrorMessage>
                                        {errors.fullName}
                                    </FormErrorMessage>
                                </FormControl>

                                <FormControl
                                    isRequired
                                    isInvalid={errors.email}
                                >
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="votre@email.com"
                                    />
                                    <FormErrorMessage>
                                        {errors.email}
                                    </FormErrorMessage>
                                </FormControl>
                            </SimpleGrid>

                            <SimpleGrid
                                columns={{ base: 1, md: 2 }}
                                spacing={4}
                            >
                                <FormControl
                                    isRequired
                                    isInvalid={errors.phone}
                                >
                                    <FormLabel>Téléphone</FormLabel>
                                    <InputGroup>
                                        <InputLeftAddon children="+213" />
                                        <Input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Numéro de téléphone"
                                        />
                                    </InputGroup>
                                    <FormErrorMessage>
                                        {errors.phone}
                                    </FormErrorMessage>
                                </FormControl>

                                <FormControl
                                    isRequired
                                    isInvalid={errors.cabinName}
                                >
                                    <FormLabel>Nom du cabinet</FormLabel>
                                    <Input
                                        name="cabinName"
                                        value={formData.cabinName}
                                        onChange={handleChange}
                                        placeholder="Nom de votre cabinet"
                                    />
                                    <FormErrorMessage>
                                        {errors.cabinName}
                                    </FormErrorMessage>
                                </FormControl>
                            </SimpleGrid>

                            <SimpleGrid
                                columns={{ base: 1, md: 2 }}
                                spacing={4}
                            >
                                <FormControl
                                    isRequired
                                    isInvalid={errors.address}
                                >
                                    <FormLabel>Adresse</FormLabel>
                                    <Input
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Adresse complète"
                                    />
                                    <FormErrorMessage>
                                        {errors.address}
                                    </FormErrorMessage>
                                </FormControl>

                                <FormControl
                                    isRequired
                                    isInvalid={errors.location}
                                >
                                    <FormLabel>Localisation</FormLabel>
                                    <Input
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="Ville, Wilaya"
                                    />
                                    <FormErrorMessage>
                                        {errors.location}
                                    </FormErrorMessage>
                                </FormControl>
                            </SimpleGrid>

                            <FormControl isRequired isInvalid={errors.desc}>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    name="desc"
                                    value={formData.desc}
                                    onChange={handleChange}
                                    placeholder="Décrivez votre activité et vos services"
                                    rows={4}
                                />
                                <FormErrorMessage>
                                    {errors.desc}
                                </FormErrorMessage>
                            </FormControl>
                            <SimpleGrid
                                columns={{ base: 1, md: 2 }}
                                spacing={4}
                            >
                                <FormControl isRequired isInvalid={errors.clinicType}>
                                    <FormLabel>Type de clinique</FormLabel>
                                    <Select
                                        name="clinicType"
                                        value={formData.clinicType}
                                        onChange={handleChange}
                                        placeholder="Sélectionnez le type de clinique"
                                    >
                                        <option value="medical center">Centre médical</option>
                                        <option value="medical office">Cabinet médical</option>
                                        <option value="specialist clinic">Clinique spécialisée</option>
                                    </Select>
                                    <FormErrorMessage>
                                        {errors.clinicType}
                                    </FormErrorMessage>
                                </FormControl>
                                <Box display={{ base: "none", md: "block" }} />
                            </SimpleGrid>
                            <SimpleGrid
                                columns={{ base: 1, md: 2 }}
                                spacing={4}
                            >
                                <FormControl
                                    isRequired
                                    isInvalid={errors.categoryId}
                                >
                                    <FormLabel>Catégorie</FormLabel>
                                    <Select
                                        name="categoryId"
                                        value={formData.categoryId}
                                        onChange={handleChange}
                                        placeholder="Sélectionnez une catégorie"
                                    >
                                        {categories.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </Select>
                                    <FormErrorMessage>
                                        {errors.categoryId}
                                    </FormErrorMessage>
                                </FormControl>

                                <FormControl
                                    isRequired
                                    isInvalid={errors.speIds}
                                >
                                    <FormLabel>Spécialités</FormLabel>
                                    <Box
                                        border="1px"
                                        borderColor="gray.200"
                                        borderRadius="md"
                                        p={3}
                                        maxH="200px"
                                        overflowY="auto"
                                    >
                                        {loadingSpecialites ? (
                                            <Text>Chargement...</Text>
                                        ) : specialites.length > 0 ? (
                                            <Stack spacing={2}>
                                                {specialites.map(
                                                    (specialite) => (
                                                        <Checkbox
                                                            key={specialite.id}
                                                            isChecked={formData.speIds.includes(
                                                                specialite.id
                                                            )}
                                                            onChange={(e) =>
                                                                handleSpecialiteChange(
                                                                    specialite.id,
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        >
                                                            {specialite.name}
                                                        </Checkbox>
                                                    )
                                                )}
                                            </Stack>
                                        ) : (
                                            <Text color="gray.500">
                                                {formData.categoryId
                                                    ? "Aucune spécialité disponible"
                                                    : "Sélectionnez d'abord une catégorie"}
                                            </Text>
                                        )}
                                    </Box>
                                    <FormErrorMessage>
                                        {errors.speIds}
                                    </FormErrorMessage>
                                </FormControl>
                            </SimpleGrid>
                        </Stack>

                        <Flex justify="flex-end" mt={6}>
                            <Button colorScheme="blue" onClick={nextStep}>
                                Suivant
                            </Button>
                        </Flex>
                    </Box>
                );

            case 2:
                return (
                    <Box bg="white" p={8} borderRadius="lg" boxShadow="md">
                        <Heading as="h2" size="md" mb={6}>
                            Informations professionnelles
                        </Heading>
                        <Text mb={6}>
                            Ajoutez vos informations professionnelles et votre
                            logo
                        </Text>

                        <Stack spacing={6}>
                            <SimpleGrid
                                columns={{ base: 1, md: 2 }}
                                spacing={4}
                            >
                                <FormControl
                                    isRequired
                                    isInvalid={errors.argument_num}
                                >
                                    <FormLabel>Numéro d'agrément</FormLabel>
                                    <Input
                                        name="argument_num"
                                        value={formData.argument_num}
                                        onChange={handleChange}
                                        placeholder="Numéro d'agrément professionnel"
                                    />
                                    <FormErrorMessage>
                                        {errors.argument_num}
                                    </FormErrorMessage>
                                </FormControl>

                                <FormControl
                                    isRequired
                                    isInvalid={errors.id_fascial}
                                >
                                    <FormLabel>ID Fiscal</FormLabel>
                                    <Input
                                        name="id_fascial"
                                        value={formData.id_fascial}
                                        onChange={handleChange}
                                        placeholder="Identifiant fiscal"
                                    />
                                    <FormErrorMessage>
                                        {errors.id_fascial}
                                    </FormErrorMessage>
                                </FormControl>
                            </SimpleGrid>

                            {/* <FormControl>
                                <FormLabel>Logo du cabinet</FormLabel>
                                <Box
                                    border="2px"
                                    borderColor="gray.200"
                                    borderStyle="dashed"
                                    borderRadius="md"
                                    p={6}
                                    textAlign="center"
                                    cursor="pointer"
                                    _hover={{ borderColor: "blue.300" }}
                                    onClick={() =>
                                        document
                                            .getElementById("logo-upload")
                                            .click()
                                    }
                                >
                                    {formData.logo ? (
                                        <VStack spacing={3}>
                                            <Box
                                                as="svg"
                                                w={8}
                                                h={8}
                                                color="green.500"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                                            </Box>
                                            <Text>{formData.logo.name}</Text>
                                            <Button
                                                size="sm"
                                                leftIcon={
                                                    <Box
                                                        as="svg"
                                                        w={4}
                                                        h={4}
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                                    </Box>
                                                }
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeFile("logo");
                                                }}
                                            >
                                                Supprimer
                                            </Button>
                                        </VStack>
                                    ) : (
                                        <VStack spacing={3}>
                                            <Box
                                                as="svg"
                                                w={8}
                                                h={8}
                                                color="gray.400"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                                            </Box>
                                            <Text>
                                                Cliquez pour télécharger votre
                                                logo
                                            </Text>
                                            <Text
                                                fontSize="sm"
                                                color="gray.500"
                                            >
                                                JPG, PNG (max 5MB)
                                            </Text>
                                        </VStack>
                                    )}
                                </Box>
                                <Input
                                    id="logo-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        handleFileUpload(e, "logo")
                                    }
                                    display="none"
                                />
                            </FormControl> */}
                        </Stack>

                        <Flex justify="space-between" mt={6}>
                            <Button variant="outline" onClick={prevStep}>
                                Retour
                            </Button>
                            <Button colorScheme="blue" onClick={nextStep}>
                                Suivant
                            </Button>
                        </Flex>
                    </Box>
                );

            case 3:
                return (
                    <Box bg="white" p={8} borderRadius="lg" boxShadow="md">
                        <Heading as="h2" size="md" mb={6}>
                            Documents et validation
                        </Heading>
                        <Text mb={6}>
                            Téléchargez vos documents et validez votre demande
                        </Text>

                        <Stack spacing={6}>
                            <FormControl>
                                <FormLabel>Documents officiels</FormLabel>
                                <Box
                                    border="2px"
                                    borderColor="gray.200"
                                    borderStyle="dashed"
                                    borderRadius="md"
                                    p={6}
                                    textAlign="center"
                                    cursor="pointer"
                                    _hover={{ borderColor: "blue.300" }}
                                    onClick={() =>
                                        document
                                            .getElementById("files-upload")
                                            .click()
                                    }
                                >
                                    <VStack spacing={3}>
                                        <Box
                                            as="svg"
                                            w={8}
                                            h={8}
                                            color="gray.400"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z" />
                                        </Box>
                                        <Text>
                                            Cliquez pour télécharger vos
                                            documents
                                        </Text>
                                        <Text fontSize="sm" color="gray.500">
                                            Registre de commerce, agrément, etc.
                                            (PDF, JPG, PNG)
                                        </Text>
                                    </VStack>
                                </Box>
                                <Input
                                    id="files-upload"
                                    type="file"
                                    multiple
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) =>
                                        handleFileUpload(e, "files")
                                    }
                                    display="none"
                                />

                                {formData.files.length > 0 && (
                                    <Box mt={4}>
                                        <Text fontWeight="medium" mb={2}>
                                            Fichiers sélectionnés:
                                        </Text>
                                        <Stack spacing={2}>
                                            {formData.files.map(
                                                (file, index) => (
                                                    <Flex
                                                        key={index}
                                                        align="center"
                                                        justify="space-between"
                                                        p={2}
                                                        bg="gray.50"
                                                        borderRadius="md"
                                                    >
                                                        <HStack>
                                                            <Box
                                                                as="svg"
                                                                w={4}
                                                                h={4}
                                                                color="blue.500"
                                                                fill="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                                                            </Box>
                                                            <Text fontSize="sm">
                                                                {file.name}
                                                            </Text>
                                                        </HStack>
                                                        <Button
                                                            size="xs"
                                                            variant="ghost"
                                                            leftIcon={
                                                                <Box
                                                                    as="svg"
                                                                    w={3}
                                                                    h={3}
                                                                    fill="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                                                </Box>
                                                            }
                                                            onClick={() =>
                                                                removeFile(
                                                                    "files",
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            Supprimer
                                                        </Button>
                                                    </Flex>
                                                )
                                            )}
                                        </Stack>
                                    </Box>
                                )}
                            </FormControl>

                            <Stack spacing={4}>
                                <Text fontWeight="medium">Consentements</Text>

                                <Box
                                    p={4}
                                    borderWidth="1px"
                                    borderRadius="md"
                                    borderColor="gray.200"
                                >
                                    <Checkbox
                                        isChecked={formData.consentInfoExact}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                consentInfoExact:
                                                    e.target.checked,
                                            }))
                                        }
                                    >
                                        J'atteste que les informations fournies
                                        sont exactes.
                                    </Checkbox>
                                </Box>

                                <Box
                                    p={4}
                                    borderWidth="1px"
                                    borderRadius="md"
                                    borderColor="gray.200"
                                >
                                    <Checkbox
                                        isChecked={formData.consentCGU}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                consentCGU: e.target.checked,
                                            }))
                                        }
                                    >
                                        J'accepte les conditions générales
                                        d'utilisation
                                    </Checkbox>
                                </Box>

                                {errors.consent && (
                                    <Text color="red.500" fontSize="sm">
                                        {errors.consent}
                                    </Text>
                                )}
                            </Stack>
                        </Stack>

                        <Flex justify="space-between" mt={6}>
                            <Button variant="outline" onClick={prevStep}>
                                Retour
                            </Button>
                            <Button
                                colorScheme="blue"
                                onClick={handleSubmit}
                                isLoading={isLoading}
                                loadingText="Envoi en cours..."
                            >
                                Envoyer ma demande
                            </Button>
                        </Flex>
                    </Box>
                );

            default:
                return null;
        }
    };

    return (
        <div className="w-full relative">
            <div className="absolute z-50 top-0 left-0 right-0">
                <NavbarWelcome />
            </div>
            <img
                src={Images.BgRequest}
                alt="image hero section"
                className="h-[1000px] w-full object-cover"
            />
            <div className="absolute bottom-0 top-0 left-0 right-0">
                <div className="container mx-auto pt-20 md:px-20">
                    {/* Progress indicator */}
                    <Box
                        mb={6}
                        bg="white"
                        p={4}
                        borderRadius="lg"
                        boxShadow="md"
                    >
                        <Flex justify="space-between" align="center">
                            <Box textAlign="center" flex={1}>
                                <Box
                                    w={8}
                                    h={8}
                                    borderRadius="full"
                                    bg={step >= 1 ? "blue.500" : "gray.200"}
                                    color="white"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    mx="auto"
                                    mb={2}
                                >
                                    1
                                </Box>
                                <Text
                                    fontSize="sm"
                                    fontWeight={step === 1 ? "bold" : "normal"}
                                >
                                    Informations générales
                                </Text>
                            </Box>
                            <Box
                                w={8}
                                h={0.5}
                                bg={step >= 2 ? "blue.500" : "gray.200"}
                            />
                            <Box textAlign="center" flex={1}>
                                <Box
                                    w={8}
                                    h={8}
                                    borderRadius="full"
                                    bg={step >= 2 ? "blue.500" : "gray.200"}
                                    color="white"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    mx="auto"
                                    mb={2}
                                >
                                    2
                                </Box>
                                <Text
                                    fontSize="sm"
                                    fontWeight={step === 2 ? "bold" : "normal"}
                                >
                                    Infos professionnelles
                                </Text>
                            </Box>
                            <Box
                                w={8}
                                h={0.5}
                                bg={step >= 3 ? "blue.500" : "gray.200"}
                            />
                            <Box textAlign="center" flex={1}>
                                <Box
                                    w={8}
                                    h={8}
                                    borderRadius="full"
                                    bg={step >= 3 ? "blue.500" : "gray.200"}
                                    color="white"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    mx="auto"
                                    mb={2}
                                >
                                    3
                                </Box>
                                <Text
                                    fontSize="sm"
                                    fontWeight={step === 3 ? "bold" : "normal"}
                                >
                                    Documents
                                </Text>
                            </Box>
                        </Flex>
                    </Box>

                    {renderStep()}
                </div>
            </div>
        </div>
    );
};

export default RequestPrestateurPage;

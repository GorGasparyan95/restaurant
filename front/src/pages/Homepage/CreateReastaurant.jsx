import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Input,
} from "@chakra-ui/react";

const CreateRestaurant = ({ isOpen, onClose, setValues, values }) => {
  const [loading, setLoading] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    setLoading(true);
    try {
      await fetch("http://localhost:5000/restaurant", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (response) => {
        await response.json();
      });
      onClose();
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Restaurant</ModalHeader>
          <ModalCloseButton />
          <ModalBody py="8">
            <form noValidate onSubmit={handleSubmit(submit)}>
              <VStack px="8" spacing="4">
                <Input
                  placeholder="title"
                  isInvalid={!!errors.title}
                  {...register("title", { required: true })}
                />
                <Input
                  placeholder="description"
                  isInvalid={!!errors.description}
                  {...register("description", { required: true })}
                />
                <Input
                  placeholder="rateing"
                  isInvalid={!!errors.rateing}
                  {...register("rateing", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  type="number"
                  pattern="[1-5]*"
                />
                <Input
                  placeholder="address"
                  isInvalid={!!errors.address}
                  {...register("address", { required: true })}
                />
                <Input
                  placeholder="phone"
                  isInvalid={!!errors.phone}
                  {...register("phone", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  type="number"
                  pattern="[1-5]*"
                />
                <Input
                  placeholder="lat"
                  isInvalid={!!errors.phone}
                  {...register("lat", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  type="number"
                  pattern="[0-9]*"
                />
                <Input
                  placeholder="lng"
                  isInvalid={!!errors.phone}
                  {...register("lng", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  type="number"
                  pattern="[0-9]*"
                />
                <Button
                  isLoading={loading}
                  type="submit"
                  colorScheme="teal"
                  size="md"
                >
                  Create
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateRestaurant;

import {
  Button,
  Box,
  Input,
  FormControl,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Form, Formik, Field } from "formik";
import React from "react";
import * as yup from "yup";
import {
  PublicKey,
  Connection,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
const ERROR_INIT_STATE = {
  walletAddress: "",
  solValue: "",
};
type FormTypes = {
  walletAddress: string;
  solValue: number | string;
};
export default function AirDrop() {
  const [status, setStatus] = React.useState<
    "info" | "success" | "error" | "warning"
  >("info");
  const airDropSubmitHandler = async (values: FormTypes, actions) => {
    const { walletAddress, solValue } = values;
    try {
      setStatus("warning");
      const publicKey = new PublicKey(walletAddress);
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const fromAirDropSignature = await connection.requestAirdrop(
        publicKey,
        +solValue * LAMPORTS_PER_SOL
      );
      await connection.confirmTransaction(fromAirDropSignature);
      setStatus("success");
      actions.resetForm();
    } catch (error) {
      if (error?.message === "Invalid public key input") {
        actions.setErrors({ walletAddress: "Invalid Solana Wallet Address." });
      } else {
        actions.setErrors({ walletAddress: error?.message || "Error" });
      }
      setStatus("error");
    }
    setTimeout(() => {
      setStatus("info");
    }, 6000);
  };
  return (
    <Formik
      initialValues={ERROR_INIT_STATE}
      validationSchema={airdropValidator}
      onSubmit={airDropSubmitHandler}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          {status !== "info" ? (
            <Alert status={status}>
              <AlertIcon />
              {status === "success"
                ? "Airdrop Successful!"
                : status === "error"
                ? "Airdrop failed!"
                : "Airdropping..."}
            </Alert>
          ) : null}
          <Box mt={4} display="flex" flexDirection="column" alignItems="center">
            <Field
              name="walletAddress"
              render={({ field, form: { errors, touched } }) => {
                return (
                  <FormControl
                    isInvalid={errors?.walletAddress && touched?.walletAddress}
                  >
                    <Input
                      {...field}
                      w="24rem"
                      placeholder="Solana Wallet Address"
                      variant="filled"
                      css={{ "::placeholder": { color: "#09101D" } }}
                      type="text"
                    />
                    <FormErrorMessage>{errors?.walletAddress}</FormErrorMessage>
                  </FormControl>
                );
              }}
            />
            <Field
              name="solValue"
              render={({ field, form: { errors, touched } }) => {
                return (
                  <FormControl
                    isInvalid={errors?.solValue && touched?.solValue}
                  >
                    <Input
                      {...field}
                      w="24rem"
                      placeholder="Example: 1 SOL"
                      mt={2}
                      variant="filled"
                      css={{ "::placeholder": { color: "#09101D" } }}
                      type="number"
                    />
                    <FormErrorMessage>{errors?.solValue}</FormErrorMessage>
                  </FormControl>
                );
              }}
            />

            <Button
              type="submit"
              borderRadius="4px"
              mt="4"
              p="12px 40px"
              color="#fff"
              _hover={{ bgColor: "#0d004d" }}
              bgColor="#0d004d"
              h="44px"
              fontSize="1.1rem"
              letterSpacing="1px"
            >
              Send
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
const airdropValidator = yup.object().shape({
  walletAddress: yup.string().required("Wallet Address is required."),
  solValue: yup
    .number()
    .max(2, "Max SOL Airdrop per Txn is 2.")
    .required("SOL Value is required"),
});

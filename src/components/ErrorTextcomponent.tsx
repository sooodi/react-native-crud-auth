import { FC, ReactElement } from "react";
import Styles from "../utils/Styles";
import { Text } from "react-native";
type errorProps = { message: string };

const ErrorTextComponent = ({ message }: errorProps) => {
  return <>{message && <Text style={Styles.error_text}>{message}</Text>}</>;
};
export default ErrorTextComponent;

import { StyleSheet } from "react-native";

const PRIMARY_COLOR = "#28A4DA";
const BASE_TEXT_COLOR = "#444444";

const Styles = StyleSheet.create({
  login_container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  page_container: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  login_header: {
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  login_header_logo: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  login_header_text: {
    marginTop: 15,
    color: "#f0f0f0",
    fontSize: 16,
  },
  login_header_text_bold: {
    color: "#fff",
    fontWeight: "bold",
  },
  login_wrapper: {
    flex: 1,
    justifyContent: "center",

    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    marginTop: -10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  form: {
    width: "100%",
    maxWidth: 280,
  },
  form_input: {
    height: 44,
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
  },

  error_input: {
    borderColor: "#DA2828",
    backgroundColor: "#FFF0F0",
  },
  text_color: {
    color: "#fff",
  },
  error_text: {
    color: "#DA2828",
    marginLeft: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    height: 44,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 10,
  },
  loading_view: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  button_label: {
    color: "#fff",
    fontSize: 15,
  },
  login_social: {
    width: "100%",
    maxWidth: 280,
    marginTop: 20,
  },
  login_social_separator: {
    flexDirection: "row",
    alignItems: "center",
  },
  login_social_separator_line: {
    flex: 1,
    width: "100%",
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  login_social_separator_text: {
    marginHorizontal: 10,
    color: "#808080",
    fontSize: 16,
  },
  login_social_buttons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  login_social_button: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: "#E7E7E7",
    borderRadius: 60,
  },
  login_social_icon: {
    width: 38,
    height: 38,
    resizeMode: "contain",
  },
  login_social_facebook: {
    backgroundColor: "#4267B2",
    borderColor: "#4267B2",
  },
  footer_view: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    marginTop: 30,
  },
  login_footer_text: {
    color: BASE_TEXT_COLOR,
    fontSize: 15,
  },
  login_footer_link: {
    color: "#0089C9",
    fontSize: 15,
    fontWeight: "bold",
  },
  text_title: {
    color: PRIMARY_COLOR,
    fontSize: 30,
    marginBottom: 20,
  },
});

export default Styles;

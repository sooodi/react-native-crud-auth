import Ionicons from "@expo/vector-icons/Ionicons";
import React, { FC, ReactElement, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";

import Styles from "../utils/Styles";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Modal from "react-native-modal";
import { useAppDispatch } from "../store/hooks";
import { deletePost, getPosts } from "../store/post/post.action";
import { useSelector } from "react-redux";
import { postObject } from "../store/post/post.types";

export const Posts: FC<{}> = ({}): ReactElement => {
  const [posts, setPosts] = useState<postObject[]>();
  const [selectedPost, setSelectedPost] = useState<postObject>();
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>();

  const handleClick = (item: postObject) => {
    setIsModalVisible(true);
    setSelectedPost(item);
  };
  const handleDeletePost = () => {
    setIsModalVisible(() => !isModalVisible);
    dispatch(deletePost(selectedPost.id));
  };
  let postList = useSelector((state) => state?.post?.posts);

  useEffect(() => {
    async function fillPosts() {
      if (postList && postList?.length > 0) {
        setPosts(postList);
        setLoading(false);
      }
    }
    fillPosts();
  }, [postList]);

  useEffect(() => {
    async function handleCategories() {
      dispatch(getPosts(false));
    }
    handleCategories();
  }, []);

  const DeleteModal = () => {
    return (
      <Modal isVisible={isModalVisible}>
        <View style={stylesPost.modal_container}>
          <Text style={stylesPost.message}>
            Are you sure you want to delete the post?
          </Text>
          <TouchableOpacity
            style={stylesPost.button}
            onPress={handleDeletePost}
          >
            {" "}
            <Text style={Styles.text_color}>ok</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleModal}>
            {" "}
            <Text style={stylesPost.text_cancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
  return (
    <>
      <TouchableOpacity onPress={() => navigate("Add Post")}>
        <View style={stylesPost.buttonadd}>
          <Ionicons name="md-add" size={24} color="white" />
          <Text style={Styles.button_label}>{"New Post"}</Text>
        </View>
      </TouchableOpacity>
      {loading && <ActivityIndicator animating size="large" color="#0000ee" />}
      {!loading && posts && (
        <View style={stylesPost.container}>
          <FlatList
            style={stylesPost.tasks}
            //   columnWrapperStyle={stylesPost.listContainer}
            data={posts}
            keyExtractor={(item: any) => {
              return item?.id;
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={[stylesPost.card, { borderColor: item.color }]}
                  onPress={() => console.log("click")}
                >
                  <Image
                    style={stylesPost.image}
                    source={{ uri: item?.image }}
                  />
                  <View style={stylesPost.cardContent}>
                    <View style={stylesPost.row_view}>
                      <Text style={[stylesPost.description]}>
                        {item?.title}
                      </Text>
                      <TouchableOpacity onPress={() => handleClick(item)}>
                        <Ionicons name="md-trash" size={20} color="#8A0000" />
                      </TouchableOpacity>
                    </View>
                    <Text style={[stylesPost.date]}>{item?.description}</Text>
                    <Text style={[stylesPost.date]}>
                      {item?.category?.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
      <View>
        <DeleteModal />
      </View>
    </>
  );
};

const stylesPost = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#eeeeee",
  },
  modal_container: {
    alignItems: "center",
    backgroundColor: "#fff",
    height: 240,
    alignContent: "center",
    borderRadius: 15,
    paddingTop: 10,
  },
  row_view: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "55%",
    alignItems: "center",
  },
  tasks: {
    flex: 1,
  },
  message: {
    marginTop: 20,
    color: "#444444",
    fontWeight: 500,
    fontSize: 20,

    textAlign: "center",
  },
  text_cancel: {
    marginTop: 20,
    color: "#444444",
    fontSize: 14,
  },
  cardContent: {
    marginLeft: 20,

    // marginTop: 10,
  },
  buttonadd: {
    alignItems: "center",
    alignSelf: "flex-end",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
    height: 44,
    backgroundColor: "#0065A4",
    paddingHorizontal: 50,
    borderRadius: 10,
    marginEnd: 19,
  },
  image: {
    width: "30%",
    height: 146,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    height: 44,
    backgroundColor: "#DA2828",
    borderRadius: 50,
    width: 140,
  },
  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: "white",
    flexBasis: "46%",

    flexDirection: "row",
    height: 146,
  },

  description: {
    fontSize: 18,
    flex: 1,
    color: "#44444",
    fontWeight: "bold",
    paddingVertical: 10,
  },
  date: {
    fontSize: 14,
    flex: 1,
    color: "#696969",
    marginTop: 5,
  },
});

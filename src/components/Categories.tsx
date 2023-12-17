import React, { FC, ReactElement, useEffect, useState } from "react";
import { View } from "react-native";

import { SelectList } from "react-native-dropdown-select-list";
import { useAppDispatch } from "../store/hooks";
import { getCategories } from "../store/post/post.action";

import { useSelector } from "react-redux";
import { categoryDropdownObj } from "../store/post/post.types";
type Props = { setCategory(item: categoryDropdownObj): void };

function Categories({ setCategory }: Props) {
  const [data, setData] = React.useState<categoryDropdownObj[]>([]);
  const dispatch = useAppDispatch();
  let categories = useSelector((state) => state?.post);

  useEffect(() => {
    async function fillCategories() {
      if (categories && categories?.categories?.length > 0) {
        let categorylist: categoryDropdownObj[] = [];

        categories?.categories.map((e) => {
          categorylist.push({ key: e.id, value: e.name });
        });

        setData(categorylist);
      }
    }
    fillCategories();
  }, [categories]);

  useEffect(() => {
    async function handleCategories() {
      dispatch(getCategories());
    }
    handleCategories();
  }, []);
  return (
    <View style={{ marginTop: 20 }}>
      <SelectList
        setSelected={(val) => setCategory(val)}
        data={data}
        save="value"
      />
    </View>
  );
}

export default Categories;

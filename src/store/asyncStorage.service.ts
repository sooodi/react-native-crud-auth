import AsyncStorage from "@react-native-async-storage/async-storage";

class Common {
  public defaultOptions = () => {
    AsyncStorage.setItem("initialtoken", "undefined");
  };
}

const CommonService = new Common();
Object.freeze(CommonService);
export { CommonService };

export const setData = async (
  key: string,
  value: string
): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
};
export const setDatas = async (key: string, data: any): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (err) {
    console.log("error is: " + err);
    return false;
  }
};
export const removeData = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
};

export const getData = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    return null;
  }
};

export const getDatas = async (key: string): Promise<any | null> => {
  try {
    let value = await AsyncStorage.getItem(key);

    if (value !== null) {
      // We have data!!
      // console.log("value is: " + JSON.stringify(JSON.parse(value)));
      return JSON.parse(value);
    }
  } catch {
    return null;
  }
};

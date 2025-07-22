import { b as useNuxtApp, u as useCookie, n as navigateTo } from './server.mjs';

const useAuth = () => {
  const { $api } = useNuxtApp();
  const token = useCookie("token", {
    maxAge: 60 * 60 * 24 * 7,
    // 持久化
    sameSite: "lax"
    // 安全一点
  });
  const userinfo = useCookie("userinfo", {
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax"
  });
  const login = async (email, password) => {
    try {
      const response = await $api("/user/user/loginByEmail", {
        method: "POST",
        body: { email, password }
      });
      if (response.code == 0) {
        token.value = response.result.token;
        userinfo.value = JSON.stringify(response.result.user);
      }
      return response;
    } catch (error) {
      console.error("登录失败:", error);
      throw error;
    }
  };
  const register = async (fullName, email, password, numberAreaCode, number) => {
    try {
      const response = await $api("/user/user/createWithLogin", {
        method: "POST",
        body: {
          fullName,
          email,
          password,
          numberAreaCode,
          number
        }
      });
      if (response.code == 0) {
        token.value = response.result.token;
        userinfo.value = JSON.stringify(response.result.user);
      }
      return response;
    } catch (error) {
      console.error("登录失败:", error);
      throw error;
    }
  };
  const sendrepassword = async (email, token2) => {
    try {
      const response = await $api("/user/user/sendRetrievePasswordEmail", {
        method: "POST",
        body: { email, token: token2 }
      });
      return response;
    } catch (error) {
      console.error("发送失败:", error);
      throw error;
    }
  };
  const updatepassword = async (email, code, newPassword) => {
    try {
      const response = await $api("/user/user/retrievePassword", {
        method: "POST",
        body: { email, code, newPassword }
      });
      return response;
    } catch (error) {
      console.error("修改失败:", error);
      throw error;
    }
  };
  const createContactUs = async (params) => {
    try {
      const response = await $api("/user/contactUs/createContactUs", {
        method: "POST",
        body: params
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  const logout = () => {
    token.value = null;
    navigateTo("/login");
  };
  return { login, logout, register, sendrepassword, updatepassword, token, createContactUs };
};

export { useAuth as u };

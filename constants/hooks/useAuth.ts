/*    Imports    */
// import Auth from "@aws-amplify/auth";
// import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import axios from "axios";
import CUser from "../../types/classes/user/CUser";

// // sign in with email and password
// const signIn = async (email: string, password: string, loadingCallback: (loading: boolean) => void, options: any = {}) => {
//     let awsresp = null;
//     let svrresp = null;
//     loadingCallback(true);
//     try {
//         awsresp = await Auth.signIn(email, password);
//         svrresp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
//             authid: awsresp.username,
//         });
//     } catch (error: any) {
//         loadingCallback(false);
//         return { success: false, error: { type: error.name, message: error.message } };
//     }
//     loadingCallback(false);
//     if (awsresp && svrresp && svrresp.data.user !== null) {
//         return { success: true, user: svrresp.data.user, awsresponse: awsresp };
//     }
//     return { success: false, error: { type: "unknown", message: "unknown error" } };
// };
// // sign up with email and password
// const signUp = async (email: string, password: string, user: CUser, loadingCallback: (loading: boolean) => void, options: any = {}) => {
//     let awsresp = null;
//     let svrresp = null;
//     loadingCallback(true);
//     try {
//         awsresp = await Auth.signUp({
//             username: email,
//             password,
//         });
//         svrresp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
//             ...user,
//             authid: awsresp.userSub,
//         });
//     } catch (error: any) {
//         loadingCallback(false);
//         return { success: false, error: { type: error.name, message: error.message } };
//     }
//     loadingCallback(false);
//     if (awsresp && svrresp && svrresp.data.user !== null) {
//         return { success: true, user: svrresp.data.user, awsresponse: awsresp };
//     }
//     return { success: false, error: { type: "unknown", message: "unknown error" } };
// };
// // sign out
// const signOut = async (loadingCallback: (loading: boolean) => void, options: any = {}) => {
//     let svrresp = null;
//     loadingCallback(true);
//     try {
//         await Auth.signOut();
//         svrresp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signout`);
//     } catch (error: any) {
//         loadingCallback(false);
//         return { success: false, error: { type: error.name, message: error.message } };
//     }
//     loadingCallback(false);
//     return { success: false, error: { type: "unknown", message: "unknown error" } };
// };
// // sign in using google
// const signInWithGoogle = async (loadingCallback: (loading: boolean) => void, options: any = {}) => {
//     let awsresp = null;
//     let svrresp = null;
//     loadingCallback(true);
//     try {
//         const gc = await Auth.federatedSignIn({
//             provider: CognitoHostedUIIdentityProvider.Google,
//         });
//         console.log("gc : ", gc);
//         awsresp = await Auth.currentAuthenticatedUser();
//         svrresp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
//             authid: awsresp.signInUserSession.accessToken.payload.username,
//         });
//     } catch (error: any) {
//         loadingCallback(false);
//         return { success: false, error: { type: error.name, message: error.message } };
//     }
//     loadingCallback(false);
//     if (awsresp) {
//         return { success: true, awsresponse: awsresp };
//     }
//     // if (awsresp && svrresp && svrresp.data.user !== null) {
//     //     return svrresp.data.user;
//     // }
//     return { success: false, error: { type: "unknown", message: "unknown error" } };
// };
// // get signed in user
// const getCurrentUser = async (loadingCallback: (loading: boolean) => void, options: any = {}) => {
//     let awsresp = null;
//     loadingCallback(true);
//     try {
//         awsresp = await Auth.currentAuthenticatedUser();
//     } catch (error: any) {
//         loadingCallback(false);
//         return { success: false, error: { type: error.name, message: error.message } };
//     }
//     loadingCallback(false);
//     if (awsresp) {
//         return { success: true, awsresponse: awsresp };
//     }
//     return { success: false, error: { type: "unknown", message: "unknown error" } };
// };
// // get session for signed in user
// const getCurrentUserSession = async (loadingCallback: (loading: boolean) => void, options: any = {}) => {
//     let awsresp = null;
//     loadingCallback(true);
//     try {
//         awsresp = await Auth.currentSession();
//     } catch (error: any) {
//         loadingCallback(false);
//         return { success: false, error: { type: error.name, message: error.message } };
//     }
//     loadingCallback(false);
//     if (awsresp) {
//         return { success: true, awsresponse: awsresp };
//     }
//     return { success: false, error: { type: "unknown", message: "unknown error" } };
// };
// // get signed in user attributes
// const getCurrentUserAttributes = async (loadingCallback: (loading: boolean) => void, options: any = {}) => {
//     let awsresp = null;
//     loadingCallback(true);
//     try {
//         awsresp = await Auth.currentAuthenticatedUser();
//     } catch (error: any) {
//         loadingCallback(false);
//         return { success: false, error: { type: error.name, message: error.message } };
//     }
//     loadingCallback(false);
//     if (awsresp) {
//         return awsresp.attributes;
//     }
//     return { success: false, error: { type: "unknown", message: "unknown error" } };
// };
// // update user attributes
// const updateCurrentUserAttributes = async (attributes: any, loadingCallback: (loading: boolean) => void, options: any = {}) => {
//     let awsresp = null;
//     loadingCallback(true);
//     try {
//         awsresp = await Auth.updateUserAttributes(await Auth.currentAuthenticatedUser(), attributes);
//     } catch (error: any) {
//         loadingCallback(false);
//         return { success: false, error: { type: error.name, message: error.message } };
//     }
//     loadingCallback(false);
//     if (awsresp) {
//         return { success: true, awsresponse: awsresp };
//     }
//     return { success: false, error: { type: "unknown", message: "unknown error" } };
// };
// // verify email on sign up
// const confirmSignUp = async (email: string, code: string, loadingCallback: (loading: boolean) => void, options: any = {}) => {
//     let awsresp = null;
//     loadingCallback(true);
//     try {
//         awsresp = await Auth.confirmSignUp(email, code);
//     } catch (error: any) {
//         loadingCallback(false);
//         return { success: false, error: { type: error.name, message: error.message } };
//     }
//     loadingCallback(false);
//     if (awsresp) {
//         return { success: true, awsresponse: awsresp };
//     }
//     return { success: false, error: { type: "unknown", message: "unknown error" } };
// };
// // resend verification code
// const resendConfirmSignUp = async (email: string, loadingCallback: (loading: boolean) => void, options: any = {}) => {
//     let awsresp = null;
//     loadingCallback(true);
//     try {
//         awsresp = await Auth.resendSignUp(email);
//     } catch (error: any) {
//         loadingCallback(false);
//         return { success: false, error: { type: error.name, message: error.message } };
//     }
//     loadingCallback(false);
//     if (awsresp) {
//         return { success: true, awsresponse: awsresp };
//     }
//     return { success: false, error: { type: "unknown", message: "unknown error" } };
// };
// // forgot password
// const forgotPassword = async (email: string, loadingCallback: (loading: boolean) => void, options: any = {}) => {
//     let awsresp = null;
//     loadingCallback(true);
//     try {
//         awsresp = await Auth.forgotPassword(email);
//     } catch (error: any) {
//         loadingCallback(false);
//         return { success: false, error: { type: error.name, message: error.message } };
//     }
//     loadingCallback(false);
//     if (awsresp) {
//         return { success: true, awsresponse: awsresp };
//     }
//     return { success: false, error: { type: "unknown", message: "unknown error" } };
// };
// // upadate forgot password
// const confirmForgotPassword = async (email: string, code: string, password: string, loadingCallback: (loading: boolean) => void, options: any = {}) => {
//     let awsresp = null;
//     loadingCallback(true);
//     try {
//         awsresp = await Auth.forgotPasswordSubmit(email, code, password);
//     } catch (error: any) {
//         loadingCallback(false);
//         return { success: false, error: { type: error.name, message: error.message } };
//     }
//     loadingCallback(false);
//     if (awsresp) {
//         return { success: true, awsresponse: awsresp };
//     }
//     return { success: false, error: { type: "unknown", message: "unknown error" } };
// };
// // change password
// const changePassword = async (oldPassword: string, newPassword: string, loadingCallback: (loading: boolean) => void, options: any = {}) => {
//     let awsresp = null;
//     loadingCallback(true);
//     try {
//         await Auth.changePassword(await Auth.currentAuthenticatedUser(), oldPassword, newPassword);
//     } catch (error: any) {
//         loadingCallback(false);
//         return { success: false, error: { type: error.name, message: error.message } };
//     }
//     loadingCallback(false);
//     if (awsresp) {
//         return { success: true, awsresponse: awsresp };
//     }
//     return { success: false, error: { type: "unknown", message: "unknown error" } };
// };
// // verify user
// const verifyUser = async (email: string, loadingCallback: (loading: boolean) => void, options: any = {}) => {
//     let awsresp = null;
//     loadingCallback(true);
//     try {
//         await Auth.verifyCurrentUserAttribute(email);
//     } catch (error: any) {
//         loadingCallback(false);
//         return { success: false, error: { type: error.name, message: error.message } };
//     }
//     loadingCallback(false);
//     if (awsresp) {
//         return { success: true, awsresponse: awsresp };
//     }
//     return { success: false, error: { type: "unknown", message: "unknown error" } };
// };
// // confirm verify user request
// const confirmVerifyUser = async (email: string, code: string, loadingCallback: (loading: boolean) => void, options: any = {}) => {
//     let awsresp = null;
//     loadingCallback(true);
//     try {
//         awsresp = await Auth.verifyCurrentUserAttributeSubmit(email, code);
//     } catch (error: any) {
//         loadingCallback(false);
//         return { success: false, error: { type: error.name, message: error.message } };
//     }
//     loadingCallback(false);
//     if (awsresp) {
//         return { success: true, awsresponse: awsresp };
//     }
//     return { success: false, error: { type: "unknown", message: "unknown error" } };
// };
// // check password need to change
// const checkPasswordIsNeedToChange = async (loadingCallback: (loading: boolean) => void, options: any = {}) => {
//     let awsresp = null;
//     loadingCallback(true);
//     try {
//         awsresp = await Auth.currentAuthenticatedUser();
//     } catch (error: any) {
//         loadingCallback(false);
//         return { success: false, error: { type: error.name, message: error.message } };
//     }
//     loadingCallback(false);
//     if (awsresp) {
//         return { success: true, value: awsresp.challengeName === "NEW_PASSWORD_REQUIRED", awsresponse: awsresp };
//     }
//     return { success: false, error: { type: "unknown", message: "unknown error" } };
// };

export default {
    // signUp,
    // signIn,
    // signOut,
    // signInWithGoogle,
    // getCurrentUser,
    // getCurrentUserSession,
    // getCurrentUserAttributes,
    // updateCurrentUserAttributes,
    // confirmSignUp,
    // resendConfirmSignUp,
    // forgotPassword,
    // confirmForgotPassword,
    // changePassword,
    // verifyUser,
    // confirmVerifyUser,
    // checkPasswordIsNeedToChange,
};

import NetInfo from "@react-native-community/netinfo";
import * as Network from "expo-network";
import { Platform } from "react-native";
import Timer from "easytimer";
import getAWSLogger from "@modules/aws-logging/logger";

// checks whether user is connected to internet, return true if connected, false otherwise
const checkOnlineStatus = () => {
  let timer = new Timer();
  timer.start({precision: 'seconds'});
  return new Promise((resolve, reject) => {
    if (Platform.OS === "ios") {
      Network.getNetworkStateAsync().then(
        (status) => {
          timer.stop();
          getAWSLogger().log({
            type: "CHECK_ONLINE_STATUS_SUCCESS_TIMER_SUCCESS",
            seconds: timer.getTimeValues().toString(),
          });
          resolve(status.isConnected);
        },
        (error) => {
          timer.stop();
          getAWSLogger().log({
            type: "CHECK_ONLINE_STATUS_SUCCESS_TIMER_ERROR",
            seconds: timer.getTimeValues().toString(),
          });
          reject(error);
        }
      );
    } else {
      NetInfo.fetch().then(
        (state) => {
          // check if signal strength is strong enough to support online functionality
          if (
            state.isConnected &&
            state.details.strength !== undefined &&
            state.details.strength > 10
          ) {
            timer.stop();
            getAWSLogger().log({
              type: "CHECK_ONLINE_STATUS_SUCCESS_TIMER_SUCCESS",
              seconds: timer.getTimeValues().toString(),
            });
            resolve(true);
          } else {
            timer.stop();
            getAWSLogger().log({
              type: "CHECK_ONLINE_STATUS_SUCCESS_TIMER_ERROR",
              seconds: timer.getTimeValues().toString(),
            });
            resolve(false);
          }
        },
        (error) => {
          reject(error);
        }
      );
    }
  });
}
export default checkOnlineStatus;

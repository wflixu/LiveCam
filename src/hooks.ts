import { appWindow, LogicalPosition } from "@tauri-apps/api/window";
import { ref } from "vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useSystemStoreHook } from "./store";

export function useWinMove() {
  const moving = ref(false);
  const lastPos = ref<number[]>([]);

  const move = async (evt: MouseEvent) => {
    const { screenX, screenY, pageX, pageY } = evt;
    const [sX, sY] = lastPos.value;
    const ph = new LogicalPosition(
      screenX - pageX + (screenX - sX),
      screenY - pageY + (screenY - sY)
    );
    await appWindow.setPosition(ph);
    lastPos.value = [screenX, screenY];
  };

  const mousedownHandler = async (evt: MouseEvent) => {
    const { screenX, screenY } = evt;
    moving.value = true;
    lastPos.value = [screenX, screenY];
    console.log("mousedown poiont", lastPos.value);
  };

  const mouseupHandler = async (evt: MouseEvent) => {
    console.log(" mouseup");
    moving.value = false;
    await move(evt);
  };

  const mousemoveHandler = async (evt: MouseEvent) => {
    if (moving.value) {
      console.log("mousemove");
      await move(evt);
    }
  };

  const mouseleaveHandler = async (evt: MouseEvent) => {
    if (moving.value) {
      moving.value = false;
      await move(evt);
    }
  };

  return {
    moving,
    lastPos,
    mousedownHandler,
    mouseupHandler,
    mousemoveHandler,
    mouseleaveHandler,
  };
}

export function useCheckAvaibleCamrea() {
  const router = useRouter();
  const systemStore = useSystemStoreHook();
  systemStore.setChecking(true);

  const checkAvailableDevice = async () => {
    const constraints = {
      audio: false,
      video: { width: 720, height: 720, deviceId: systemStore.deviceId! },
    };
    await navigator.mediaDevices.getUserMedia(constraints);
    const deviceInfos = await navigator.mediaDevices.enumerateDevices();

    if (!Array.isArray(deviceInfos)) {
      router.push("/other/error");
    }

    const available = deviceInfos.find((item) => {
      return item.kind == "videoinput" && item.deviceId;
    });
    // 是否有可用的
    if (available) {
      if (systemStore.deviceId) {
        const curDevice = deviceInfos.find((item) => {
          return (
            item.deviceId == systemStore.deviceId && item.kind == "videoinput"
          );
        });
        if (!curDevice) {
          systemStore.setDeviceId(available.deviceId);
        }
      } else {
        systemStore.setDeviceId(available.deviceId);
      }
    } else {
      router.push("/other/error");
    }

    systemStore.setChecking(false);
  };

  onMounted(async () => {
    try {
      await checkAvailableDevice();
    } catch (error) {
      console.warn(error);
      systemStore.setChecking(false);
      router.push("/other/error");
    }
  });
}

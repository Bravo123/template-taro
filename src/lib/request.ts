import Taro from '@tarojs/taro';
import { API_PREFIX, APP_ID } from '../config';
import { get as globalDataGet, remove as globalDataRemove } from './global';

interface RequestHeader {
  'BRAVO-APPID': string;
  // 'BRAVO-DEVICE-ID': string;
  'BRAVO-AGENT': string;
  Authorization?: string;
}

type SuccessCode = 200 | 201 | 202 | 204;

interface ResponseOkData {
  api_code: SuccessCode;
  [fields: string]: any;
}

type ErrorCode = 499 | 498 | 400 | 401 | 403 | 404 | 406 | 410 | 422 | 500 | 502 | 503 | 504;

interface ResponseErrorData {
  api_code: ErrorCode;
  api_msg: string;
}

const header: RequestHeader = {
  'BRAVO-APPID': APP_ID,
  // 'BRAVO-DEVICE-ID': <string>globalDataGet('deviceId') || 'WX_XCX',
  'BRAVO-AGENT': `WX_XCX||${globalDataGet('systemInfo')}`,
  Authorization: globalDataGet('token') ? <string>globalDataGet('token') : '',
};

export async function ajax(url: string, method: 'GET' | 'POST', data: object = {}): Promise<any> {
  header.Authorization = globalDataGet('token') ? <string>globalDataGet('token') : '';
  if (!header.Authorization) delete header.Authorization;
  const result = await Taro.request({
    header,
    url: `${API_PREFIX}${url}`,
    method,
    data,
  });

  const responseData: ResponseErrorData | ResponseOkData = result.data;
  if ((<ResponseErrorData>responseData).api_msg) {
    if ((<ResponseErrorData>responseData).api_code === 499) {
      // TODO 登陆失效处理
      globalDataRemove('token');
      Taro.removeStorageSync('token');
    } else {
      // TODO 接口错误
      Taro.showToast({
        icon: 'none',
        title: (<ResponseErrorData>responseData).api_msg,
      });
      throw new Error((<ResponseErrorData>responseData).api_msg);
    }
  } else {
    // TODO 接口成功
    return <ResponseOkData>responseData;
  }
}

export async function ajaxGet(url: string, data: object = {}) {
  return ajax(url, 'GET', data);
}

export async function ajaxPost(url: string, data: object = {}) {
  return ajax(url, 'POST', data);
}

type BackendResponse<T> = {
  data: T;
  code: number;
};

const request = <T>(arg: T) => arg;

export const getNotice = (id: string | number) =>
  request<BackendResponse<any>>({
    url: `/query?id=${id}`
  });
/** 查询消息详情  */
export const getMessage = (id: string | number) =>
  request<any>({
    url: `/messageUser/query?id=${id}`
  });

/* 通知单条读取操作处理接口 */
export const noticeReaded = (id: string | number) =>
  request<any>({
    method: 'post',
    url: `/noticeRead`,
    data: { id }
  });

import request from "@/utils/request";
export const getChannel = () =>
  request({
    method: "GET",
    url: "/v1_0/user/channels"
  });
export const getAllChannels = () =>
  request({
    method: "GET",
    url: "/v1_0/channels"
  });
export const fetchAddChannels = (channel) =>
  request({
    method: "PATCH",
    url: "/v1_0/user/channels",
    data: {
      channels: [channel]
    }
  });
export const delateChannels = channelId =>
  request({
    method: 'DELETE',
    url:`/v1_0/user/channels/${channelId}`
  });

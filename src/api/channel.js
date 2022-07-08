import request from '@/utils/request'
export const getChannel = () => 
  request({
    method: 'GET',
    url:'/v1_0/user/channels'
  })

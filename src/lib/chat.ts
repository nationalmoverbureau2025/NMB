export const initializeChat = (email?: string) => {
  if (window.$crisp) {
    // Set user email if provided
    if (email) {
      window.$crisp.push(['set', 'user:email', email])
    }

    // Show chat
    window.$crisp.push(['do', 'chat:show'])
    window.$crisp.push(['do', 'chat:open'])
  }
}

export const hideChat = () => {
  if (window.$crisp) {
    window.$crisp.push(['do', 'chat:hide'])
  }
}

export const updateChatUser = (email: string) => {
  if (window.$crisp) {
    window.$crisp.push(['set', 'user:email', email])
  }
}

export const sendChatMessage = (message: string) => {
  if (window.$crisp) {
    window.$crisp.push(['do', 'message:send', ['text', message]])
  }
}

export const setUserNickname = (nickname: string) => {
  if (window.$crisp) {
    window.$crisp.push(['set', 'user:nickname', nickname])
  }
}

export const setSessionData = (key: string, value: string) => {
  if (window.$crisp) {
    window.$crisp.push(['set', 'session:data', [[key, value]]])
  }
}

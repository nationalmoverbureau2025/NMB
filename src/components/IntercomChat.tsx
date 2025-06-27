import React from 'react'
import Intercom from '@intercom/messenger-js-sdk'
import { useAuth } from '../context/AuthContext'

export const IntercomChat = () => {
  const { user } = useAuth()
  Intercom({
    app_id: 'wjpp3ar0',
    user_id: user?.id,
    name: user?.user_metadata?.name || 'User',
    email: user?.email,
    created_at: user?.created_at,
  })

  return <div></div>
}

import { defaultPlugins } from '@/constants/'
import { useEffect, useState } from 'react'
import _ from 'lodash'
import { PluginNames } from 'models'
import { useAuth } from './useAuth'

export default function usePermissions() {
  const [adminPlugins, setAdminPlugins] = useState<PluginNames[]>([])
  const [activePlugin, setActivePlugin] = useState(defaultPlugins[0].name)
  const { user } = useAuth()
  useEffect(() => {
    if (!user) return
    const userRole = user.roles
    const checkPermissions: PluginNames[] = defaultPlugins.reduce(
      (result: PluginNames[], plugin) => {
        if (userRole.every((role) => plugin.roles.includes(role))) {
          result.push(plugin)
        }
        return result
      },
      []
    )
    setAdminPlugins(checkPermissions)
  }, [user?.roles])
  return { adminPlugins, activePlugin, setActivePlugin }
}

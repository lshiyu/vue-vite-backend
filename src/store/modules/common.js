import { defineStore } from 'pinia'
import { to } from 'await-to-js'
import { useStorage } from '@vueuse/core'
import { liveEnum } from '@/api/live/list'
import { getStaffsList, getAnchorList } from '@/api/auth/user'
const useCommonStore = defineStore('common',() => {
  const playbackList = useStorage('PLAYBACKLIST', [])
  const anonymityList = useStorage('ANONYMITYLIST', [])
  const liveStatus = useStorage('LIVESTATUS', [])
  const staffsList = useStorage('STAFFSLIST', [])
  const anchorList = useStorage('ANCHORLIST', [])
  // mutations
  const setPlaybackList = value => (playbackList.value = value)
  const setAnonymityList = value => (anonymityList.value = value)
  const setLiveStatus = value => (liveStatus.value = value)
  const setStaffsList = value => (staffsList.value = value)
  const setAnchorList = value => (anchorList.value = value)
  // actions
  const getEnum = async () => {
    const [err, res] = await to(liveEnum())
    if (!err) {
      setPlaybackList(res.data.is_playback)
      setAnonymityList(res.data.is_anonymity)
      setLiveStatus(res.data.status)
    }
  }
  const getStaffs = async () => {
    const [err, res] = await to(getStaffsList())
    if (!err) {
      console.log(res)
      setStaffsList(res.data)
    }
  }
  const getAnchor = async () => {
    const [err, res] = await to(getAnchorList())
    if (!err) {
      setAnchorList(res.data)
    }
  }
  return {
    playbackList,
    liveStatus,
    staffsList,
    anchorList,
    anonymityList,
    setAnonymityList,
    setLiveStatus,
    setPlaybackList,
    getEnum,
    getStaffs,
    getAnchor
  }
})

export default useCommonStore

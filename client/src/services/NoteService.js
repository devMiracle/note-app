import Api from '@/services/Api'

export default {
  getNotes() {
    return Api().get('notes',{ header : {
        "x-access-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjc1ZWMxODZlMzhmMDE5ZTQ4MmI4ZGYiLCJuYW1lIjoiQ2h1a3MgRW1la2EiLCJlbWFpbCI6Imtlbm5ldGhAeWFob28uY29tIiwicGFzc3dvcmQiOiIiLCJjcmVhdGVkX2F0IjoiMjAxOC0wOC0xNlQyMToyNjo0OC4yOTZaIiwidXBkYXRlZF9hdCI6IjIwMTgtMDgtMTZUMjE6MjY6NDguMjk2WiIsIl9fdiI6MCwiaWF0IjoxNTM0NDU0ODUwLCJleHAiOjE1MzQ2NzA4NTB9.gdUyxTASx5bZhrUMDK_BYXWpUQOaHG6J1sIAvYaqp8I"
    }})
  }
}
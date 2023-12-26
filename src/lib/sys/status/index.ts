import { api } from "@/lib/sys/server/api";

export const StatusServer = async () => {
  try {
    const response = await api.get("/")

    return response.data.server.status as string

  } catch (error) {
    console.log(error)
  }
}
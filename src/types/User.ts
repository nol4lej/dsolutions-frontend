import { UserState } from "@/enums"

export type User = {
    firstName: string
    lastName: string
    email: string
    status: UserState
}
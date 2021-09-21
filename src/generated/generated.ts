/* eslint-disable */
import { BaseApiConfig, Context, Fatal } from "@sdkgen/node-runtime";
export { Fatal } from "@sdkgen/node-runtime";

export interface BaseUser {
    name: string
    email: string
    password: string | null
}

export interface User {
    id: string
    createdAt: Date
    updatedAt: Date
    name: string
    email: string
    password: string | null
}

export class ApiConfig<ExtraContextT> extends BaseApiConfig<ExtraContextT> {
    fn!: {
        createUser: (ctx: Context & ExtraContextT, args: {values: BaseUser}) => Promise<User>
        getUser: (ctx: Context & ExtraContextT, args: {id: string}) => Promise<User>
        updatedUser: (ctx: Context & ExtraContextT, args: {id: string, values: BaseUser}) => Promise<User>
        removeUser: (ctx: Context & ExtraContextT, args: {id: string}) => Promise<User>
    }

    /** @deprecated api.err shouldn't be used. Import and throw errors directly. */
    err = {
        Fatal(message: string = "") { throw new Fatal(message); }
    }

    astJson = {
        annotations: {},
        errors: [
            "Fatal"
        ],
        functionTable: {
            createUser: {
                args: {
                    values: "BaseUser"
                },
                ret: "User"
            },
            getUser: {
                args: {
                    id: "string"
                },
                ret: "User"
            },
            updatedUser: {
                args: {
                    id: "string",
                    values: "BaseUser"
                },
                ret: "User"
            },
            removeUser: {
                args: {
                    id: "string"
                },
                ret: "User"
            }
        },
        typeTable: {
            BaseUser: {
                name: "string",
                email: "string",
                password: "string?"
            },
            User: {
                id: "string",
                createdAt: "datetime",
                updatedAt: "datetime",
                name: "string",
                email: "string",
                password: "string?"
            }
        }
    } as const
}

export const api = new ApiConfig<{}>();

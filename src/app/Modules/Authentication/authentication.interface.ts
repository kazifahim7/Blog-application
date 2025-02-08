export type TRegister = {
    name: string,
    email:string,
    password:string,
    role: "admin" | "user",
    isBlocked:boolean,

}

export type TLogIn={
    email:string,
    password:string
}
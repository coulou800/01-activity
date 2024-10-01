import { Trainees } from "@prisma/client";
import axios from "axios";
import "fs"

export async function getUserRepos(login: string, token: string) {
    try {
        let response = axios.get(`https://learn.zone01dakar.sn/git/api/v1/users/${login}/repos`, {
            headers: {
                Authorization: token
            }
        })
        return (await response).data
    } catch (err) {
        return err
    }
}

export async function getUser(domain: string, token: string){
    try {
        let response = axios.get(`https://${domain}/git/api/v1/user`, {
            headers: {
                Authorization: `token ${token}`
            }
        })
        return (await response).data
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function checkDomain(domain: string): Promise<boolean> {
    return axios.get(`https://${domain}`).then(res => res.status == 200).catch(_ => false)
}
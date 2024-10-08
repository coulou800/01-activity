import { PrismaClient, Trainees } from '@prisma/client';
import { log } from 'console';
import type { Trainee } from './models';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

export default async function newTrainee(trainee: Trainee, token: string) {
    let uid = randomUUID().toString()
    return prisma.trainees.upsert({
        create: {
            full_name: trainee.full_name,
            email: trainee.email,
            login: trainee.login,
            avatar_url: trainee.avatar_url,
            uid,
            token
        },
        update: {
            token
        },
        where: { email: trainee.email }

    }).then(t => t).catch(err => {
        log(err)
        Promise.reject(err)
    })
}

export async function getTrainee(email: string): Promise<Trainees | null> {
    return prisma.trainees.findUnique({
        where: {
            email
        }
    }).then(t => t)
}

export async function getTraineeByUid(uid: string): Promise<Trainees | null> {
    return prisma.trainees.findUnique({
        where: {
            uid
        }
    }).then(t => t)
}

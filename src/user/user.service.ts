import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {UserEntity} from './user.entity';
import {Repository} from 'typeorm'
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) 
    private userRepository:Repository<UserEntity>){}

    async showAll(){
        return await this.userRepository.find({select: ["ID_USUARIO","NOMBRE","CORREO"]});
    }

    async create(data: UserDTO){
        const user = await this.userRepository.create(data);
        await this.userRepository.save(user)
        return user;
    }

    async login(data: Partial<UserDTO>){
        const {NOMBRE,PASS} = data;
        const user = await this.userRepository.findOne({where: {NOMBRE}})
        if(!user || !(await user.comparePassword(PASS))){
            throw new HttpException(
                'Usuario o contra invalida',HttpStatus.BAD_REQUEST,
            )
        }
        return {statusCode:200,message:"Usuario correcto"}
    }

    async read(id:number){
        return await this.userRepository.findOne({ where: {id},select:["ID_USUARIO","NOMBRE"]})
    }

    async update(ID_USUARIO: number, data:Partial<UserDTO>){
        await this.userRepository.update({ID_USUARIO},data);
        return await this.userRepository.findOne({ID_USUARIO})
    }

    async destroy(ID_USUARIO:number){
        await this.userRepository.delete({ID_USUARIO})
        return {deleted : true}
    }

}

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
        return await this.userRepository.find({select: ['id','email','usuario']});
    }

    async create(data: UserDTO){
        const user = await this.userRepository.create(data);
        await this.userRepository.save(user)
        return user;
    }

    async login(data: Partial<UserDTO>){
        const {usuario,password} = data;
        const user = await this.userRepository.findOne({where: {usuario}})
        if(!user || !(await user.comparePassword(password))){
            throw new HttpException(
                'Usuario o contra invalida',HttpStatus.BAD_REQUEST,
            )
        }
        return {statusCode:200,message:"Usuario correcto"}
    }

    async read(id:number){
        return await this.userRepository.findOne({ where: {id}})
    }

    async update(id: number, data:Partial<UserDTO>){
        await this.userRepository.update({id},data);
        return await this.userRepository.findOne({id})
    }

    async destroy(id:number){
        await this.userRepository.delete({id})
        return {deleted : true}
    }

}

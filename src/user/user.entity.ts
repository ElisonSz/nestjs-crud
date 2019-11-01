import {} from '@nestjs/typeorm';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name:'usuarios'})
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    usuario:string;

    @Column()
    email:string;

    @Column()
    password:string;

    async comparePassword(attemp: string){
        return await attemp === this.password;
    }
}
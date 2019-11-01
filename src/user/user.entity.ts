import {} from '@nestjs/typeorm';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name:'usuarios'})
export class UserEntity {

    @PrimaryGeneratedColumn()
    ID_USUARIO: number;

    @Column()
    NOMBRE:string;

    @Column()
    CORREO:string;

    @Column()
    PASS:string;

    async comparePassword(attemp: string){
        return await attemp === this.PASS;
    }
}
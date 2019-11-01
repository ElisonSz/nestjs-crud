import { Controller, Logger, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service'
import { UserDTO } from './user.dto';

@Controller('user')
export class UserController {

    private logger = new Logger('Userontroller');
    constructor(private userService: UserService){}

    @Get()
    async showUsers(){
        const users = await this.userService.showAll();
        return users;
    }

    @Post()
    async createUser(@Body() data: UserDTO){
        return this.userService.create(data);
    }

    @Post('login')
    login(@Body() data: Partial<UserDTO>){
        return this.userService.login(data)
    }

    @Get(':id')
    readUser(@Param('id') id: number){
        return this.userService.read(id);
    }

    @Put('id')
    updateUser(@Param('id') id:number, @Body() data: Partial<UserDTO>){
        return this.userService.update(id, data)
    }

    @Delete('id')
    destroyUser(@Param('id') id: number){
        return this.userService.destroy(id);
    }
}

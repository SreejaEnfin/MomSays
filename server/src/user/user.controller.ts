import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('parent')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('child')
  createChild(@Body() createUserDto: CreateUserDto) {
    return this.userService.createChild(createUserDto);
  }

  @Get('parents')
  findAllParents() {
    return this.userService.findAllParents();
  }

  @Get('children')
  findAllChildren() {
    return this.userService.findAllChildren();
  }

  @Get('parent/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findParent(id);
  }

  @Get('child/:id')
  findChild(@Param('id') id: string) {
    return this.userService.findChild(id);
  }

  @Patch('parent/:id')
  updateParent(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateParent(id, updateUserDto);
  }

  @Patch('parent/:id')
  updateChild(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateChild(id, updateUserDto);
  }

  @Delete('parent/:id')
  removeParent(@Param('id') id: string) {
    return this.userService.removeParent(id);
  }

  @Delete('child/:id')
  removeChild(@Param('id') id: string) {
    return this.userService.removeChild(id);
  }

  @Post('parent/forgot-password')
  parentForgotPassword(@Body() createUserDto: CreateUserDto) {
    return this.userService.parentForgotPassword(createUserDto);
  }

  @Post('parent/reset-password')
  parentResetPassword(@Body() createUserDto: CreateUserDto) {
    return this.userService.parentResetPassword(createUserDto);
  }
}

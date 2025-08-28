import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

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

  @Post('mark-welcome-message-seen/:id')
  markWelcomeMessageSeen(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.markWelcomeMessageSeen(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('parents')
  findAllParents() {
    return this.userService.findAllParents();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('children')
  findAllChildren() {
    return this.userService.findAllChildren();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('parent/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findParent(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('child/:id')
  findChild(@Param('id') id: string) {
    return this.userService.findChild(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('parent/:id')
  updateParent(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateParent(id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('child/:id')
  updateChild(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateChild(id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('parent/:id')
  removeParent(@Param('id') id: string) {
    return this.userService.removeParent(id);
  }

  @UseGuards(AuthGuard('jwt'))
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

  @UseGuards(AuthGuard('jwt'))
  @Get('parent/children/:id')
  findChildrenByParentId(@Param('id') id: string) {
    return this.userService.findChildrenByParentId(id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ChildAlias } from './entities/child-alias.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from 'src/auth/jwt.service';
import { afterPasswordResetEmail, childWelcomeEmail, passwordResetEmail, sendWelcomeEmail } from 'src/email/email.service';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(ChildAlias)
    private readonly childAliasRepo: Repository<ChildAlias>,
    private readonly jwtService: JwtService, // Assuming JwtService is imported correctly
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const { name, email, password } = createUserDto;
      let hashedPassword = '';
      if (password) {
        const salt = 10;
        hashedPassword = await bcrypt.hash(password, salt);
      }
      createUserDto.password = hashedPassword;
      if (createUserDto.role !== UserRole.PARENT) {
        return {
          status: 'error',
          message: 'Only parent role is allowed here.',
        };
      }

      const newUser = await this.userRepo.create(createUserDto);
      const response = await this.userRepo.save(newUser);

      await sendWelcomeEmail(
        email !== undefined ? email : '',
        name !== undefined ? name : ''
      );


      return {
        status: 'success',
        message: 'Parent created successfully',
        data: response,
      }
    } catch (e) {
      return {
        status: 'error',
        message: e.message || 'Failed to create user',
      }
    }
  }

  async createChild(createUserDto: CreateUserDto) {
    try {
      const { name, parentId, alias } = createUserDto;
      if (!createUserDto.alias) {
        return {
          status: 'error',
          message: 'Alias is required to create a child profile.',
        };
      }
      const parent = await this.userRepo.findOne({
        where: { id: parentId, role: UserRole.PARENT },
      });

      if (parent === null) {
        return {
          status: 'error',
          message: 'Parent not found or does not exist.',
        };
      }
      if (createUserDto.role !== UserRole.CHILD) {
        return {
          status: 'error',
          message: 'Only child role is allowed here.',
        };
      }

      const existingAlias = await this.childAliasRepo.findOne({
        where: { alias: createUserDto.alias },
      });

      if (existingAlias) {
        return {
          status: 'error',
          message: 'Alias already taken. Please choose another one.',
        };
      }

      const email = parent.email;
      const newUser = this.userRepo.create(createUserDto);
      const savedUser = await this.userRepo.save(newUser);

      try {
        const aliasEntity = this.childAliasRepo.create({
          alias: createUserDto.alias,
          child: savedUser,
        });
        const savedAlias = await this.childAliasRepo.save(aliasEntity);
        await childWelcomeEmail(
          email !== undefined ? email : '',
          name !== undefined ? name : '',
          alias !== undefined ? alias : ''
        );

        return {
          status: 'success',
          message: 'Child created successfully with alias.',
          user: savedUser,
          alias: savedAlias,
        };
      } catch (aliasErr) {
        await this.userRepo.delete(savedUser.id);

        return {
          status: 'error',
          message: 'Alias creation failed. Child user was not saved.',
          details: aliasErr.message,
        };
      }
    } catch (e) {
      console.error('Create child error:', e);
      return {
        status: 'error',
        message: e.detail || e.message || 'Failed to create child user',
      };
    }
  }

  async findAllParents() {
    try {
      const parents = await this.userRepo.find({
        where: { role: UserRole.PARENT }
      });
      if (!parents || parents.length === 0) {
        return {
          status: 'success',
          message: 'No parents found',
          data: [],
        }
      } else {
        return {
          status: 'success',
          message: 'Parents fetched successfully',
          data: parents,
        }
      }
    } catch (e) {
      return {
        status: 'error',
        message: e.message || 'Failed to fetch parents',
      }
    }
  }

  async findAllChildren() {
    try {
      const children = await this.userRepo.find({
        where: { role: UserRole.CHILD }
      });
      if (!children || children.length === 0) {
        return {
          status: 'success',
          message: 'No children found',
          data: [],
        }
      } else {
        return {
          status: 'success',
          message: 'Children fetched successfully',
          data: children,
        }
      }
    } catch (e) {
      return {
        status: 'error',
        message: e.message || 'Failed to fetch children',
      }
    }
  }

  async findParent(id: string) {
    try {
      const parent = await this.userRepo.findOne({ where: { id, role: UserRole.PARENT } });
      if (parent) {
        return {
          status: 'success',
          message: 'Parent fetched successfully',
          data: parent,
        }
      }
    } catch (e) {
      return {
        status: 'error',
        message: e.message || 'Failed to fetch parent',
      }
    }
  }

  async findChild(id: string) {
    try {
      const child = await this.userRepo.findOne({ where: { id, role: UserRole.CHILD } });
      const childAlias = await this.childAliasRepo.findOne({ where: { child: { id, role: UserRole.CHILD } } });
      if (child && childAlias) {
        return {
          status: 'success',
          message: 'Child fetched successfully',
          child: child,
          aliasDetails: childAlias,
        }
      }
    } catch (e) {
      return {
        status: 'error',
        message: e.message || 'Failed to fetch parent',
      }
    }
  }

  async updateParent(id: string, updateUserDto: UpdateUserDto) {
    try {
      const parent = await this.userRepo.findOne({ where: { id, role: UserRole.PARENT } });
      if (!parent) {
        return {
          status: 'error',
          message: 'Parent not found',
        }
      } else {
        Object.assign(parent, updateUserDto);
        const updatedParent = await this.userRepo.save(parent);
        return {
          status: 'success',
          message: 'Parent updated successfully',
          data: updatedParent,
        }
      }
    } catch (e) {
      return {
        status: 'error',
        message: e.message || 'Failed to update parent',
      }
    }
  }

  async updateChild(id: string, updateUserDto: UpdateUserDto) {
    try {
      const child = await this.userRepo.findOne({ where: { id, role: UserRole.CHILD } });
      if (!child) {
        return {
          status: 'error',
          message: 'Child not found',
        }
      } else {
        Object.assign(child, updateUserDto);
        const updatedChild = await this.userRepo.save(child);
        return {
          status: 'success',
          message: 'Child updated successfully',
          data: updatedChild,
        }
      }
    } catch (e) {
      return {
        status: 'error',
        message: e.message || 'Failed to update child',
      }
    }
  }

  async removeParent(id: string) {
    try {
      const parent = await this.userRepo.findOne({ where: { id: id, role: UserRole.PARENT } });
      if (!parent) {
        return {
          status: 'error',
          message: 'Parent not found',
        }
      }
      const children = await this.userRepo.find({ where: { parentId: id, role: UserRole.CHILD } });

      for (const child of children) {
        await this.userRepo.delete(child.id);
      }

      const response = await this.userRepo.delete(id);
      if (response) {
        return {
          status: 'success',
          message: `Parent with id ${id} removed successfully`,
        }
      }
    } catch (e) {
      return {
        status: 'error',
        message: e.message || 'Failed to remove parent',
      }
    }
    return `This action removes a #${id} user`;
  }

  async removeChild(id: string) {
    try {
      const child = await this.userRepo.findOne({ where: { id, role: UserRole.CHILD } });
      if (!child) {
        return {
          status: 'error',
          message: 'Child not found',
        }
      }
      const alias = await this.childAliasRepo.findOne({ where: { child: { id, role: UserRole.CHILD } } });
      if (alias) {
        await this.childAliasRepo.delete(alias.id);
      }
      const response = await this.userRepo.delete(id);
      if (response) {
        return {
          status: 'success',
          message: `Child with id ${id} removed successfully`,
        }
      }
    } catch (e) {
      return {
        status: 'error',
        message: e.message || 'Failed to remove child',
      }
    }
  }

  async parentForgotPassword(createUserDto: CreateUserDto) {
    try {
      const { email } = createUserDto;
      if (!email) {
        return {
          status: 'error',
          message: 'Email is required to reset password',
        }
      }
      const user = await this.userRepo.findOne({ where: { email, role: UserRole.PARENT } });
      if (!user) {
        return {
          status: 'error',
          message: 'Parent not found with the provided email',
        }
      }
      const token = await this.jwtService.signToken({ id: user.id }, '15m');
      if (!token) {
        return {
          status: 'error',
          message: 'Failed to generate reset token',
        }
      }
      const resetLink = `${process.env.CLIENT_SIDE_URL}}/reset-password/${token}`;
      await passwordResetEmail(email, user.name, resetLink);
      return {
        status: 'success',
        message: 'Password reset instructions sent to your email',
      }
    } catch (e) {
      return {
        status: 'error',
        message: e.message || 'Failed to process forgot password request',
      }
    }
  }

  async parentResetPassword(resetPasswordData: any) {
    try {
      const { token, password } = resetPasswordData;
      if (!token || !password) {
        return {
          status: 'error',
          message: 'Token and new password are required to reset password',
        }
      }
      const data = await this.jwtService.verifyToken(token);
      if (!data) {
        return {
          status: 'error',
          message: 'Invalid or expired token',
        }
      }
      const user = await this.userRepo.findOne({ where: { id: data.id, role: UserRole.PARENT } });
      if (!user) {
        return {
          status: 'error',
          message: 'Parent not found with the provided ID',
        }
      }
      const salt = 10;
      user.password = await bcrypt.hash(password, salt);
      await this.userRepo.save(user);
      await afterPasswordResetEmail(user.email, user.name);
      return {
        status: 'success',
        message: 'Password reset successfully',
      }
    } catch (e) {
      return {
        status: 'error',
        message: e.message || 'Failed to reset password',
      }
    }
  }
}
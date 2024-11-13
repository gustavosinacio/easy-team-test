import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as fs from 'fs';
import { join } from 'path';

import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../user/enums';
import { JWTSignPayload } from './auth.types';

@Injectable()
export class AuthService {
  private privateKey: string;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {
    this.privateKey = fs.readFileSync(join(process.cwd(), 'priv.key'), 'utf8');
  }

  async register(
    username: string,
    password: string,
    role: UserRole = UserRole.REGULAR,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
      role,
    });
    await this.userRepository.save(newUser);
    return newUser;
  }

  async validateUser(username: string, password: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JWTSignPayload = {
      employeeId: `${user.employee.id}`,
      locationId: user.employee.location.id,
      accessRole: user.role,
    };

    const token = await this.signJwt(payload);

    return { access_token: token };
  }

  async signJwt(payload: JWTSignPayload) {
    const adminPermissions = [];
    if (payload.accessRole === 'admin') {
      adminPermissions.push('SHIFT_WRITE', 'SHIFT_ADD', 'LOCATION_ADMIN');
    }
    const signablePayload = {
      ...payload,
      partnerId: process.env.EASY_TEAM_PARTNER_ID,
      accessRole: {
        name: payload.accessRole,
        permissions: ['LOCATION_READ', 'SHIFT_READ', ...adminPermissions],
      },
      role: {
        name: '<EMPLOYEE ROLE in store: Cashier/Assistant/Manager...>',
      },
    };
    const token = this.jwtService.sign(signablePayload, {
      privateKey: this.privateKey,
      algorithm: 'RS256',
    });

    return token;
  }
}

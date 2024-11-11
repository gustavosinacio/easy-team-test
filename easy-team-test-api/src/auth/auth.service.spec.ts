import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/user.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should sign a JWT with the correct payload', async () => {
    const payload = {
      employeeId: '123',
      locationId: '456',
      organizationId: '789',
      partnerId: '<YOUR EASYTEAM PARTNER ID>',
      payrollId: 'Salsa_EMPLOYEE_ID',
      employerPayrollId: 'Salsa_Employer_ID',
      accessRoleName: 'manager',
    };

    const token = await authService.signJwt(payload);

    expect(jwtService.decode(token).employeeId).toBe(payload.employeeId);
    expect(jwtService.decode(token).locationId).toBe(payload.locationId);
    expect(jwtService.decode(token).organizationId).toBe(
      payload.organizationId,
    );
  });
});

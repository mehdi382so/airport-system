import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginEmployeeDto } from './dto/login-employee.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    private configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  /* =============== Relations =============== */

  findByUsername(username: string) {
    return this.employeeRepository.findOne({ where: { username } });
  }

  /* =============== Logics For Login =============== */

  async login(loginEmployeeDto: LoginEmployeeDto) {
    const { username, password } = loginEmployeeDto;

    const isSystemAdmin = this.isSystemAdmin(username, password);
    if (isSystemAdmin) {
      const payload = { id: -1 };
      const accessToken = await this.jwtService.generateToken(payload);
      return { accessToken };
    }

    const user = await this.findByUsername(username);
    if (!user) throw new UnauthorizedException('User not found');

    const isPasswordCorrect = (user.password === password);
    if (!isPasswordCorrect) throw new NotFoundException('User not found');

    const payload = { id: user.employee_id };
    const accessToken = await this.jwtService.generateToken(payload);
    return { accessToken };
  }

  isSystemAdmin(username: string, password: string) {
    const adminUsername = this.configService.get<string>('ADMIN_USERNAME');
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD');

    if (adminUsername === username && adminPassword === password) return true;
    return false;
  }

  // create(createEmployeeDto: CreateEmployeeDto) {
  //   return 'This action adds a new employee';
  // }

  // findAll() {
  //   return `This action returns all employee`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} employee`;
  // }

  // update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
  //   return `This action updates a #${id} employee`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} employee`;
  // }
}

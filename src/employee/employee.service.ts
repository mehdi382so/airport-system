import {
  ConflictException,
  ForbiddenException,
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
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { AirlineService } from 'src/airline/airline.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    private configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly airlineService: AirlineService
  ) {}

  /* =============== Relations =============== */

  findByUsername(username: string) {
    return this.employeeRepository.findOne({ where: { username } });
  }

  findAirlineManagerById(airline_id: number) {
    return this.employeeRepository.findOne({ where: { role: 'manager', airline_id }})
  }

  create(createEmployeeDto: CreateEmployeeDto) {
    return this.employeeRepository.save(createEmployeeDto)
  }

  findById(employee_id: number) {
    return this.employeeRepository.findOne({ where: { employee_id }})
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

  /* =============== Logics For Create Employee =============== */

  async createEmployee(createEmployeeDto: CreateEmployeeDto, userId: number) {
    const { username } = createEmployeeDto

    const isUsernameDuplicate = await this.findByUsername(username)
    if(isUsernameDuplicate)
      throw new ConflictException('Username already exists')

    if(userId === -1) 
      return this.createEmployeeByAdmin(createEmployeeDto)
   
    else 
      return this.createEmployeeByManager(createEmployeeDto, userId)
  }

  async createEmployeeByAdmin(createEmployeeDto: CreateEmployeeDto) {
    const { role, airline_id } = createEmployeeDto
    if(role !== 'manager') throw new ForbiddenException(`You can not create ${role}`)

    const airlineExists = await this.airlineService.findOne(airline_id)
    if(!airlineExists)
      throw new NotFoundException('Airline with this id is not found')
  
    const managerExists = await this.findAirlineManagerById(airline_id)
    if(managerExists) throw new ConflictException('Manager for this airline already exists')
      
      return this.create(createEmployeeDto)
    }
  
  async createEmployeeByManager(createEmployeeDto: CreateEmployeeDto, userId: number) {
    const { role, airline_id } = createEmployeeDto
      
    const airlineExists = await this.airlineService.findOne(airline_id)
    if(!airlineExists)
      throw new NotFoundException('Airline with this id is not found')
      
    const manager = await this.findById(userId)
    if(!manager)
      throw new UnauthorizedException('User not found')
    
    if(manager.role !== 'manager' || role === 'manager' || manager.airline_id !== airline_id)
      throw new ForbiddenException(`You can not create ${role}`)

    return this.create(createEmployeeDto)
  }

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

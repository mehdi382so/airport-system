import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { LoginEmployeeDto } from './dto/login-employee.dto';
import { JwtAuthGuard } from 'src/jwt/jwt.guard';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('login')
  login(@Body() loginEmployeeDto: LoginEmployeeDto) {
    return this.employeeService.login(loginEmployeeDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createEmployeeDto: CreateEmployeeDto, @Req() req: any) {
    return this.employeeService.createEmployee(createEmployeeDto, req.user.id)
  }

  // @Post()
  // create(@Body() createEmployeeDto: CreateEmployeeDto) {
  //   return this.employeeService.create(createEmployeeDto);
  // }

  // @Get()
  // findAll() {
  //   return this.employeeService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.employeeService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
  //   return this.employeeService.update(+id, updateEmployeeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.employeeService.remove(+id);
  // }
}

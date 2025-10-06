import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AirportService } from './airport.service';
import { CreateAirportDto } from './dto/create-airport.dto';
import { JwtAuthGuard } from 'src/jwt/jwt.guard';

@Controller('airport')
export class AirportController {
  constructor(private readonly airportService: AirportService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createAirportDto: CreateAirportDto, @Req() req: any) {
    return this.airportService.create(createAirportDto, req.user.id);
  }

  // @Get()
  // findAll() {
  //   return this.airportService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.airportService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAirportDto: UpdateAirportDto) {
  //   return this.airportService.update(+id, updateAirportDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.airportService.remove(+id);
  // }
}

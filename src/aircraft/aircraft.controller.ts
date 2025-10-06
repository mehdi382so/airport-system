import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AircraftService } from './aircraft.service';
import { CreateAircraftDto } from './dto/create-aircraft.dto';
import { JwtAuthGuard } from 'src/jwt/jwt.guard';

@Controller('aircraft')
export class AircraftController {
  constructor(private readonly aircraftService: AircraftService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createAircraftDto: CreateAircraftDto, @Req() req: any) {
    return this.aircraftService.create(createAircraftDto, req.user.id);
  }

  // @Get()
  // findAll() {
  //   return this.aircraftService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.aircraftService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAircraftDto: UpdateAircraftDto) {
  //   return this.aircraftService.update(+id, updateAircraftDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.aircraftService.remove(+id);
  // }
}

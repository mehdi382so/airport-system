import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AirlineService } from './airline.service';
import { CreateAirlineDto } from './dto/create-airline.dto';
import { JwtAuthGuard } from 'src/jwt/jwt.guard';

@Controller('airline')
export class AirlineController {
  constructor(private readonly airlineService: AirlineService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createAirlineDto: CreateAirlineDto, @Req() req: any) {
    return this.airlineService.create(createAirlineDto, req.user.id);
  }

  // @Get()
  // findAll() {
  //   return this.airlineService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.airlineService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAirlineDto: UpdateAirlineDto) {
  //   return this.airlineService.update(+id, updateAirlineDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.airlineService.remove(+id);
  // }
}

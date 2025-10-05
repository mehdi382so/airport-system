import { Controller } from '@nestjs/common';
import { AirlineService } from './airline.service';

@Controller('airline')
export class AirlineController {
  constructor(private readonly airlineService: AirlineService) {}

  // @Post()
  // create(@Body() createAirlineDto: CreateAirlineDto) {
  //   return this.airlineService.create(createAirlineDto);
  // }

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

import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { SeatService } from './seat.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { JwtAuthGuard } from 'src/jwt/jwt.guard';

@Controller('seat')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createSeatDto: CreateSeatDto, @Req() req: any) {
    return this.seatService.create(createSeatDto, req.user.id);
  }

  // @Get()
  // findAll() {
  //   return this.seatService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.seatService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSeatDto: UpdateSeatDto) {
  //   return this.seatService.update(+id, updateSeatDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.seatService.remove(+id);
  // }
}

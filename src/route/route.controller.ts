import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { RouteService } from './route.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { JwtAuthGuard } from 'src/jwt/jwt.guard';

@Controller('route')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createRouteDto: CreateRouteDto, @Req() req: any) {
    return this.routeService.create(createRouteDto, req.user.id);
  }

  // @Get()
  // findAll() {
  //   return this.routeService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.routeService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
  //   return this.routeService.update(+id, updateRouteDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.routeService.remove(+id);
  // }
}

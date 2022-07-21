import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService) {}

    @Get()
    findAll(/* @Query() paginationQueryParams */) {
        // const { limit, offset } = paginationQueryParams;
        return this.coffeesService.findAll();
    }
    // @Get()
    // findAll(@Res() response) {
    //     response.status(202).send('This action returns all coffees');
    // }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.coffeesService.findOne(id);
    }
    // @Get(':id')
    // findOne(@Param() param) {  ===> this is how u get an object with all params
    //     return `This action returns #${param.id} coffee`
    // }

    @Post()
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        console.log(createCoffeeDto instanceof CreateCoffeeDto);
        return this.coffeesService.create(createCoffeeDto);
    }
    // @Post()
    // @HttpCode(HttpStatus.CREATED) ===> this is a 201 status code
    // create(@Body('name') name) {
    //     return name
    // }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
        return this.coffeesService.update(id, updateCoffeeDto );
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coffeesService.remove(id);
    }
}

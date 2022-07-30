import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Coffee, CoffeeSchema } from './entities/coffee.entity';
import { EventSchema } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';

// class MockCoffeesService {}

@Module({
    imports: [
    MongooseModule.forFeature([
            {
                name: Coffee.name,
                schema: CoffeeSchema,
            },
            {
                name: Event.name,
                schema: EventSchema,
            },
        ]),
    ],
    controllers: [CoffeesController],
    providers: [
        CoffeesService,
        // { provide: CoffeesService, useValue: new MockCoffeesService() },
        {provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe']}
    ],
    exports: [CoffeesService],
})
export class CoffeesModule {}

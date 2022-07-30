import { Injectable, Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Coffee, CoffeeSchema } from './entities/coffee.entity';
import { EventSchema } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';

// class MockCoffeesService {}
class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

@Injectable()
export class CoffeeBrandsFactory {
    create() {
        return ['buddy brew', 'nescafe'];
    }
}

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
        // CoffeeBrandsFactory,
        {
            provide: COFFEE_BRANDS,
            // useFactory: (brandsFactory: CoffeeBrandsFactory) => brandsFactory.create();
            useFactory: async (): Promise<string[]> => {
                // const coffeeBrands = await connection to the database
                const coffeeBrands = await Promise.resolve([
                    'buddy brew',
                    'nescafe',
                ]);

                return coffeeBrands;
            },
            // inject: [CoffeeBrandsFactory],
        },
        {
            provide: ConfigService,
            useClass:
                process.env.NODE_ENV === 'development'
                    ? DevelopmentConfigService
                    : ProductionConfigService,
        },
        // { provide: CoffeesService, useValue: new MockCoffeesService() },
    ],
    exports: [CoffeesService],
})
export class CoffeesModule {}
